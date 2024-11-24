import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, ReactNode, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Session } from '@supabase/supabase-js';

import { routePaths } from '@/constants/route';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import Divider from '@/components/atoms/Divider';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import Badge from '@/components/atoms/Badge';
import IconButton from '@/components/molecules/IconButton';
import { AccountForm, AccountFormType } from '@/types/account.type';
import FormItem from '@/components/molecules/FormItem';
import Input from '@/components/atoms/Input';
import { createToast } from '@/libs/toast';
import { useDeleteMyAccount, useMyAccountUpdate } from '@/hooks/useMyAccount';
import useModal from '@/hooks/useModal';
import { ConfirmModalState } from '@/types/modal.type';
import { SessionAtom } from '@/stores/auth.store';
import cn from '@/libs/cn';
import { useSignPasswordReset } from '@/hooks/useSignPasswordReset';

// eslint-disable-next-line react/require-default-props
function PasswordDots({ dotLength = 6 }: { dotLength?: number }) {
  return (
    <Container.FlexRow className="w-full items-center gap-x-1">
      {Array.from({ length: dotLength }).map(() => (
        // eslint-disable-next-line react/jsx-key
        <div className="size-4 rounded-full bg-brown" />
      ))}
    </Container.FlexRow>
  );
}

function UserInfoRowContainer({
  children,
  className = '',
}: {
  children: ReactNode;
  // eslint-disable-next-line react/require-default-props
  className?: string;
}) {
  return (
    <Container.FlexRow
      className={cn('w-full items-center tablet:h-[4.75rem]', className)}
    >
      {children}
    </Container.FlexRow>
  );
}

