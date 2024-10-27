import { useRecoilState } from 'recoil';

import Container from '@/components/atoms/Container';
import Link from '@/components/atoms/Link';
import Typography from '@/components/atoms/Typography';
import IconButton from '@/components/molecules/IconButton';
import Icon from '@/components/atoms/Icon';
import useModal from '@/hooks/useModal';
import cn from '@/libs/cn';
import HouseListFilterAtomState from '@/stores/house.store';
import { HouseListFilterModalState } from '@/types/modal.type';
import { houseTypeDisplayData } from '@/constants/signUpProfileData';
import { HouseListFilterType } from '@/types/house.type';
import { generateUnitByPrice, generateUnitByTerm } from '@/libs/generateUnit';
import { genderInfo, mateNumInfo } from '@/constants/profileDetailInfo';
import { rentalTypeDisplay } from '@/constants/houseData';
import { routePaths } from '@/constants/route';

export default function HouseListFilter() {
  const filterBtnCommonStyle =
    'cursor-pointer items-center gap-3 rounded-full bg-white shadow-badge text-brown hover:ring hover:ring-point active:bg-point1 active:text-white';

  const { setModalState } = useModal('HouseListFilter');
  const HouseListFilterContext: HouseListFilterModalState = {
    isOpen: true,
    type: 'HouseListFilter',
  };

  const [houseListFilterState, setHouseListFilterState] =
    useRecoilState<HouseListFilterType>(HouseListFilterAtomState);

  const removeFilter = (key: string) => {
    setHouseListFilterState(prev => ({
      ...prev,
      [key]: undefined,
    }));
  };

  return (
    <Container.FlexRow className="mb-[3.75rem] justify-center">
      <Container.FlexCol className=" gap-5">
        <Container.FlexRow className="justify-center gap-4 ">
          <IconButton.Ghost
            iconType="filter"
            direction="left"
            className={cn(filterBtnCommonStyle, 'px-[1.6rem] py-[1rem]')}
            onClick={() => setModalState(HouseListFilterContext)}
          >
            <Typography.SpanMid2 className="text-[1rem]">
              필터
            </Typography.SpanMid2>
          </IconButton.Ghost>
          <Link to={routePaths.houseRegister}>
            <IconButton.Ghost
              iconType="add"
              direction="left"
              className={cn(filterBtnCommonStyle, 'px-[1.6rem] py-[1rem] ')}
            >
              <Typography.SpanMid2 className="text-[1rem]">
                하우스 등록
              </Typography.SpanMid2>
            </IconButton.Ghost>
          </Link>
        </Container.FlexRow>
        <Container.FlexRow className="flex-wrap justify-center gap-2 [&>button]:h-10 [&>button]:gap-x-4 [&>button]:rounded-full [&>button]:bg-white [&>button]:px-5">
          {houseListFilterState.house_type !== undefined && (
            <IconButton.Ghost
              iconType="close"
              onClick={() => removeFilter('house_type')}
            >
              <Typography.P3 className="text-brown">
                {
                  houseTypeDisplayData[houseListFilterState.house_type]
                    .displayValue
                }
              </Typography.P3>
            </IconButton.Ghost>
          )}
          {houseListFilterState.rental_type !== undefined && (
            <IconButton.Ghost
              iconType="close"
              onClick={() => removeFilter('rental_type')}
            >
              <Typography.P3 className="text-brown">
                {rentalTypeDisplay[houseListFilterState.rental_type]}
              </Typography.P3>
            </IconButton.Ghost>
          )}
          {houseListFilterState.regions &&
            houseListFilterState.regions.map(region => (
              <IconButton.Ghost
                key={region}
                iconType="close"
                onClick={() => removeFilter('regions')}
              >
                <Typography.P3 className="text-brown">{region}</Typography.P3>
              </IconButton.Ghost>
            ))}
          {houseListFilterState.term &&
            (houseListFilterState.term[0] !== 0 ||
              houseListFilterState.term[1] !== 25) && (
              <IconButton.Ghost
                iconType="close"
                onClick={() => removeFilter('term')}
              >
                <Typography.P3 className="text-brown">
                  {`${generateUnitByTerm(houseListFilterState.term[0], 25)} ~ ${generateUnitByTerm(houseListFilterState.term[1], 25)}`}
                </Typography.P3>
              </IconButton.Ghost>
            )}
          {houseListFilterState.deposit_price &&
            houseListFilterState.deposit_price[0] !== 0 &&
            houseListFilterState.deposit_price[1] !== 10100 &&
            (houseListFilterState.deposit_price[0] !== 0 ||
              houseListFilterState.deposit_price[1] !== 10100) && (
              <IconButton.Ghost
                iconType="close"
                onClick={() => removeFilter('deposit_price')}
              >
                <Typography.P3 className="text-brown">
                  {`보증금 ${generateUnitByPrice(
                    houseListFilterState.deposit_price[0],
                    10100,
                  )} ~ ${generateUnitByPrice(
                    houseListFilterState.deposit_price[1],
                    10100,
                  )}`}
                </Typography.P3>
              </IconButton.Ghost>
            )}
          {houseListFilterState.monthly_rental_price &&
            houseListFilterState.monthly_rental_price[0] !== 0 &&
            houseListFilterState.monthly_rental_price[1] !== 510 &&
            (houseListFilterState.monthly_rental_price[0] !== 0 ||
              houseListFilterState.monthly_rental_price[1] !== 510) && (
              <IconButton.Ghost
                iconType="close"
                onClick={() => removeFilter('monthly_rental_price')}
              >
                <Typography.P3 className="text-brown">
                  {`월세 ${generateUnitByPrice(houseListFilterState.monthly_rental_price[0], 510)} ~ ${generateUnitByPrice(houseListFilterState.monthly_rental_price[1], 510)}`}
                </Typography.P3>
              </IconButton.Ghost>
            )}
          {houseListFilterState.mate_number !== undefined &&
            houseListFilterState.mate_number !== 0 && (
              <IconButton.Ghost
                iconType="close"
                className="!gap-x-2"
                onClick={() => removeFilter('mate_number')}
              >
                <Typography.P3 className="pr-2 text-brown">
                  {mateNumInfo[houseListFilterState.mate_number].text}
                </Typography.P3>
              </IconButton.Ghost>
            )}
          {houseListFilterState.mate_gender !== undefined && (
            <IconButton.Ghost
              iconType="close"
              className="!gap-x-2"
              onClick={() => removeFilter('mate_gender')}
            >
              <Icon type={genderInfo[houseListFilterState.mate_gender].icon} />
              <Typography.P3 className="pr-2 text-brown">
                {genderInfo[houseListFilterState.mate_gender].text}
              </Typography.P3>
            </IconButton.Ghost>
          )}
        </Container.FlexRow>
      </Container.FlexCol>
    </Container.FlexRow>
  );
}
