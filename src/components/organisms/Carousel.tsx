import { ReactNode, useEffect, useRef } from 'react';

import Container from '@/components/atoms/Container';
import cn from '@/libs/cn';

type CarouselProps = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  children: ReactNode;
  order: number;
};
export default function Carousel(props: CarouselProps) {
  const { className, children, order } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const carouselChildrenList = containerRef.current?.querySelectorAll('*');
    carouselChildrenList?.forEach(element =>
      element.setAttribute('tabindex', '-1'),
    );
  }, [containerRef]);

  const translateX = `-translate-x-[${order * 100}%]`;

  return (
    <Container.FlexRow
      className={cn('w-full overflow-hidden overflow-y-scroll', className)}
    >
      <Container.FlexRow
        className={cn('w-full transition', translateX)}
        ref={containerRef}
      >
        {children}
      </Container.FlexRow>
    </Container.FlexRow>
  );
}
