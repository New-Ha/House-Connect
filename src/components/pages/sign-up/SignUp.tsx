import { SignLayoutWrapper } from '@/components/templates/sign-up/SignLayout.template';
import SignUpTemplate from '@/components/templates/sign-up/SignUp.template';

export default function SignUp() {
  return (
    <SignLayoutWrapper className="gap-[2.5rem]">
      <SignUpTemplate />
    </SignLayoutWrapper>
  );
}
