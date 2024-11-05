import { useEffect } from 'react';

import loadingHouse from '@/assets/images/loading-house.gif';
import Img from '@/components/atoms/Img';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import cn from '@/libs/cn';

type LoadingType = {
  className?: string;
  delayTime?: number;
  setIsDelaying?: React.Dispatch<React.SetStateAction<boolean>>;
  callback?: () => void;
  text?: string;
  textStyle?: string;
};

export default function Loading({
  className,
  delayTime,
  setIsDelaying,
  text,
  textStyle,
  callback,
}: LoadingType) {
  useEffect(() => {
    let sleep: number | undefined;

    if (delayTime && setIsDelaying) {
      sleep = window.setTimeout(() => {
        setIsDelaying(false);
        if (callback) {
          callback();
        }
      }, delayTime);
    }

    return () => {
      if (sleep) clearTimeout(sleep);
    };
  }, [callback, delayTime, setIsDelaying]);

  return (
    <Container.FlexCol
      className={cn(
        'flex h-screen items-center justify-center gap-[4.25rem] bg-bg',
        className,
      )}
    >
      <Img
        src={loadingHouse}
        className="h-[18rem] w-[15.375rem]"
        alt="loading house gif"
      />
      <Typography.SubTitle1
        lang="en"
        className={cn('uppercase tracking-wide text-point', textStyle)}
      >
        {text}
      </Typography.SubTitle1>
    </Container.FlexCol>
  );
}

Loading.defaultProps = {
  className: '',
  delayTime: 0,
  setIsDelaying: false,
  text: 'Loading...',
  textStyle: '',
  callback: () => {},
};
