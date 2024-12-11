import { useRecoilState } from 'recoil';

import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/profile-setup/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';
import IconButton from '@/components/molecules/IconButton';
import { SignupProfileStateSelector } from '@/stores/sign.store';
import { SignUpProfileFormType } from '@/types/signUp.type';
import FormItem from '@/components/molecules/FormItem';
import {
  houseTypeDisplayData,
  rentalTypeDisplayData,
} from '@/constants/signUpProfileData';

export default function SignUpProfile1_1Template() {
  const [houseType, setHouseType] = useRecoilState(
    SignupProfileStateSelector('type'),
  );
  const [rentalType, setRentalType] = useRecoilState(
    SignupProfileStateSelector('rental_type'),
  );

  const onClickHouseType = (stateValue: SignUpProfileFormType['type']) =>
    setHouseType(stateValue);
  const onClickRentalType = (
    stateValue: SignUpProfileFormType['rental_type'],
  ) => setRentalType(stateValue);

  return (
    <Container.FlexCol className="min-w-full p-2">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate step="1-1" title="내가 찾는 집은..." />
        <Typography.SubTitle1 className="text-brown">
          집 유형
        </Typography.SubTitle1>
        <Container.Grid className="mb-[3.75rem] mt-7 grid-cols-2 gap-6 screen640:grid-cols-4">
          {houseTypeDisplayData.map(
            ({ displayValue, stateValue, iconType }) => (
              <IconButton.Outline
                key={displayValue}
                className="gap-y-5 rounded-lg py-5"
                isActive={stateValue === houseType}
                iconType={iconType}
                direction="top"
                onClick={() => onClickHouseType(stateValue)}
              >
                <Typography.P2 className="text-brown">
                  {displayValue}
                </Typography.P2>
              </IconButton.Outline>
            ),
          )}
          <FormItem.Hidden<Pick<SignUpProfileFormType, 'type'>>
            name="type"
            valueProp={houseType}
          />
        </Container.Grid>
        <Typography.SubTitle1 className="text-brown">
          임대 형태
        </Typography.SubTitle1>
        <Container.Grid className="mt-7 grid-cols-2 gap-6 screen640:grid-cols-4">
          {rentalTypeDisplayData.map(
            ({ displayValue, stateValue, iconType }) => (
              <IconButton.Outline
                key={displayValue}
                className="gap-y-5 rounded-lg py-5"
                isActive={stateValue === rentalType}
                iconType={iconType}
                direction="top"
                onClick={() => onClickRentalType(stateValue)}
              >
                <Typography.P2 className="text-brown">
                  {displayValue}
                </Typography.P2>
              </IconButton.Outline>
            ),
          )}
          <FormItem.Hidden<Pick<SignUpProfileFormType, 'rental_type'>>
            name="rental_type"
            valueProp={rentalType}
          />
        </Container.Grid>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
