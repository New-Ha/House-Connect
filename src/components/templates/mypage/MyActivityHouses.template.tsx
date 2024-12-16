import { useRecoilValue } from 'recoil';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { ClipLoader } from 'react-spinners';

import { WithSuspenseAndErrorBoundary } from '@/components/organisms/withAsyncErrorHandling';
import Loading from '@/components/pages/maintenance/Loading';
import { myHousePostQuery } from '@/hooks/useMyActivity';
import { UserAtom } from '@/stores/auth.store';
import Typography from '@/components/atoms/Typography';
import CustomIntersectionObserver from '@/components/organisms/CustomIntersectionObserver';
import HouseCard from '@/components/organisms/HouseCard';
import Container from '@/components/atoms/Container';
import useIsOverSTabletBreakpoint from '@/hooks/useIsOverSTabletBreakpoint';

function MyActivityHousesTemplate() {
  const user = useRecoilValue(UserAtom);
  const [isOverSTabletBreakPoint] = useIsOverSTabletBreakpoint();
  const { data, isFetching, fetchNextPage } = useSuspenseInfiniteQuery(
    myHousePostQuery(user?.id as string),
  );

  const myHousePosts = data.pages.flatMap(page => page);

  return (
    <Container>
      <Container.Grid className="flex-1 grid-cols-1 items-start gap-x-[1.125rem] gap-y-10 py-10 s-tablet:grid-cols-2 laptop:grid-cols-3">
        {myHousePosts && myHousePosts?.length > 0 ? (
          myHousePosts.map(myPost => <HouseCard key={myPost.id} {...myPost} />)
        ) : (
          <Typography.Span1 className="text-brown">
            작성한 게시글이 없습니다.
          </Typography.Span1>
        )}
      </Container.Grid>
      <CustomIntersectionObserver callback={fetchNextPage}>
        {isFetching && (
          <ClipLoader
            key="ClipLoader"
            size={isOverSTabletBreakPoint ? 40 : 20}
            loading
            color="#643927"
          />
        )}
      </CustomIntersectionObserver>
    </Container>
  );
}

const MyActivityHouses = WithSuspenseAndErrorBoundary({
  InnerSuspenseComponent: MyActivityHousesTemplate,
  SuspenseFallback: <Loading className="size-full py-28" />,
});

export default MyActivityHouses;
