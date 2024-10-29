import { useNavigate } from 'react-router-dom';

import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import character404 from '@/assets/images/character-404.png';
import cn from '@/libs/cn';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import { routePaths } from '@/constants/route';

type Error404Props = {
  className?: string;
  imageStyle?: string;
};

export default function Error404({ className, imageStyle }: Error404Props) {
  const navigate = useNavigate();

  return (
    <Container.FlexRow className="size-full items-center justify-center">
      <Container.FlexCol
        className={cn('w-full gap-[3rem] max-w-[30rem]', className)}
      >
        <Img
          src={character404}
          className={cn('flex justify-center', imageStyle)}
          imageStyle="w-full object-fill "
          alt="404 error image"
        />
        <Container.FlexCol className="items-center">
          <Container.FlexCol className="mb-[1.54rem] text-center text-brown">
            <Typography.Head1
              lang="en"
              className="text-[2rem] font-normal uppercase leading-[140%]"
            >
              404 ERROR
            </Typography.Head1>
            <Typography.SubTitle1 className="text-[1.34rem] font-semibold leading-[140%]">
              원하시는 페이지를 찾을 수 없습니다.
            </Typography.SubTitle1>
          </Container.FlexCol>
          <Container.FlexCol className="mb-[2.2rem] text-center text-brown">
            <Typography.P1 className="text-[1.2rem] leading-[160%]">
              존재하지 않는 주소를 입력하셨거나,
            </Typography.P1>
            <Typography.P1 className="text-[1.2rem] leading-[160%]">
              요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.{' '}
            </Typography.P1>
          </Container.FlexCol>
          <Button.Fill
            className="h-[3.7rem] w-[9.23rem] justify-center rounded-full text-white"
            onClick={() => navigate(routePaths.root)}
          >
            홈으로
          </Button.Fill>
        </Container.FlexCol>
      </Container.FlexCol>
    </Container.FlexRow>
  );
}

Error404.defaultProps = {
  className: '',
  imageStyle: '',
};
