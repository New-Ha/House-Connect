/* eslint-disable react/function-component-definition */
import {
  ComponentProps,
  FC,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react';

import cn from '@/libs/cn';

type ContainerProps = ComponentProps<'div'>;

export default function Container({
  children,
  className = '',
  ...others
}: ContainerProps) {
  return (
    <div className={cn(className)} {...others}>
      {children}
    </div>
  );
}

const GridContainer: FC<ContainerProps> = ({
  children,
  className = '',
  ...others
}) => (
  <div className={cn('grid', className)} {...others}>
    {children}
  </div>
);

const FlexRowContainer: ForwardRefRenderFunction<
  HTMLDivElement,
  ContainerProps
> = ({ children, className = '', ...others }, ref) => (
  <div ref={ref} className={cn('flex', className)} {...others}>
    {children}
  </div>
);

const FlexColumnContainer: ForwardRefRenderFunction<
  HTMLDivElement,
  ContainerProps
> = ({ children, className = '', ...others }, ref) => (
  <div ref={ref} className={cn('flex flex-col', className)} {...others}>
    {children}
  </div>
);

Container.FlexRow = forwardRef(FlexRowContainer);
Container.FlexCol = forwardRef(FlexColumnContainer);
Container.Grid = GridContainer;
