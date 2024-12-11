import React, { ComponentProps, ReactNode } from 'react';

import cn from '@/libs/cn';

export type ButtonProps = ComponentProps<'button'> & { isActive?: boolean };
export type ButtonType = 'Fill' | 'Outline' | 'Ghost';

type ButtonComponentProps = {
  [key in ButtonType]: (props: ButtonProps) => ReactNode;
};
const buttonType: { type: ButtonType; defaultClassName: string }[] = [
  {
    type: 'Fill',
    defaultClassName:
      'group flex items-center bg-brown hover:bg-brown1 hover:shadow-[0_4px_4px_0] hover:shadow-brown/25 active:bg-active-fill active:shadow-none focus:bg-brown focus:outline-subColor1 focus:shadow-[0_4px_4px_0] focus:outline focus:outline-[3px] focus:shadow-brown/25',
  },
  {
    type: 'Outline',
    defaultClassName:
      'group flex bg-bg items-center border-brown border hover:bg-hover-outline hover:shadow-[0_4px_4px_0] hover:shadow-brown/25 active:bg-active-outline active:shadow-none focus:outline-[3px] focus:outline focus:border-transparent focus:outline-subColor1 focus:shadow-[0_4px_4px_0] focus:shadow-brown/25',
  },
  {
    type: 'Ghost',
    defaultClassName: 'group items-center flex bg-transparent',
  },
];

const Button = {} as ButtonComponentProps;

buttonType.forEach(({ type, defaultClassName }) => {
  Button[type] = ({
    children,
    className,
    isActive = false,
    ...others
  }: ButtonProps) =>
    React.createElement(
      'button',
      {
        className: cn(
          defaultClassName,
          isActive &&
          'border-transparent bg-brown4 outline outline-[3px] outline-point',
          className,
        ),
        type: 'button',
        ...others,
      },
      children,
    );
});

export default Button;
