import { useRecoilState } from 'recoil';
import { KeyboardEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/profile-setup/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';
import BadgeButtons from '@/components/molecules/BadgeButtons';
import { SignupProfileStateSelector } from '@/stores/sign.store';
import FormItem from '@/components/molecules/FormItem';
import { signUpProfileBadgeExamples } from '@/constants/signUpProfileData';
import { SignUpProfileFormType } from '@/types/signUp.type';
import { createToast } from '@/libs/toast';

export default function SignUpProfile2_2Template() {
  const [appeals, setAppeals] = useRecoilState(
    SignupProfileStateSelector('appeals'),
  );

  const { trigger, setValue, watch } =
    useFormContext<Pick<SignUpProfileFormType, 'appealsInputValue'>>();

  const createBadge = async (badgeContent: string) => {
    if (!appeals.includes(badgeContent) && badgeContent !== '') {
      setValue('appealsInputValue', '');

      if (appeals.length >= 5) {
        createToast('maxAppealsLimit', '최대 5개까지 작성 가능합니다.', {
          type: 'warning',
          isLoading: false,
          containerId: 'signUpProfileToastContainer',
          autoClose: 1000,
        });

        return;
      }

      setAppeals(prev => [...prev, badgeContent]);
    }
  };

  const deleteBadge = (badgeContent: string) =>
    setAppeals(prev => prev.filter(appeal => appeal !== badgeContent));

  const pressEnterCreateBadge = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      const isBadgeContentValid = await trigger('appealsInputValue');
      if (isBadgeContentValid) await createBadge(watch('appealsInputValue'));
    }
  };

  return (
    <Container.FlexCol className="min-w-full p-2">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate
          step="2-2"
          title="나의 라이프스타일은..."
        />
        <Container.FlexCol className="mb-[3.75rem]">
          <Typography.SubTitle1 className="mb-7 flex flex-wrap items-center gap-[0.375rem] leading-150 text-brown">
            어필하고 싶은 스타일을 선택해주세요{' '}
            <Typography.P3 className="min-w-fit font-medium text-brown1">
              (최대 5개)
            </Typography.P3>
          </Typography.SubTitle1>
          <BadgeButtons
            contents={signUpProfileBadgeExamples}
            className="flex flex-wrap gap-x-2 gap-y-3"
            badgeStyle="gap-x-5 rounded-[1.875rem] py-[0.75rem] px-4 [&_p]:translate-y-[-0.0625rem]"
            stroke="bg"
            typoStyle="text-bg"
            typoType="P2"
            onClick={createBadge}
          />
        </Container.FlexCol>
        <Container.FlexCol>
          <Typography.SubTitle1 className="mb-5 leading-150 text-brown">
            어필하고 싶은 것이 더 있다면 작성해주세요
          </Typography.SubTitle1>
          <FormItem.TextField<Pick<SignUpProfileFormType, 'appealsInputValue'>>
            placeholder="ex) 늦게 자요, 청소 자주해요, 코골이 해요"
            type="text"
            name="appealsInputValue"
            onKeyDown={pressEnterCreateBadge}
            inputStyle="w-full"
            containerStyle="mb-3 max-w-[30.375rem]"
          />
          <BadgeButtons
            contents={appeals}
            className="flex flex-wrap gap-x-2 gap-y-3 [&_p]:translate-y-[-0.0625rem]"
            badgeStyle="gap-x-3 rounded-[1.875rem] py-[0.75rem] px-4"
            stroke="bg"
            iconType="close"
            typoStyle="text-bg"
            typoType="P2"
            onClick={deleteBadge}
          />
          <FormItem.Hidden<Pick<SignUpProfileFormType, 'appeals'>>
            name="appeals"
            valueProp={appeals}
          />
        </Container.FlexCol>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
