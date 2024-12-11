import SignInTemplate from '@/components/templates/sign-up/SignIn.template';
import { SignLayoutWrapper } from '@/components/templates/sign-up/SignLayout.template';

export default function SignIn() {
  return (
    <SignLayoutWrapper className="gap-[3.75rem]">
      <SignInTemplate />
    </SignLayoutWrapper>
  );
}
