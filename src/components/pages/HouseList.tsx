import { useRecoilState } from 'recoil';

import HouseListTemplate from '@/components/templates/House/HouseList/HouseList.template';
import { useInfiniteHouseList } from '@/hooks/useHouse';
import HouseListFilterAtomState from '@/stores/house.store';

export default function HouseList() {
  const [filterState] = useRecoilState(HouseListFilterAtomState);
  const infiniteHouseListResult = useInfiniteHouseList(filterState);

  return (
    <HouseListTemplate
      houseList={
        infiniteHouseListResult.data?.pages.flatMap(page => page.data) || []
      }
      {...infiniteHouseListResult}
    />
  );
}
