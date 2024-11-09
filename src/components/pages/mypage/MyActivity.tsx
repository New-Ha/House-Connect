import { useSuspenseQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import MyActivityTemplate from '@/components/templates/mypage/MyActivity.template';
import { userInfoQuery, UserInfoType } from '@/hooks/useUserInfo';
import { UserAtom } from '@/stores/auth.store';
import { WithSuspense } from '@/components/organisms/withAsyncErrorHandling';
import Loading from '@/components/pages/maintenance/Loading';

export function MyActivityPageComponent() {
  const user = useRecoilValue(UserAtom);
  const { data } = useSuspenseQuery(userInfoQuery(user));

  return <MyActivityTemplate user={data as UserInfoType} />;
}

const MyActivity = WithSuspense({
  InnerSuspenseComponent: MyActivityPageComponent,
  SuspenseFallback: <Loading className="size-full" />,
});

export default MyActivity;
