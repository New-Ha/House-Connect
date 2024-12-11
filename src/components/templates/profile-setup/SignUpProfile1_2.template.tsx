import { useRecoilState, useSetRecoilState } from 'recoil';
import { useFormContext } from 'react-hook-form';

import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/profile-setup/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';
import BadgeButton from '@/components/molecules/BadgeButton';
import { SignupProfileStateSelector } from '@/stores/sign.store';
import LabelDualInputRange from '@/components/organisms/LabelDualInputRange';
import DistrictSelector from '@/components/organisms/districtSelector/DistrictSelector';
import { SelectorItemValueType } from '@/types/regionDistrict.type';
import FormItem from '@/components/molecules/FormItem';
import { SignUpProfileFormType } from '@/types/signUp.type';
import {
  MoleculeSelectorState,
  SelectorStateType,
} from '@/components/organisms/districtSelector/selector.store';
import { createToast } from '@/libs/toast';

export default function SignUpProfile1_2Template() {
  const { trigger } = useFormContext<SignUpProfileFormType>();
  const setDistrictState = useSetRecoilState<SelectorStateType<'시, 구'>>(
    MoleculeSelectorState('시, 구'),
  );

  const [regions, setRegions] = useRecoilState(
    SignupProfileStateSelector('regions'),
  );
  const [term, setTerm] = useRecoilState(SignupProfileStateSelector('term'));

  const onClickSelectFinish = (
    region: SelectorItemValueType<'지역'>,
    district: SelectorItemValueType<'시, 구'>,
  ) => {
    setRegions(prev => {
      if (prev.includes(`${region} ${district}`)) {
        createToast('duplicatedRegion', '중복된 지역을 선택하셨습니다.', {
          type: 'error',
          isLoading: false,
          containerId: 'signUpProfileToastContainer',
          autoClose: 1000,
        });
        return prev;
      }

      if (prev.length >= 3) {
        createToast('maxRegionLimit', '최대 3개의 지역까지 선택 가능합니다.', {
          type: 'warning',
          isLoading: false,
          containerId: 'signUpProfileToastContainer',
          autoClose: 1000,
        });
        return prev;
      }

      return [...prev, `${region} ${district}`];
    });

    setDistrictState({ value: '시, 구', isOpen: false });
    trigger('regions');
  };

  const onClickDeleteRegionBadge = (
    value: `${SelectorItemValueType<'지역'>} ${SelectorItemValueType<'시, 구'>}`,
  ) => setRegions(prev => prev.filter(location => location !== value));

  return (
    <Container.FlexCol className="min-w-full p-2">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate step="1-2" title="내가 찾는 집은..." />
        <Typography.SubTitle1 className="text-brown">위치</Typography.SubTitle1>
        <Container.FlexCol className="mb-[3.75rem] gap-y-4">
          <Container.FlexRow className="mt-7 flex-wrap gap-2">
            {regions?.map(location => (
              <BadgeButton.Fill
                key={location}
                className="gap-x-3 rounded-[1.875rem] px-4 py-[0.75rem] text-bg tablet:gap-x-3 [&_p]:translate-y-[-0.0625rem]"
                iconType="close"
                stroke="bg"
                onClick={() => onClickDeleteRegionBadge(location)}
              >
                <Typography.P2>{location}</Typography.P2>
              </BadgeButton.Fill>
            ))}
          </Container.FlexRow>
          <DistrictSelector onSelectRegion={onClickSelectFinish} />
          <FormItem.Hidden<Pick<SignUpProfileFormType, 'regions'>>
            name="regions"
            valueProp={regions}
          />
        </Container.FlexCol>
        <Container.FlexCol>
          <Typography.SubTitle1 className="mb-7 text-brown">
            기간
          </Typography.SubTitle1>
          <LabelDualInputRange
            className="max-w-[30rem]"
            min={0}
            max={24}
            step={1}
            setRangeValue={setTerm}
            labelContainerStyle="mb-6"
            rangeValue={term}
            category="term"
          />
          <FormItem.Hidden<Pick<SignUpProfileFormType, 'term'>>
            name="term"
            valueProp={term}
          />
        </Container.FlexCol>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
