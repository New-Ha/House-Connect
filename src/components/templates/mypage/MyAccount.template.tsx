import { Session } from '@supabase/supabase-js';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

type MyAccountTemplateProps = {
  session: Session;
};

function PasswordDot() {
  return <div className="size-4 rounded-full bg-brown" />;
}

export default function MyAccountTemplate(props: MyAccountTemplateProps) {
  const { session } = props;
  const { user } = session;
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadAvatar, setUploadedAvatar] = useState<string>();

  const [isEdit, setIsEdit] = useState({ nickname: false, password: false });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { updateUser, isUpdating } = useMyAccountUpdate();
  const { deleteAccount, isDeleting } = useDeleteMyAccount();

  const { setModalState: setConfirmModal, closeModal: closeConfirmModal } =
    useModal('Confirm');
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

  const isPending = isUpdating || isDeleting;

  const onClickCancel = () => {
    navigate(routePaths.myActivity);
  };

  const onSaveAccount = (data: AccountFormType) => {
    const { password, ...others } = data;
    updateUser({ ...others, id: user.id });
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

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSaveAccount)}>
        <Container.FlexCol>
          <Container.FlexRow className="items-center justify-between">
            <Typography.SubTitle1 className="text-brown">
              계정설정
            </Typography.SubTitle1>
            <Container.FlexRow className="gap-x-3">
              <Button.Outline
                className="rounded-[3.125rem] px-[1.4375rem] py-[0.5625rem]"
                onClick={onClickCancel}
              >
                <Typography.P3 className="text-brown1">취소</Typography.P3>
              </Button.Outline>
              <Button.Fill
                type="submit"
                className="rounded-[3.125rem] px-6 py-[0.625rem]"
                disabled={isPending}
              >
                <Typography.P3 className="text-white">저장</Typography.P3>
              </Button.Fill>
            </Container.FlexRow>
          </Container.FlexRow>
          <Divider.Col className="mb-8 mt-5" />
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
            &#183; 사진은 자동으로 150x150 사이즈로 적용됩니다.
          </Typography.P3>
          <Container.FlexCol className="mb-[5.75rem] w-[30.375rem] gap-y-10 pt-11 [&>div]:items-center">
            <Container.FlexRow className="items-center">
              <Typography.SubTitle2
                className={`pr-[9.125rem] text-brown ${isEdit.nickname ? 'pb-5' : ''}`}
              >
                이름
              </Typography.SubTitle2>
              {isEdit.nickname ? (
                <FormItem.TextField
                  name="nickname"
                  placeholder="이름 변경"
                  disabled={isPending}
                  className=""
                />
              ) : (
                <>
                  <Typography.P2 className="flex-1 text-brown">
                    {user.user_metadata.nickname}
                  </Typography.P2>
                  <Button.Outline
                    className="rounded-[3.125rem] px-[1.4375rem] py-[0.5625rem]"
                    disabled={isPending}
                    onClick={() =>
                      setIsEdit(prev => ({ ...prev, nickname: true }))
                    }
                  >
                    <Typography.P3 className="text-brown">변경</Typography.P3>
                  </Button.Outline>
                </>
              )}
            </Container.FlexRow>
            <Container.FlexRow>
              <Typography.SubTitle2 className="pr-[8.125rem] text-brown">
                아이디
              </Typography.SubTitle2>
              <Typography.P2 className="flex-1 text-brown">
                {user.email}
              </Typography.P2>
            </Container.FlexRow>
            {user.app_metadata.provider === 'email' && (
              <Container.FlexRow
                className={isEdit.password ? '!items-start' : ''}
              >
                <Typography.SubTitle2
                  className={`pr-[7.0625rem] text-brown ${isEdit.password ? 'pt-3' : ''}`}
                >
                  비밀번호
                </Typography.SubTitle2>
                {isEdit.password ? (
                  <Container.FlexCol>
                    <FormItem.Password
                      name="password"
                      placeholder="비밀번호 수정"
                      disabled={isPending}
                      isVisible={passwordVisible}
                      onClickVisible={() => setPasswordVisible(prev => !prev)}
                    />
                    <FormItem.Password
                      name="confirmPassword"
                      placeholder="비밀번호 확인"
                      disabled={isPending}
                      isVisible={passwordVisible}
                      onClickVisible={() => setPasswordVisible(prev => !prev)}
                    />
                  </Container.FlexCol>
                ) : (
                  <>
                    <Container.FlexRow className="flex-1 items-center gap-x-1">
                      {Array.from({ length: 6 }).map(() => (
                        // eslint-disable-next-line react/jsx-key
                        <PasswordDot />
                      ))}
                    </Container.FlexRow>
                    <Button.Outline
                      className="rounded-[3.125rem] px-[1.4375rem] py-[0.5625rem]"
                      disabled={isPending}
                      onClick={() =>
                        setIsEdit(prev => ({ ...prev, password: true }))
                      }
                    >
                      <Typography.P3 className="text-brown">변경</Typography.P3>
                    </Button.Outline>
                  </>
                )}
              </Container.FlexRow>
            )}
          </Container.FlexCol>
          {session?.user.app_metadata.provider !== 'email' ? (
            <Container.FlexCol>
              <Typography.SubTitle2 className="mb-9 text-brown">
                계정 연동
              </Typography.SubTitle2>
              <Container.FlexRow className="items-center">
                <Badge.Outline
                  className={`mr-[0.9375rem] rounded-full ${session?.user.app_metadata.provider === 'google' ? 'p-[0.6875rem]' : 'px-2.5 py-[0.6875rem]'}`}
                  focus={false}
                  active={false}
                  hover={false}
                >
                  <Icon
                    type={
                      session?.user.app_metadata.provider === 'google'
                        ? 'google-logo'
                        : 'kakaotalk-logo-text'
                    }
                  />
                </Badge.Outline>
                <Typography.P3 className="mr-[18.5rem] text-brown">
                  {session?.user.app_metadata.provider === 'google'
                    ? 'Google'
                    : 'Kakaotalk'}
                </Typography.P3>
                <Typography.P3 className="text-brown1">연결됨</Typography.P3>
              </Container.FlexRow>
            </Container.FlexCol>
          ) : null}
          <Button.Ghost
            className="mt-[5.75rem]"
            disabled={isPending}
            onClick={() => setConfirmModal(confirmModalContext)}
          >
            <Typography.P3 className="text-brown underline underline-offset-2">
              회원 탈퇴
            </Typography.P3>
          </Button.Ghost>
        </Container.FlexCol>
      </form>
    </FormProvider>
  );
}
