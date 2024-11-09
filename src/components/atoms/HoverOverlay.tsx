import Container from '@/components/atoms/Container';
import cn from '@/libs/cn';

type HoverOverlayProps = {
  className?: string;
};

export default function HoverOverlay({ className }: HoverOverlayProps) {
  return (
    <Container
      className={cn(
        'absolute inset-0 size-full rounded-xl group-hover:bg-black/10',
        className,
      )}
    />
  );
}

HoverOverlay.defaultProps = {
  className: '',
};
