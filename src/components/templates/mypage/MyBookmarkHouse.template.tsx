import { KeyboardEvent } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useSuspenseQuery } from '@tanstack/react-query';

import {
  HouseBookmarkType,
  useMyBookmarkHouseList,
} from '@/hooks/useMyBookmark';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import {
  BookmarkHouseFilterAtom,
  BookmarkPageAtom,
} from '@/stores/bookmark.store';
import HouseCard from '@/components/organisms/HouseCard';
import { WithSuspense } from '@/components/organisms/withAsyncErrorHandling';
import { UserAtom } from '@/stores/auth.store';
import Pagination from '@/components/organisms/Pagination';
import Loading from '@/components/pages/maintenance/Loading';

type HousesType = HouseBookmarkType[] | undefined;

function MyBookmarkHouseTemplate() {
  const user = useRecoilValue(UserAtom);
  const pageState = useRecoilState(BookmarkPageAtom);
  const houseFilter = useRecoilValue(BookmarkHouseFilterAtom);
  const { data } = useSuspenseQuery(
    useMyBookmarkHouseList(user, pageState[0], houseFilter),
  );
  const setHouseFilter = useSetRecoilState(BookmarkHouseFilterAtom);
  const onEnterSearchFilter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      setHouseFilter(e.currentTarget.value);
    }
  };

  const houses = data as HousesType;

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
        <Container.Grid className="flex-1 grid-cols-1 items-start gap-x-[1.125rem] gap-y-10 pt-10 s-tablet:grid-cols-2 laptop:grid-cols-3">
          {houses && houses?.length > 0 ? (
            houses.map(({ house }) => <HouseCard key={house.id} {...house} />)
          ) : (
            <Typography.Span1 className="text-brown">
              북마크 된 하우스가 없습니다.
            </Typography.Span1>
          )}
        </Container.Grid>
      </Container.FlexCol>
      <Container>
        <Pagination
          totalPage={houses && houses.length ? houses.length : 0}
          pageState={pageState}
        />
      </Container>
    </>
  );
}

const SuspendedMyBookmarkHouseTemplate = WithSuspense({
  InnerSuspenseComponent: MyBookmarkHouseTemplate,
  SuspenseFallback: <Loading className="size-full" />,
});

export default SuspendedMyBookmarkHouseTemplate;
