import { useSuspenseQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import MyActivityTemplate from '@/components/templates/mypage/MyActivity.template';
import { userInfoQuery, UserInfoType } from '@/hooks/useUserInfo';
import { UserAtom } from '@/stores/auth.store';
import WithSuspenseAndErrorBoundary from '@/components/molecules/WithSuspenseAndErrorBoundary';

export function MyActivity() {
  const user = useRecoilValue(UserAtom);
  const { data } = useSuspenseQuery(userInfoQuery(user));

  return <MyActivityTemplate user={data as UserInfoType} />;
}

const SuspendedMyActivity = WithSuspenseAndErrorBoundary({
  InnerSuspenseComponent: MyActivity,
});

export default SuspendedMyActivity;
