import { useNavigate } from 'react-router-dom';

import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import characterUnknown from '@/assets/images/character-unknown-error.png';
import cn from '@/libs/cn';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import { routePaths } from '@/constants/route';

type UnknownErrorProps = {
  className?: string;
  imageStyle?: string;
};

export default function UnknownError({
  className,
  imageStyle,
}: UnknownErrorProps) {
  const navigate = useNavigate();

  return (
    <Container.FlexRow className="size-full items-center justify-center">
      <Container.FlexCol
        className={cn(
          'w-full gap-[3rem] max-w-[30rem] items-center',
          'laptop:flex-row laptop:max-w-full laptop:px-[6.75rem] laptop:justify-center',
          className,
        )}
      >
        <Img
          src={characterUnknown}
          className={cn(
            'flex justify-center',
            'tablet:max-w-[22.625rem] monitor:max-w-[26.5rem]',
            imageStyle,
          )}
          imageStyle="w-full object-fill "
          alt="404 error image"
        />
        <Container.FlexCol className="items-center laptop:max-w-[27.5rem] laptop:flex-1 laptop:justify-center">
          <Container.FlexCol className="mb-[1.54rem] text-center text-brown">
            <Typography.Head1
              lang="en"
              className="text-[2rem] font-normal uppercase leading-[140%]"
            >
              ERROR
            </Typography.Head1>
            <Typography.SubTitle1 className="text-[1.34rem] font-semibold leading-[140%]">
              일시적인 오류가 발생했습니다.
            </Typography.SubTitle1>
          </Container.FlexCol>
          <Container.FlexCol className="mb-[2.2rem] text-center text-brown">
            <Typography.P1 className="text-[1.2rem] leading-[160%] laptop:text-[1rem]">
              서비스 이용에 불편을 드려 죄송합니다.
            </Typography.P1>
            <Typography.P1 className="text-[1.2rem] leading-[160%] laptop:text-[1rem]">
              잠시 후 다시 이용해 주시기 바랍니다.
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

UnknownError.defaultProps = {
  className: '',
  imageStyle: '',
};
