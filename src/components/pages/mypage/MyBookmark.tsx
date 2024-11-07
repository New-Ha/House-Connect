import { useState } from 'react';

import Container from '@/components/atoms/Container';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import MyBookmarkHouseTemplate from '@/components/templates/mypage/MyBookmarkHouse.template';
import MyBookmarkLoungeTemplate from '@/components/templates/mypage/MyBookmarkLounge.template';
import MyBookmarkArticleTemplate from '@/components/templates/mypage/MyBookmarkArticle.template';
import cn from '@/libs/cn';
import { WithSuspense } from '@/components/organisms/withAsyncErrorHandling';
import Loading from '@/components/pages/maintenance/Loading';

function MyBookmark() {
  const [currentTab, setCurrentTab] = useState(0);
  const tabItem = ['하우스', '라운지', '게시물'];

  return (
    <Container.FlexCol className="size-full">
      <Container.FlexRow>
        {tabItem.map((item, index) => (
          <Button.Ghost
            key={item}
            className={cn(
              'flex-1 items-center justify-center border-b-brown px-[1.54rem] py-[1.385rem] text-brown2 s-tablet:w-[8.3rem] s-tablet:flex-none tablet:p-5',
              currentTab === index ? 'border-b-3 text-brown' : '',
            )}
            onClick={() => {
              setCurrentTab(index);
            }}
          >
            <Typography.SubTitle1 className="text-[1.077rem] font-semibold tablet:text-lg">
              {item}
            </Typography.SubTitle1>
          </Button.Ghost>
        ))}
      </Container.FlexRow>
      {currentTab === 0 && <MyBookmarkHouseTemplate />}
      {currentTab === 1 && <MyBookmarkLoungeTemplate />}
      {currentTab === 2 && <MyBookmarkArticleTemplate />}
    </Container.FlexCol>
  );
}

const SuspendedMyBookmark = WithSuspense({
  InnerSuspenseComponent: MyBookmark,
  SuspenseFallback: <Loading className="size-full" />,
});

export default SuspendedMyBookmark;
