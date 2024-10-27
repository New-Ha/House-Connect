import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DevTool } from '@hookform/devtools';

import useModal from '@/hooks/useModal';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import IconButton from '@/components/molecules/IconButton';
import Button from '@/components/atoms/Button';
import BadgeButton from '@/components/molecules/BadgeButton';
import DistrictSelector from '@/components/organisms/districtSelector/DistrictSelector';
import LabelDualInputRange from '@/components/organisms/LabelDualInputRange';
import Icon from '@/components/atoms/Icon';
import FormItem from '@/components/molecules/FormItem';
import ModalBackdrop from '@/components/organisms/modals/ModalBackdrop';
import { HouseListFilterModalAtom } from '@/stores/globalModal.store';
import {
  genderDisplayData,
  houseTypeDisplayData,
  mateNumberDisplayData,
  rentalTypeDisplayData,
} from '@/constants/signUpProfileData';
import {
  MoleculeSelectorState,
  SelectorStateType,
} from '@/components/organisms/districtSelector/selector.store';
import { SelectorItemValueType } from '@/types/regionDistrict.type';
import { createToast } from '@/libs/toast';
import { genderInfo } from '@/constants/profileDetailInfo';
import { HouseListFilterForm, HouseListFilterType } from '@/types/house.type';
import { InputRangeState } from '@/components/molecules/DualInputRange';
import HouseListFilterAtomState, {
  initialHouseListFilterState,
} from '@/stores/house.store';