export default function MyAccountTemplate() {
  const session = useRecoilValue(SessionAtom);
  const { user } = session as Session;
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadAvatar, setUploadedAvatar] = useState<string>();
  const [isEditing, setIsEditing] = useState({ nickname: false });
  const { updateUser, isUpdating } = useMyAccountUpdate();
  const { deleteAccount, isDeleting } = useDeleteMyAccount();
  const { setModalState: setConfirmModal, closeModal: closeConfirmModal } =
    useModal('Confirm');
  const { passwordReset, isPending: isPendingPasswordReset } =
    useSignPasswordReset();
  const confirmModalContext: ConfirmModalState = {
    isOpen: true,
    type: 'Confirm',
    title: '정말로 탈퇴하시겠어요?',
    message:
      '탈퇴 버튼 선택 시, 계정은 삭제되며' +
      '\n' +
      '모든 정보는 복구되지 않습니다.',
    confirmButtonContent: '탈퇴',
    cancelButtonContent: '취소',
    onClickConfirm: () => {
      deleteAccount(user.id);
      closeConfirmModal();
    },
    onClickCancel: () => {
      closeConfirmModal();
    },
  };

  const form = useForm<AccountFormType>({
    defaultValues: { nickname: user.user_metadata.nickname },
    resolver: zodResolver(AccountForm),
  });

  const isPending = isUpdating || isDeleting || isPendingPasswordReset;

  const onClickCancel = () => {
    navigate(routePaths.myActivity);
  };

  const onSaveAccount = (formValues: AccountFormType) => {
    updateUser({ ...formValues, id: user.id });
  };

  const onClickChangeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { files } = event.currentTarget;
    if (files && files.length > 0) {
      const avatar = files[0];
      try {
        const reader = new FileReader();
        reader.readAsDataURL(avatar);
        reader.onload = () => {
          if (reader.result) {
            const result = reader.result as string;
            setUploadedAvatar(result);
            form.setValue('avatar', avatar);
          }
        };
      } catch (error) {
        createToast('avatar_upload', '아바타 등록에 실패하였습니다.', {
          isLoading: false,
          type: 'error',
          autoClose: 1000,
        });
      }
    }
  };

  const onClickPasswordReset = async () => {
    passwordReset({ email: user.email ?? '' });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSaveAccount)} className="size-full">
        <Container.FlexCol>
          {/* 계정설정 취소, 저장 section */}
          <Container.FlexRow className="items-center justify-between">
            <Typography.SubTitle1 className="text-[1.54rem] font-semibold text-brown">
              계정설정
            </Typography.SubTitle1>
            <Container.FlexRow className="gap-x-3">
              <Button.Outline
                className="h-[2.77rem] w-[6rem] justify-center rounded-full tablet:h-[2.25rem] tablet:w-[4.875rem]"
                onClick={onClickCancel}
              >
                <Typography.P3 className="text-[1.23rem] text-brown1">
                  취소
                </Typography.P3>
              </Button.Outline>
              <Button.Fill
                type="submit"
                className="h-[2.77rem] w-[6rem] justify-center rounded-full tablet:h-[2.25rem] tablet:w-[4.875rem]"
                disabled={isPending}
              >
                <Typography.P3 className="text-[1.23rem] text-white">
                  저장
                </Typography.P3>
              </Button.Fill>
            </Container.FlexRow>
          </Container.FlexRow>
          <Divider.Col className="mb-8 mt-6" />
          {/* 계정 avatar section */}
          <Container.FlexCol>
            <Container className="relative size-32">
              <Avatar.XXXL
                src={uploadAvatar ?? user.user_metadata.avatar_url}
                className="cursor-auto"
              />
              <IconButton.Ghost
                className="absolute bottom-0 right-0 size-10 items-center justify-center rounded-full bg-white shadow-[0_2px_4px_0_rgba(0,0,0,25%)]"
                iconType="edit-avatar"
                disabled={isPending}
                onClick={() => inputRef.current?.click()}
              >
                <Input
                  type="file"
                  className="hidden"
                  onChange={onClickChangeAvatar}
                  accept="image/png, image/jpeg"
                  ref={inputRef}
                />
              </IconButton.Ghost>
            </Container>
            <Typography.P3 className="pt-[1.4375rem] text-brown">
              &#8226; 사진은 자동으로 150x150 사이즈로 적용됩니다.
            </Typography.P3>
          </Container.FlexCol>
          {/* 계정 profile section */}
          <Container.FlexCol className="w-full max-w-[30.375rem] gap-y-[3.077rem] pt-11 target:gap-y-[2.5rem]">
            <UserInfoRowContainer>
              <FormItem.TextField
                name="nickname"
                labelName="닉네임"
                placeholder="이름 변경"
                disabled={isPending}
                containerStyle={cn(
                  'w-full flex items-center',
                  '[&_label]:m-0 [&_label]:min-w-[6.924rem] tablet:[&_label]:min-w-[11.25rem] [&>div]:w-full [&_label]:text-brown',
                  isEditing.nickname && '',
                )}
                inputStyle={
                  isEditing.nickname
                    ? ''
                    : 'w-full border-none p-0 placeholder:text-transparent focus:ring-0 pointer-events-none text-brown'
                }
                helperTextStyle={cn(
                  'absolute bottom-0 left-0 translate-y-[150%] text-[0.8rem]',
                  form.formState.errors.nickname ? 'block' : 'hidden',
                )}
              />
              <Button.Outline
                className={cn(
                  'shrink-0 items-center rounded-[3.125rem] px-[1.4375rem] py-[0.5625rem]',
                  isEditing.nickname && 'hidden',
                )}
                disabled={isPending}
                onClick={() =>
                  setIsEditing(prev => ({ ...prev, nickname: true }))
                }
              >
                <Typography.P3 className="text-brown">변경</Typography.P3>
              </Button.Outline>
            </UserInfoRowContainer>
            <UserInfoRowContainer>
              <Typography.SubTitle2 className="min-w-[6.924rem] shrink-0 text-brown tablet:min-w-[11.25rem]">
                아이디
              </Typography.SubTitle2>
              <Typography.P2 className="w-full text-brown">
                {user.email}
              </Typography.P2>
              <Button.Outline
                className={cn(
                  'shrink-0 items-center invisible rounded-[3.125rem] px-[1.4375rem] py-[0.5625rem]',
                  isEditing.nickname && 'hidden',
                )}
                disabled={isPending}
                onClick={() =>
                  setIsEditing(prev => ({ ...prev, nickname: true }))
                }
              >
                <Typography.P3 className="text-brown">변경</Typography.P3>
              </Button.Outline>
            </UserInfoRowContainer>
            {user.app_metadata.provider === 'email' && (
              <UserInfoRowContainer>
                <Typography.SubTitle2 className="min-w-[6.924rem] text-brown tablet:min-w-[11.25rem]">
                  비밀번호
                </Typography.SubTitle2>
                <PasswordDots />
                <Button.Outline
                  className="shrink-0 rounded-[3.125rem] px-[1.4375rem] py-[0.5625rem]"
                  disabled={isPending}
                  onClick={onClickPasswordReset}
                >
                  <Typography.P3 className="text-brown">변경</Typography.P3>
                </Button.Outline>
              </UserInfoRowContainer>
            )}
          </Container.FlexCol>
          {/* 연동된 계정 provider section */}
          {session?.user.app_metadata.provider !== 'email' && (
            <Container.FlexCol className="mt-[3.25rem]">
              <Typography.SubTitle2 className="mb-9 text-brown">
                계정 연동
              </Typography.SubTitle2>
              <Container.FlexCol className="w-full max-w-[32rem] gap-[1.538rem]">
                {session?.user.app_metadata.providers?.map(
                  (provider: 'kakao' | 'google') => (
                    <Container.FlexRow
                      key={provider}
                      className="w-full items-center justify-between"
                    >
                      <Container.FlexRow className="items-center gap-[1.5rem] tablet:gap-8">
                        <Badge.Outline
                          className="rounded-full p-[0.6875rem]"
                          focus={false}
                          active={false}
                          hover={false}
                        >
                          <Icon
                            type={
                              provider === 'google'
                                ? 'google-logo'
                                : 'kakaotalk-logo-text'
                            }
                          />
                        </Badge.Outline>
                        <Typography.P3 className="text-brown">
                          {provider === 'google' ? 'Google' : 'Kakaotalk'}
                        </Typography.P3>
                      </Container.FlexRow>
                      <Typography.P3 className="shrink-0 text-brown1">
                        연결됨
                      </Typography.P3>
                    </Container.FlexRow>
                  ),
                )}
              </Container.FlexCol>
            </Container.FlexCol>
          )}
          <Button.Ghost
            className="mt-[5.75rem] w-fit"
            disabled={isPending}
            onClick={() => setConfirmModal(confirmModalContext)}
          >
            <Typography.P3 className="text-brown underline underline-offset-4">
              회원 탈퇴
            </Typography.P3>
          </Button.Ghost>
        </Container.FlexCol>
      </form>
    </FormProvider>
  );
}
