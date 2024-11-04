import { useRecoilState } from 'recoil';

import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/profile-setup/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';
import { SignupProfileStateSelector } from '@/stores/sign.store';
import IconButton from '@/components/molecules/IconButton';
import { SignUpProfileFormType } from '@/types/signUp.type';
import FormItem from '@/components/molecules/FormItem';
import {
  petDisplayData,
  smokeDisplayData,
} from '@/constants/signUpProfileData';

export default function SignUpProfile2_1Template() {
  const [smoking, setSmoking] = useRecoilState(
    SignupProfileStateSelector('smoking'),
  );
  const [pet, setPet] = useRecoilState(SignupProfileStateSelector('pet'));

  const onClickSmokingType = (stateValue: SignUpProfileFormType['smoking']) =>
    setSmoking(stateValue);
  const onClickPetType = (stateValue: SignUpProfileFormType['pet']) =>
    setPet(stateValue);

  return (
    <Container.FlexCol className="min-w-full p-2">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate
          step="2-1"
          title="나의 라이프스타일은..."
        />
        <Typography.SubTitle1 className="text-brown">
          흡연 여부
        </Typography.SubTitle1>
        <Container.Grid className="mb-[3.75rem] mt-7 grid-cols-2 gap-6 screen640:grid-cols-4">
          {smokeDisplayData.map(({ displayValue, stateValue, iconType }) => (
            <IconButton.Outline
              key={displayValue}
              className="gap-y-5 rounded-lg py-5"
              isActive={stateValue === smoking}
              iconType={iconType}
              direction="top"
              onClick={() => onClickSmokingType(stateValue)}
            >
              <Typography.P2 className="text-brown">
                {displayValue}
              </Typography.P2>
            </IconButton.Outline>
          ))}
          <FormItem.Hidden<Pick<SignUpProfileFormType, 'smoking'>>
            name="smoking"
            valueProp={smoking}
          />
        </Container.Grid>
        <Typography.SubTitle1 className="text-brown">
          반려 동물
        </Typography.SubTitle1>
        <Container.Grid className="mt-7 grid-cols-2 gap-6 pb-2 screen640:grid-cols-4">
          {petDisplayData.map(({ displayValue, stateValue, iconType }) => (
            <IconButton.Outline
              key={displayValue}
              className="gap-y-5 rounded-lg py-5"
              isActive={stateValue === pet}
              iconType={iconType}
              direction="top"
              onClick={() => onClickPetType(stateValue)}
            >
              <Typography.P2 className="text-brown">
                {displayValue}
              </Typography.P2>
            </IconButton.Outline>
          ))}
          <FormItem.Hidden<Pick<SignUpProfileFormType, 'pet'>>
            name="pet"
            valueProp={pet}
          />
        </Container.Grid>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
