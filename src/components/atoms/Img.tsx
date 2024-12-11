import { ComponentProps } from 'react';

import Container from '@/components/atoms/Container';
import cn from '@/libs/cn';
import HoverOverlay from '@/components/atoms/HoverOverlay';

type ImgProps = ComponentProps<'img'> & {
  imageStyle?: string;
  triggerHoverStyle?: boolean;
};

export default function Img({
  src,
  alt,
  className,
  imageStyle,
  triggerHoverStyle,
  ...others
}: ImgProps) {
  return (
    <Container.FlexRow
      className={cn(
        'w-full group relative rounded-xl overflow-hidden',
        className,
      )}
    >
      <img
        className={cn('w-full max-w-full object-cover', imageStyle)}
        src={src}
        alt={alt}
        {...others}
      />
      {triggerHoverStyle && <HoverOverlay />}
    </Container.FlexRow>
  );
}

Img.defaultProps = {
  imageStyle: '',
  triggerHoverStyle: false,
};
