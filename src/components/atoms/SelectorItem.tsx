import { ComponentProps } from 'react';

import cn from '@/libs/cn';
import Button from '@/components/atoms/Button';

type SelectorItemProps = ComponentProps<'li'>;

const selectorItemStyle =
  'last:border-b-0 flex w-full items-center justify-center border-b bg-bg border-brown text-brown hover:bg-brown3';

export default function SelectorItem({
  children,
  className = '',
  ...others
}: SelectorItemProps) {
  return (
    <li className={cn(selectorItemStyle, className)} {...others}>
      <Button.Ghost className="w-full cursor-pointer justify-center bg-transparent p-5">
        {children}
      </Button.Ghost>
    </li>
  );
}
