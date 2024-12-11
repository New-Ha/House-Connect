import { routePaths } from '@/constants/route';
import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Icon from '@/components/atoms/Icon';
import Link from '@/components/atoms/Link';
import Typography from '@/components/atoms/Typography';

export default function SignUpProfileOutroTemplate() {
  return (
    <Container.FlexCol className="relative top-[-7.25rem] size-full items-center justify-center gap-y-[4.25rem]">
      <Container.FlexCol className="items-center gap-y-[1.875rem]">
        <Container.FlexCol className="items-center gap-y-7">
          <Typography.Head2 className="text-brown">
            프로필 설정이 완료되었어요
          </Typography.Head2>
          <Typography.P1 className="text-brown">
            나만의 룸메이트를 찾으러 가볼까요?
          </Typography.P1>
        </Container.FlexCol>
      </Container.FlexCol>
      <Icon type="seeking-house" />
      <Container.FlexRow className="items-center justify-center gap-3">
        <Link to={routePaths.house}>
          <Button.Fill className="rounded-full px-11 py-4 text-bg">
            <Typography.P1>홈으로</Typography.P1>
          </Button.Fill>
        </Link>
      </Container.FlexRow>
    </Container.FlexCol>
  );
}
