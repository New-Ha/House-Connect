import { useRecoilState, useRecoilValue } from 'recoil';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';

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
import Container from '@/components/atoms/Container';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import Pagination from '@/components/organisms/Pagination';
import MyBookmarkHouseTemplate from '@/components/templates/mypage/MyBookmarkHouse.template';
import MyBookmarkLoungeTemplate from '@/components/templates/mypage/MyBookmarkLounge.template';
import MyBookmarkArticleTemplate from '@/components/templates/mypage/MyBookmarkArticle.template';

export default function MyBookmark() {
  const user = useRecoilValue(UserAtom);
  const pageState = useRecoilState(BookmarkPageAtom);
  const [currentTab, setCurrentTab] = useState(0);
  const houseFilter = useRecoilValue(BookmarkHouseFilterAtom);
  const data = useQueries({
    queries: [
      useMyBookmarkHouseList(user, pageState[0], houseFilter),
      useMyBookmarkHouseCount(user, houseFilter),
    ],
  });
  const [houseListData, houseCountData] = data;

  const { data: house } = houseListData;
  const { data: houseCount } = houseCountData;

  const tabItem = ['하우스', '라운지', '게시물'];

  return (
    <>
      <Container.FlexCol className="h-full">
        <Container.FlexRow>
          {tabItem.map((item, index) => (
            <Button.Ghost
              key={item}
              className={`h-14 w-[11.25rem] items-center justify-center border-b-brown text-brown2 ${currentTab === index ? 'border-b-3 text-brown' : ''}`}
              onClick={() => {
                setCurrentTab(index);
              }}
            >
              <Typography.SubTitle1>{item}</Typography.SubTitle1>
            </Button.Ghost>
          ))}
        </Container.FlexRow>
        {currentTab === 0 && (
          <MyBookmarkHouseTemplate house={house?.data as HouseBookmarkType[]} />
        )}
        {currentTab === 1 && <MyBookmarkLoungeTemplate />}
        {currentTab === 2 && <MyBookmarkArticleTemplate />}
      </Container.FlexCol>
      <Container>
        <Pagination
          totalPage={houseCount?.count as number}
          pageState={pageState}
        />
      </Container>
    </>
  );
}
