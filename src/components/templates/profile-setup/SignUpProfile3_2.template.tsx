import { useRecoilState } from 'recoil';
import { KeyboardEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/profile-setup/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';
import { SignupProfileStateSelector } from '@/stores/sign.store';
import BadgeButtons from '@/components/molecules/BadgeButtons';
import FormItem from '@/components/molecules/FormItem';
import { signUpProfileBadgeExamples } from '@/constants/signUpProfileData';
import { SignUpProfileFormType } from '@/types/signUp.type';
import { createToast } from '@/libs/toast';

export default function SignUpProfile3_2Template() {
  const [mateAppeals, setMateAppeals] = useRecoilState(
    SignupProfileStateSelector('mate_appeals'),
  );

  const { trigger, setValue, watch } =
    useFormContext<Pick<SignUpProfileFormType, 'mateAppealsInputValue'>>();

  const createBadge = async (badgeContent: string) => {
    if (!mateAppeals.includes(badgeContent) && badgeContent !== '') {
      setValue('mateAppealsInputValue', '');

      if (mateAppeals.length >= 5) {
        createToast('maxMateAppealsLimit', '최대 5개까지 작성 가능합니다.', {
          type: 'warning',
          isLoading: false,
          containerId: 'signUpProfileToastContainer',
          autoClose: 1000,
        });

        return;
      }

      setMateAppeals(prev => [...prev, badgeContent]);
    }
  };

  const deleteBadge = (badgeContent: string) =>
    setMateAppeals(prev =>
      prev.filter(mateAppeal => mateAppeal !== badgeContent),
    );

  const pressEnterCreateBadge = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      const isBadgeContentValid = await trigger('mateAppealsInputValue');

      if (isBadgeContentValid)
        await createBadge(watch('mateAppealsInputValue'));
    }
  };

  return (
    <Container.FlexCol className="min-w-full p-2">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate
          step="3-2"
          title="내가 원하는 룸메이트는..."
        />
        <Container.FlexCol className="mb-[3.75rem]">
          <Typography.SubTitle1 className="mb-7 flex flex-wrap items-center gap-[0.375rem] leading-150 text-brown">
            원하는 룸메이트의 스타일을 선택해주세요
            <Typography.P3 className="min-w-fit font-medium text-brown1">
              (최대 5개)
            </Typography.P3>
          </Typography.SubTitle1>
          <BadgeButtons
            contents={signUpProfileBadgeExamples}
            className="flex flex-wrap gap-x-2 gap-y-3 [&_p]:translate-y-[-0.0625rem]"
            badgeStyle="gap-x-3 tablet:gap-x-5 rounded-[1.875rem] py-[0.75rem] px-4"
            stroke="bg"
            typoStyle="text-bg"
            typoType="P2"
            onClick={createBadge}
          />
        </Container.FlexCol>
        <Container.FlexCol>
          <Typography.SubTitle1 className="mb-5 leading-150 text-brown">
            원하는 스타일이 더 있다면 작성해주세요
          </Typography.SubTitle1>
          <FormItem.TextField<
            Pick<SignUpProfileFormType, 'mateAppealsInputValue'>
          >
            placeholder="ex) 늦게 자요, 청소 자주해요, 코골이 해요"
            type="text"
            name="mateAppealsInputValue"
            onKeyDown={pressEnterCreateBadge}
            inputStyle="w-full"
            containerStyle="mb-3 max-w-[30.375rem]"
          />
          <BadgeButtons
            contents={mateAppeals}
            className="flex flex-wrap gap-x-2 gap-y-3 [&_p]:translate-y-[-0.0625rem]"
            badgeStyle="gap-x-3 rounded-[1.875rem] py-[0.75rem] px-4"
            stroke="bg"
            iconType="close"
            typoStyle="text-bg"
            typoType="P2"
            onClick={deleteBadge}
          />
          <FormItem.Hidden<Pick<SignUpProfileFormType, 'mate_appeals'>>
            name="mate_appeals"
            valueProp={mateAppeals}
          />
        </Container.FlexCol>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
