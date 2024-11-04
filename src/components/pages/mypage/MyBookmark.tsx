import { useRecoilState, useRecoilValue } from 'recoil';
import { useQueries } from '@tanstack/react-query';

import MyBookmarkTemplate from '@/components/templates/mypage/MyBookmark.template';
import { UserAtom } from '@/stores/auth.store';
import {
  HouseBookmarkType,
  useMyBookmarkHouseCount,
  useMyBookmarkHouseList,
} from '@/hooks/useMyBookmark';
import {
  BookmarkHouseFilterAtom,
  BookmarkPageAtom,
} from '@/stores/bookmark.store';

export default function MyBookmark() {
  const user = useRecoilValue(UserAtom);
  const pageState = useRecoilState(BookmarkPageAtom);
  const houseFilter = useRecoilValue(BookmarkHouseFilterAtom);

  // TODO Lounge, Article을 생성 후 변경
  const data = useQueries({
    queries: [
      useMyBookmarkHouseList(user, pageState[0], houseFilter),
      useMyBookmarkHouseCount(user, houseFilter),
    ],
  });

  const [houseListData, houseCountData] = data;

  const { data: house } = houseListData;
  const { data: houseCount } = houseCountData;

  return (
    <MyBookmarkTemplate
      house={house?.data as HouseBookmarkType[]}
      houseCount={houseCount?.count as number}
      pageState={pageState}
    />
  );
}
