import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import MyActivityTemplate from '@/components/templates/mypage/MyActivity.template';
import { userInfoQuery, UserInfoType } from '@/hooks/useUserInfo';
import { UserAtom } from '@/stores/auth.store';

export default function MyActivity() {
  const user = useRecoilValue(UserAtom);
  // TODO merge후 refactoring
  const { data } = useQuery(userInfoQuery(user));
  if (!data) return <h1>data가 없습니다.</h1>;
  return <MyActivityTemplate user={data.data as unknown as UserInfoType} />;
}
