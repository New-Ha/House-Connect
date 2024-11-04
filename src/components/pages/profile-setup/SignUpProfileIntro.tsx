import { useRecoilValue } from 'recoil';

import SignUpProfileIntroTemplate from '@/components/templates/profile-setup/SignUpProfileIntro.template';
import { UserAtom } from '@/stores/auth.store';

export default function SignUpProfileIntro() {
  const user = useRecoilValue(UserAtom);

  return <SignUpProfileIntroTemplate name={user?.name ?? ''} />;
}
