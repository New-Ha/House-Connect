import { HouseFormType } from '@/types/house.type';
import { IconType } from '@/types/icon.type';
import { SignUpProfileFormType } from '@/types/signUp.type';

export const floorDisplayData: {
  displayValue: string;
  stateValue: HouseFormType['floor'];
}[] = [
  {
    displayValue: '지하',
    stateValue: 0,
  },
  {
    displayValue: '반지하',
    stateValue: 1,
  },
  {
    displayValue: '지층',
    stateValue: 2,
  },
];

export const matesGenderDisplayData: {
  displayValue: string;
  stateValue: SignUpProfileFormType['mate_gender'];
  iconType: IconType;
}[] = [
  {
    displayValue: '남성',
    stateValue: 1,
    iconType: 'icon-male',
  },
  {
    displayValue: '여성',
    stateValue: 2,
    iconType: 'icon-female',
  },
  {
    displayValue: '성별 상관없어요',
    stateValue: 0,
    iconType: 'icon-gender-free',
  },
];

export const registPetDisplayData: {
  displayValue: string;
  stateValue: SignUpProfileFormType['pet'];
  iconType: IconType;
}[] = [
  {
    displayValue: '반려동물 키워요',
    stateValue: 1,
    iconType: 'pet-hart',
  },
  {
    displayValue: '반려동물 NO',
    stateValue: 2,
    iconType: 'pet-hate',
  },
  {
    displayValue: '반려동물 상관없어요',
    stateValue: 0,
    iconType: 'pet-circle',
  },
];

export const rentalTypeDisplay = {
  0: '상관없음',
  1: '월세',
  2: '반전세',
  3: '전세',
};
