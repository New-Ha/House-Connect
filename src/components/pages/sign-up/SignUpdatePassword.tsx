import { SignLayoutWrapper } from '@/components/templates/sign-up/SignLayout.template';
import SignUpdatePasswordTemplate from '@/components/templates/sign-up/SignUpdatePassword.template';

export default function SignUpdatePassword() {
  return (
    <SignLayoutWrapper className="gap-[3.75rem]">
      <SignUpdatePasswordTemplate />
    </SignLayoutWrapper>
  );
}
