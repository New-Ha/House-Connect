/* eslint-disable react/require-default-props */
/* eslint-disable react/display-name */
import { ComponentProps, forwardRef, ReactNode } from 'react';

import cn from '@/libs/cn';

type ObserverTargetProps = ComponentProps<'div'> & {
  className?: string;
  children?: ReactNode;
};

const ObserverTarget = forwardRef<HTMLDivElement, ObserverTargetProps>(
  ({ children = null, className = '', ...others }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex h-12 w-full items-start justify-center text-white',
        className,
      )}
      {...others}
    >
      {children}
    </div>
  ),
);

export default ObserverTarget;
