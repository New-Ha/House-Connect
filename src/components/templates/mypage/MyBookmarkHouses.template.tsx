import { KeyboardEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { ClipLoader } from 'react-spinners';

import {
  HouseBookmarkType,
  useInfiniteMyBookmarkHouseList,
} from '@/hooks/useMyBookmark';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import { BookmarkHouseFilterAtom } from '@/stores/bookmark.store';
import HouseCard from '@/components/organisms/HouseCard';
import { WithSuspense } from '@/components/organisms/withAsyncErrorHandling';
import { UserAtom } from '@/stores/auth.store';
import Loading from '@/components/pages/maintenance/Loading';
import useIsOverSTabletBreakpoint from '@/hooks/useIsOverSTabletBreakpoint';
import CustomIntersectionObserver from '@/components/organisms/CustomIntersectionObserver';

type HousesType = HouseBookmarkType[] | undefined;

function MyBookmarkHouseTemplateComponent() {
  const user = useRecoilValue(UserAtom);
  const [houseFilter, setHouseFilter] = useRecoilState(BookmarkHouseFilterAtom);
  const [isOverSTabletBreakPoint] = useIsOverSTabletBreakpoint();
  const { data, isFetching, fetchNextPage } = useSuspenseInfiniteQuery(
    useInfiniteMyBookmarkHouseList(user, houseFilter, 4),
  );

  const onEnterSearchFilter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      setHouseFilter(e.currentTarget.value);
    }
  };

  const houses = data?.pages.flatMap(page => page) as HousesType;

  return (
    <>
      <Container.FlexCol className="size-full">
        <Container>
          <Container className="relative">
            <Icon className="absolute inset-y-4 left-4" type="search" />
            <Input
              className="mt-10 w-full border-none !bg-brown4 pl-14 placeholder:text-brown2"
              placeholder="위치 검색"
              onKeyDown={onEnterSearchFilter}
            />
          </Container>
        </Container>
        <Container.Grid className="flex-1 grid-cols-1 items-start gap-x-[1.125rem] gap-y-10 py-10 s-tablet:grid-cols-2 laptop:grid-cols-3">
          {houses && houses?.length > 0 ? (
            houses.map(({ house }) => <HouseCard key={house.id} {...house} />)
          ) : (
            <Typography.Span1 className="text-brown">
              북마크 된 하우스가 없습니다.
            </Typography.Span1>
          )}
        </Container.Grid>
      </Container.FlexCol>
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
    </>
    /* TODO: 무한 스크롤에서 pagination으로 대체 시 사용하기 */
    //   <Container>
    //   <Pagination
    //     totalPage={houses && houses.length ? houses.length : 0}
    //     pageState={pageState}
    //   />
    // </Container>
  );
}

const BookmarkHouseTemplate = WithSuspense({
  InnerSuspenseComponent: MyBookmarkHouseTemplateComponent,
  SuspenseFallback: <Loading className="size-full" />,
});

export default BookmarkHouseTemplate;
