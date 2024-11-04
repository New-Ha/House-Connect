/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
  FieldErrors,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { KeyboardEvent, useEffect } from 'react';
import { DevTool } from '@hookform/devtools';
import { useRecoilValue } from 'recoil';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastContainer } from 'react-toastify';

import SignUpProfileLayoutTemplate from '@/components/templates/profile-setup/SignUpProfileLayout.template';
import SignUpProfile1_1Template from '@/components/templates/profile-setup/SignUpProfile1_1.template';
import SignUpProfile1_2Template from '@/components/templates/profile-setup/SignUpProfile1_2.template';
import SignUpProfile1_3Template from '@/components/templates/profile-setup/SignUpProfile1_3.template';
import SignUpProfile2_1Template from '@/components/templates/profile-setup/SignUpProfile2_1.template';
import SignUpProfile2_2Template from '@/components/templates/profile-setup/SignUpProfile2_2.template';
import SignUpProfile3_1Template from '@/components/templates/profile-setup/SignUpProfile3_1.template';
import SignUpProfile3_2Template from '@/components/templates/profile-setup/SignUpProfile3_2.template';
import { SignUpProfileForm, SignUpProfileFormType } from '@/types/signUp.type';
import { SignUpProfileState } from '@/stores/sign.store';
import { createToast } from '@/libs/toast';
import useSignUpProfile from '@/hooks/useSignUpProfile';

export default function SignUpProfile() {
  const signUpProfileState = useRecoilValue(SignUpProfileState);
  const { mutate, isPending } = useSignUpProfile();
  const formMethods = useForm<SignUpProfileFormType>({
    mode: 'onChange',
    defaultValues: {
      type: undefined,
      rental_type: undefined,
      regions: [],
      smoking: undefined,
      pet: undefined,
      mate_gender: undefined,
      mate_number: undefined,
      appeals: [],
      mate_appeals: [],
      term: [],
      deposit_price: [],
      monthly_rental_price: [],
      appealsInputValue: '',
      mateAppealsInputValue: '',
    },
    resolver: zodResolver(SignUpProfileForm),
  });

  useEffect(() => {
    Object.entries(signUpProfileState).forEach(async ([key, value]) => {
      formMethods.setValue(key as keyof SignUpProfileFormType, value);
      if (key !== 'appealsInputValue' && key !== 'mateAppealsInputValue')
        await formMethods.trigger(key as keyof SignUpProfileFormType);
    });
  }, [formMethods, signUpProfileState]);

  const onError: SubmitErrorHandler<SignUpProfileFormType> = data => {
    Object.entries(data as FieldErrors<SignUpProfileFormType>).forEach(
      ([key, value]) => {
        if (value.message) {
          createToast(`${key}ValidationError`, value.message, {
            containerId: 'signUpProfileToastContainer',
            autoClose: 1000,
            isLoading: false,
            type: 'error',
          });
        }
      },
    );
  };

  // * profile에 필요한 recoil state들 전체 update
  const testOnSubmit: SubmitHandler<SignUpProfileFormType> = (
    formData: SignUpProfileFormType,
  ) => {
    mutate(formData);
  };

  const preventFormTakeSubmitEvent = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement)
      e.preventDefault();
  };

  return (
    <FormProvider {...formMethods}>
      <ToastContainer
        containerId="signUpProfileToastContainer"
        position="top-center"
        stacked={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
        pauseOnFocusLoss={false}
      />
      <form
        onSubmit={formMethods.handleSubmit(testOnSubmit, onError)}
        onKeyDown={preventFormTakeSubmitEvent}
      >
        <SignUpProfileLayoutTemplate isSubmitted={isPending}>
          <SignUpProfile1_1Template />
          <SignUpProfile1_2Template />
          <SignUpProfile1_3Template />
          <SignUpProfile2_1Template />
          <SignUpProfile2_2Template />
          <SignUpProfile3_1Template />
          <SignUpProfile3_2Template />
        </SignUpProfileLayoutTemplate>
      </form>
      <DevTool control={formMethods.control} />
    </FormProvider>
  );
}