function HouseListFilterModal() {
  const [houseListFilterState, setHouseListFilterState] = useRecoilState(
    HouseListFilterAtomState,
  );
  const { isOpen } = useRecoilValue(HouseListFilterModalAtom);
  const { closeModal } = useModal('HouseListFilter');

  const form = useForm<HouseListFilterType>({
    resolver: zodResolver(HouseListFilterForm),
    defaultValues: houseListFilterState,
  });

  const [term, setTerm] = useState<InputRangeState>([0, 24]);
  const [depositPrice, setDepositPrice] = useState<[number, number]>([
    0, 10000,
  ]);
  const [monthlyPrice, setMonthlyPrice] = useState<[number, number]>([0, 500]);

  const setDistrictState = useSetRecoilState<SelectorStateType<'시, 구'>>(
    MoleculeSelectorState('시, 구'),
  );
  const setRegion = useSetRecoilState<SelectorStateType<'지역'>>(
    MoleculeSelectorState('지역'),
  );
  const onClickSelectFinish = (
    region: SelectorItemValueType<'지역'>,
    district: SelectorItemValueType<'시, 구'>,
  ) => {
    const prevRegions = form.watch('regions');

    if (prevRegions?.includes(`${region} ${district}`)) {
      createToast('duplicatedRegion', '중복된 지역을 선택하셨습니다.', {
        type: 'error',
        isLoading: false,
        autoClose: 1000,
      });
    } else if (prevRegions && prevRegions.length >= 3) {
      createToast('maxRegionLimit', '최대 3개의 지역까지 선택 가능합니다.', {
        type: 'warning',
        isLoading: false,
        autoClose: 1000,
      });
    } else {
      form.setValue(
        'regions',
        prevRegions
          ? [...prevRegions, `${region} ${district}`]
          : [`${region} ${district}`],
      );
    }

    setRegion({ value: '지역', isOpen: false });
    setDistrictState({ value: '시, 구', isOpen: false });
  };

  const onClickDeleteRegionBadge = (
    value: `${SelectorItemValueType<'지역'>} ${SelectorItemValueType<'시, 구'>}`,
  ) => {
    const prevRegions = form.getValues('regions');
    form.setValue(
      'regions',
      prevRegions?.length !== 1
        ? prevRegions?.filter(location => location !== value)
        : undefined,
    );
  };

  const onClickResetFilter = () => {
    setHouseListFilterState(initialHouseListFilterState);
    form.reset();
  };

  const onSubmitUpdateHouseList = (formData: HouseListFilterType) => {
    setHouseListFilterState(prev => ({
      ...prev,
      ...formData,
    }));
    closeModal();
  };

  useEffect(() => {
    form.reset(houseListFilterState);
  }, [isOpen, houseListFilterState]);

  return isOpen ? (
    <>
      <ModalBackdrop modalType="HouseListFilter">
        <Container.FlexCol className="size-full max-h-[80%] w-[42.25rem] overflow-y-auto rounded-xl bg-bg text-brown scrollbar-hide">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmitUpdateHouseList)}>
              <Container.FlexRow className="sticky items-center justify-between border-b-[0.5px] border-brown px-8 py-6">
                <Typography.SubTitle1>필터</Typography.SubTitle1>
                <IconButton.Ghost
                  iconType="close"
                  iconClassName="size-5"
                  className="size-5 items-center justify-center"
                  onClick={() => {
                    closeModal();
                  }}
                />
              </Container.FlexRow>

              <Container.FlexCol className="overflow-y-scroll px-8 py-6">
                <Container.FlexCol className="border-b-[0.5px] border-brown pb-8">
                  <Typography.SubTitle2 className="mb-7">
                    집 유형
                  </Typography.SubTitle2>
                  <Container.FlexCol className="gap-6">
                    <Container.FlexRow className="flex-wrap gap-2">
                      {houseTypeDisplayData.map(
                        ({ displayValue, stateValue }) => (
                          <BadgeButton.Outline
                            key={displayValue}
                            className="rounded-full px-5 pb-[0.5625rem] pt-[0.625rem]"
                            onClick={() =>
                              form.setValue(
                                'house_type',
                                stateValue === form.watch('house_type')
                                  ? undefined
                                  : stateValue,
                              )
                            }
                            badgeActive={
                              stateValue === form.watch('house_type')
                            }
                          >
                            <Typography.P2>{displayValue}</Typography.P2>
                          </BadgeButton.Outline>
                        ),
                      )}
                    </Container.FlexRow>
                    <Container.FlexRow className="flex-wrap gap-2">
                      {rentalTypeDisplayData.map(
                        ({ displayValue, stateValue }) => (
                          <BadgeButton.Outline
                            key={displayValue}
                            className="rounded-full px-5 pb-[0.5625rem] pt-[0.625rem]"
                            onClick={() =>
                              form.setValue(
                                'rental_type',
                                stateValue === form.watch('rental_type')
                                  ? undefined
                                  : stateValue,
                              )
                            }
                            badgeActive={
                              stateValue === form.watch('rental_type')
                            }
                          >
                            <Typography.P2>{displayValue}</Typography.P2>
                          </BadgeButton.Outline>
                        ),
                      )}
                    </Container.FlexRow>
                  </Container.FlexCol>
                </Container.FlexCol>

                <Container.FlexCol className="border-b-[0.5px] border-brown py-8">
                  <Typography.SubTitle2 className="mb-7">
                    위치
                  </Typography.SubTitle2>
                  <Container.FlexRow className="flex-wrap gap-2 pb-6">
                    {form.watch().regions?.map(location => (
                      <BadgeButton.Fill
                        key={location}
                        className="gap-[1.25rem] rounded-full px-5 pb-[0.5625rem] pt-[0.625rem] text-bg"
                        iconType="close"
                        stroke="bg"
                        onClick={() => onClickDeleteRegionBadge(location)}
                      >
                        <Typography.P2>{location}</Typography.P2>
                      </BadgeButton.Fill>
                    ))}
                  </Container.FlexRow>
                  <DistrictSelector onSelectRegion={onClickSelectFinish} />
                </Container.FlexCol>

                <Container.FlexCol className="border-b-[0.5px] border-brown py-8">
                  <Typography.SubTitle2 className="mb-7">
                    기간
                  </Typography.SubTitle2>
                  <LabelDualInputRange
                    className="w-full"
                    min={0}
                    max={24}
                    step={1}
                    setRangeValue={
                      setTerm as Dispatch<SetStateAction<InputRangeState>>
                    }
                    rangeValue={term}
                    labelContainerStyle="mb-5 [&>h5]:text-SubTitle3"
                    category="term"
                  />
                  <FormItem.Hidden<Pick<HouseListFilterType, 'term'>>
                    name="term"
                    valueProp={term}
                  />
                </Container.FlexCol>

                <Container.FlexCol className="border-b-[0.5px] border-brown py-8">
                  <Typography.SubTitle2 className="mb-7">
                    가격대
                  </Typography.SubTitle2>
                  <Container.FlexCol className="flex-wrap gap-[3.25rem]">
                    <LabelDualInputRange
                      label="보증금"
                      className="w-full"
                      min={0}
                      max={10000}
                      step={100}
                      setRangeValue={setDepositPrice}
                      rangeValue={depositPrice}
                      category="price"
                      labelContainerStyle="mb-5 [&>h5]:text-SubTitle3"
                    />
                    <FormItem.Hidden<Pick<HouseListFilterType, 'deposit_price'>>
                      name="deposit_price"
                      valueProp={depositPrice}
                    />
                    <LabelDualInputRange
                      label="월세"
                      className="w-full"
                      min={0}
                      max={500}
                      step={10}
                      setRangeValue={setMonthlyPrice}
                      rangeValue={monthlyPrice}
                      category="price"
                      labelContainerStyle="mb-5 [&>h5]:text-SubTitle3"
                    />
                    <FormItem.Hidden<
                      Pick<HouseListFilterType, 'monthly_rental_price'>
                    >
                      name="monthly_rental_price"
                      valueProp={monthlyPrice}
                    />
                  </Container.FlexCol>
                </Container.FlexCol>

                <Container.FlexCol className="border-b-[0.5px] border-brown py-8">
                  <Typography.SubTitle2 className="mb-7">
                    인원
                  </Typography.SubTitle2>
                  <Container.FlexRow className="flex-wrap gap-2">
                    {mateNumberDisplayData.map(
                      ({ displayValue, stateValue }) => (
                        <BadgeButton.Outline
                          key={displayValue}
                          className="rounded-full px-5 pb-[0.5625rem] pt-[0.625rem]"
                          onClick={() =>
                            form.setValue(
                              'mate_number',
                              stateValue === form.watch('mate_number')
                                ? undefined
                                : stateValue,
                            )
                          }
                          badgeActive={stateValue === form.watch('mate_number')}
                        >
                          <Typography.P2>{displayValue}</Typography.P2>
                        </BadgeButton.Outline>
                      ),
                    )}
                  </Container.FlexRow>
                </Container.FlexCol>

                <Container.FlexCol className="pt-8">
                  <Typography.SubTitle2 className="mb-7">
                    성별
                  </Typography.SubTitle2>
                  <Container.FlexRow className="flex-wrap gap-2">
                    {genderDisplayData.map(({ displayValue, stateValue }) => (
                      <BadgeButton.Outline
                        key={displayValue}
                        className="rounded-full px-4"
                        onClick={() =>
                          form.setValue(
                            'mate_gender',
                            stateValue === form.watch('mate_gender')
                              ? undefined
                              : stateValue,
                          )
                        }
                        badgeActive={stateValue === form.watch('mate_gender')}
                      >
                        <Icon
                          type={genderInfo[stateValue as 0 | 1 | 2].icon}
                          className="my-2 mr-2 size-6"
                        />
                        <Typography.P2>{displayValue}</Typography.P2>
                      </BadgeButton.Outline>
                    ))}
                  </Container.FlexRow>
                </Container.FlexCol>
              </Container.FlexCol>
              <Container.FlexRow className="sticky bottom-0 z-50 gap-4 rounded-xl rounded-t-none bg-bg p-6">
                <IconButton.Outline
                  iconType="reset"
                  direction="left"
                  iconClassName="mr-3"
                  className="text-nowrap rounded-lg px-[1.5rem] py-[1.125rem]"
                  onClick={onClickResetFilter}
                >
                  <Typography.SubTitle3 className="whitespace-nowrap pt-1">
                    초기화
                  </Typography.SubTitle3>
                </IconButton.Outline>
                <Button.Fill
                  type="submit"
                  className="w-full items-center justify-center rounded-lg px-9 py-[1.125rem] text-white"
                >
                  <Typography.SubTitle3>필터 적용</Typography.SubTitle3>
                </Button.Fill>
              </Container.FlexRow>
            </form>
          </FormProvider>
        </Container.FlexCol>
      </ModalBackdrop>
      <DevTool control={form.control} />
    </>
  ) : null;
}
export default HouseListFilterModal;
