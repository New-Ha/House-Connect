import SignInTemplate from '@/components/templates/sign-up/SignInTemplate';
import { SignLayoutWrapper } from '@/components/templates/sign-up/SignLayout.template';

export default function SignIn() {
  return (
    <SignLayoutWrapper className="gap-[3.75rem]">
      <SignInTemplate />
    </SignLayoutWrapper>
  );
}
