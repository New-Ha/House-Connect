import { KeyboardEvent } from 'react';
import { useSetRecoilState } from 'recoil';

import { HouseBookmarkType } from '@/hooks/useMyBookmark';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import { BookmarkHouseFilterAtom } from '@/stores/bookmark.store';
import HouseCard from '@/components/organisms/HouseCard';

type MyBookmarkHouseTemplateProps = {
  house: HouseBookmarkType[];
};

function MyBookmarkHouseTemplate(props: MyBookmarkHouseTemplateProps) {
  const { house } = props;
  const setHouseFilter = useSetRecoilState(BookmarkHouseFilterAtom);
  const onEnterSearchFilter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      setHouseFilter(e.currentTarget.value);
    }
  };

  return (
    <Container.FlexCol className="size-full">
      <Container>
        <Container className="relative bg-purple-200">
          <Icon className="absolute inset-y-4 left-4" type="search" />
          <Input
            className="placholder:text-brown2 mt-10 w-full border-none !bg-brown4 pl-14"
            placeholder="위치 검색"
            onKeyDown={onEnterSearchFilter}
          />
        </Container>
      </Container>
      <Container.Grid className="flex-1 grid-cols-1 items-start gap-x-[1.125rem] gap-y-10 pt-10 s-tablet:grid-cols-2 laptop:grid-cols-3">
        {house.length > 0 ? (
          house.map(({ house: houseData }) => (
            <HouseCard key={houseData.id} {...houseData} />
          ))
        ) : (
          <Typography.Span1 className="text-brown">
            북마크 된 하우스가 없습니다.
          </Typography.Span1>
        )}
      </Container.Grid>
    </Container.FlexCol>
  );
}

export default MyBookmarkHouseTemplate;
