import { WithSuspense } from '@/components/organisms/withAsyncErrorHandling';
import Loading from '@/components/pages/maintenance/Loading';
import MyAccountTemplate from '@/components/templates/mypage/MyAccount.template';

export default function MyAccount() {
  const WithSuspenseMyAccountTemplate = WithSuspense({
    InnerSuspenseComponent: MyAccountTemplate,
    SuspenseFallback: <Loading className="size-full" />,
  });

  return <WithSuspenseMyAccountTemplate />;
}
