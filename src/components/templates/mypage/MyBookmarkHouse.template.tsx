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
  house: HouseBookmarkType[] | undefined;
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
    <div>
      <Container className="relative">
        <Icon className="absolute inset-y-4 left-4" type="search" />
        <Input
          className="placholder:text-brown2 mt-10 w-full border-none !bg-brown4 pl-14"
          placeholder="위치 검색"
          onKeyDown={onEnterSearchFilter}
        />
      </Container>
      <Container.Grid className="grid-cols-[320px_320px_320px] gap-x-[1.125rem] gap-y-10 pt-10">
        {house?.length && house[0].house ? (
          house.map(({ house: houseData }) => (
            <HouseCard key={houseData.id} {...houseData} />
          ))
        ) : (
          <Typography.Span1 className="text-brown">
            북마크 된 하우스가 없습니다.
          </Typography.Span1>
        )}
      </Container.Grid>
    </div>
  );
}

export default MyBookmarkHouseTemplate;
