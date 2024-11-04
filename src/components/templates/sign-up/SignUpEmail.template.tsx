import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

import { ShowVerificationAtom } from '@/stores/sign.store';
import {
  SignUpEmail,
  SignUpEmailType,
  VerifyEmailType,
} from '@/types/auth.type';
import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import FormItem from '@/components/molecules/FormItem';
import {
  useResendVerifyMail,
  useSignUpEmail,
  useVerifyEmail,
} from '@/hooks/useSign';

export default function SignUpEmailTemplate() {
  const Form = FormProvider;
  const form = useForm<SignUpEmailType>({
    resolver: zodResolver(SignUpEmail),
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const showVerification = useRecoilValue(ShowVerificationAtom);

  const { signUpEmail, isSignUpEmail } = useSignUpEmail();
  const { verifyEmail, isVerifyEmail } = useVerifyEmail({
    mutateMessage: '인증 중입니다.',
    successMessage: '🎉인증성공! 회원가입 되셨습니다!',
  });
  const { resendVerifyMail, isResending } = useResendVerifyMail();

  const onClickVisible = () => setPasswordVisible(prev => !prev);

  const isPending = isSignUpEmail || isVerifyEmail || isResending;

  const onSubmitSignUp = async (formData: SignUpEmailType) => {
    signUpEmail(formData);
  };

  const onSubmitVerify = async (formData: VerifyEmailType) => {
    verifyEmail(formData);
  };

  const onSubmit: SubmitHandler<SignUpEmailType> = data =>
    !showVerification
      ? onSubmitSignUp(data as SignUpEmailType)
      : onSubmitVerify(data as VerifyEmailType);

  const onClickResend = async () => {
    resendVerifyMail({ email: form.getValues('email') });
  };

  return (
    <Container.FlexCol className="min-w-full flex-1 gap-[3.25rem]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Container.FlexCol className="gap-[1.75rem]">
            <FormItem.TextField
              labelName="이메일"
              type="text"
              name="email"
              placeholder="이메일 입력"
              inputStyle="w-full mt-[1rem]"
            />
            <FormItem.Password
              labelName="비밀번호"
              type="password"
              name="password"
              placeholder="비밀번호 입력"
              inputStyle="w-full mt-[1rem]"
              isVisible={passwordVisible}
              onClickVisible={onClickVisible}
            />
            <FormItem.Password
              labelName="비밀번호 재입력"
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 입력"
              inputStyle="w-full mt-[1rem]"
              isVisible={passwordVisible}
              onClickVisible={onClickVisible}
            />
          </Container.FlexCol>
          {showVerification ? (
            <>
              <Container.FlexRow className="items-center gap-x-2">
                <FormItem.TextField
                  labelName="인증번호"
                  type="text"
                  name="token"
                  options={{ required: '인증번호를 입력해주세요.' }}
                  placeholder="인증번호 입력"
                  inputStyle="w-full mt-[1rem]"
                  containerStyle="mt-[1.625rem] flex-1"
                />
                <Button.Outline
                  className="mt-[2.3125rem] inline items-center rounded-[10px] pb-[1.03125rem] pt-[0.90625rem]"
                  onClick={onClickResend}
                >
                  <Typography.P3 className="px-[1.65625rem] pb-[0.0625rem] pt-[0.375rem] text-brown">
                    재전송
                  </Typography.P3>
                </Button.Outline>
              </Container.FlexRow>
              <Button.Fill
                type="submit"
                className="mt-[2.5rem] w-full rounded-[10px] py-[0.25rem]"
                disabled={isPending}
              >
                <Typography.P3 className="mx-auto my-[1rem] text-[#F4E7DB]">
                  다음
                </Typography.P3>
              </Button.Fill>
            </>
          ) : (
            <Button.Fill
              type="submit"
              className="mt-[2.5rem] w-full rounded-[10px] py-[0.25rem]"
              disabled={isPending}
            >
              <Typography.P3 className="mx-auto my-[1rem] text-[#F4E7DB]">
                인증 요청
              </Typography.P3>
            </Button.Fill>
          )}
        </form>
      </Form>
    </Container.FlexCol>
  );
}
