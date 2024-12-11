import { useNavigate } from 'react-router-dom';
import { routePaths } from '@/constants/route';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import IconButton from '@/components/molecules/IconButton';
import Link from '@/components/atoms/Link';
import Icon from '@/components/atoms/Icon';

type SignUpProfileIntroTemplateProps = {
  name: string;
};

export default function SignUpProfileIntroTemplate(
  props: Readonly<SignUpProfileIntroTemplateProps>,
) {
  const { name } = props;
  const navigate = useNavigate();
  const onClickProfile = () => {
    navigate(routePaths.signUpProfile);
  };

  return (
    <Container.FlexCol className="size-full items-center justify-center gap-y-[3.75rem]">
      <Container.FlexCol className="items-center gap-y-[4.75rem]">
        <Container.FlexCol>
          <Container.FlexCol className="items-center gap-y-7">
            <Typography.Head2 className="text-brown">{`${name}님, 반가워요!`}</Typography.Head2>
            <Typography.P1 className="text-brown">
              다음 항목들을 선택하면 딱 맞는 정보를 추천해드릴게요.
            </Typography.P1>
          </Container.FlexCol>
        </Container.FlexCol>
        <Container.FlexCol className="items-center gap-y-8">
          <IconButton.Fill
            className="mx-auto gap-x-2 rounded-full px-[1.875rem] py-[0.9375rem]"
            iconType="right-arrow"
            stroke="bg"
            onClick={onClickProfile}
            iconClassName="w-[1.125rem] h-[1rem]"
          >
            <Typography.P1 className="text-bg">다음</Typography.P1>
          </IconButton.Fill>
          <Link className="text-brown1 hover:underline" to={routePaths.root}>
            <Typography.P1>다음에 할게요</Typography.P1>
          </Link>
        </Container.FlexCol>
      </Container.FlexCol>
      <Icon type="welcome" />
    </Container.FlexCol>
  );
}
