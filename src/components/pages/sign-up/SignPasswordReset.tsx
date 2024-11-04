import { SignLayoutWrapper } from '@/components/templates/sign-up/SignLayout.template';
import SignPasswordResetTemplate from '@/components/templates/sign-up/SignPasswordReset.template';

export default function SignPasswordReset() {
  return (
    <SignLayoutWrapper className="gap-[2.5rem]">
      <SignPasswordResetTemplate />
    </SignLayoutWrapper>
  );
}
