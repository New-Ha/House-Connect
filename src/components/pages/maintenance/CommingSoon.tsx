import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import characterCommingSoon from '@/assets/images/character-comming-soon.png';
import cn from '@/libs/cn';
import Typography from '@/components/atoms/Typography';

type CommingSoonProps = {
  className?: string;
  imageStyle?: string;
};

export default function CommingSoon({
  className,
  imageStyle,
}: CommingSoonProps) {
  return (
    <Container.FlexRow className="size-full items-center justify-center">
      <Container.FlexCol
        className={cn(
          'w-full gap-[3.5rem] max-w-[18.4rem]',
          'laptop:max-w-[20.25rem]',
          className,
        )}
      >
        <Img
          src={characterCommingSoon}
          className={cn('flex justify-center', imageStyle)}
          imageStyle="w-full object-fill "
          alt="comming soon service image"
        />
        <Container.FlexCol className="items-center">
          <Container.FlexCol className="mb-[1.54rem] text-center text-point">
            <Typography.Head1
              lang="en"
              className="text-[2rem] font-normal uppercase leading-[140%]"
            >
              COMMING SOON
            </Typography.Head1>
            <Typography.SubTitle1 className="text-[1.3rem] font-medium leading-[140%]">
              서비스 준비중입니다.
            </Typography.SubTitle1>
          </Container.FlexCol>
        </Container.FlexCol>
      </Container.FlexCol>
    </Container.FlexRow>
  );
}

CommingSoon.defaultProps = {
  className: '',
  imageStyle: '',
};
