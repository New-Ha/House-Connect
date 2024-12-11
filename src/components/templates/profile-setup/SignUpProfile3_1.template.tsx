import { useRecoilState } from 'recoil';

import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/profile-setup/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';
import { SignupProfileStateSelector } from '@/stores/sign.store';
import { SignUpProfileFormType } from '@/types/signUp.type';
import IconButton from '@/components/molecules/IconButton';
import FormItem from '@/components/molecules/FormItem';
import {
  genderDisplayData,
  mateNumberDisplayData,
} from '@/constants/signUpProfileData';

export default function SignUpProfile3_1Template() {
  const [gender, setGender] = useRecoilState(
    SignupProfileStateSelector('mate_gender'),
  );
  const [matesNumber, setMatesNumber] = useRecoilState(
    SignupProfileStateSelector('mate_number'),
  );

  const onClickGenderType = (
    stateValue: SignUpProfileFormType['mate_gender'],
  ) => setGender(stateValue);

  const onClickMateNumberType = (
    stateValue: SignUpProfileFormType['mate_number'],
  ) => setMatesNumber(stateValue);

  return (
    <Container.FlexCol className="min-w-full p-2">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate
          step="3-1"
          title="내가 원하는 룸메이트는..."
        />
        <Typography.SubTitle1 className="text-brown">성별</Typography.SubTitle1>
        <Container.Grid className="mb-[3.75rem] mt-7 grid-cols-2 gap-6 screen640:grid-cols-4">
          {genderDisplayData.map(({ displayValue, stateValue, iconType }) => (
            <IconButton.Outline
              key={displayValue}
              className="gap-y-5 rounded-lg py-5"
              isActive={stateValue === gender}
              iconType={iconType}
              direction="top"
              onClick={() => onClickGenderType(stateValue)}
            >
              <Typography.P2 className="text-brown">
                {displayValue}
              </Typography.P2>
            </IconButton.Outline>
          ))}
          <FormItem.Hidden<Pick<SignUpProfileFormType, 'mate_gender'>>
            name="mate_gender"
            valueProp={gender}
          />
        </Container.Grid>
        <Typography.SubTitle1 className="text-brown">
          인원 수
        </Typography.SubTitle1>
        <Container.Grid className="mt-7 grid-cols-2 gap-6 screen640:grid-cols-4">
          {mateNumberDisplayData.map(
            ({ displayValue, stateValue, iconType }) => (
              <IconButton.Outline
                key={displayValue}
                className="gap-y-5 rounded-lg py-5"
                isActive={stateValue === matesNumber}
                iconType={iconType}
                direction="top"
                onClick={() => onClickMateNumberType(stateValue)}
              >
                <Typography.P2 className="text-brown">
                  {displayValue}
                </Typography.P2>
              </IconButton.Outline>
            ),
          )}
          {/* {mateNumberDisplayData.map(({ displayValue, stateValue }) => (
            <Button.Outline
              key={displayValue}
              className="gap-y-5 rounded-lg py-5"
              isActive={stateValue === matesNumber}
              onClick={() => onClickMateNumberType(stateValue)}
            >
              <Typography.P2 className="w-full text-brown">
                {displayValue}
              </Typography.P2>
            </Button.Outline>
          ))} */}
          <FormItem.Hidden<Pick<SignUpProfileFormType, 'mate_number'>>
            name="mate_number"
            valueProp={matesNumber}
          />
        </Container.Grid>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
