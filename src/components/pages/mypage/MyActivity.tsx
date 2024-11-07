import { useSuspenseQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import MyActivityTemplate from '@/components/templates/mypage/MyActivity.template';
import { userInfoQuery, UserInfoType } from '@/hooks/useUserInfo';
import { UserAtom } from '@/stores/auth.store';
import { WithSuspense } from '@/components/organisms/withAsyncErrorHandling';
import Loading from '@/components/pages/maintenance/Loading';

export function MyActivity() {
  const user = useRecoilValue(UserAtom);
  const { data } = useSuspenseQuery(userInfoQuery(user));

  return <MyActivityTemplate user={data as UserInfoType} />;
}

const SuspendedMyActivity = WithSuspense({
  InnerSuspenseComponent: MyActivity,
  SuspenseFallback: <Loading className="size-full" />,
});

export default SuspendedMyActivity;
