import { useRecoilValue } from 'recoil';

import MyAccountTemplate from '@/components/templates/mypage/MyAccount.template';
import { SessionAtom } from '@/stores/auth.store';
import Typography from '@/components/atoms/Typography';

export default function MyAccount() {
  const session = useRecoilValue(SessionAtom);
  if (!session) return <Typography.Head2>데이터가 없습니다.</Typography.Head2>;
  return <MyAccountTemplate session={session} />;
}
