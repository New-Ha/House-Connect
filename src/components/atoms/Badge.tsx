import React from 'react';

import cn from '@/libs/cn';

export type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  focus?: boolean;
  active?: boolean;
  hover?: boolean;
};

export type BadgeType = 'Fill' | 'Outline';

type BadgeComponentProps = {
  [key in BadgeType]: (props: BadgeProps) => React.ReactNode;
};
const badgeType: { type: BadgeType; defaultClassName: string }[] = [
  {
    type: 'Fill',
    defaultClassName:
      'group flex items-center text-bg bg-brown border border-brown ',
  },
  {
    type: 'Outline',
    defaultClassName:
      'group flex bg-bg items-center text-brown border-brown border ',
  },
];
const Badge = {} as BadgeComponentProps;
badgeType.forEach(({ type, defaultClassName }) => {
  Badge[type] = ({
    children,
    className,
    focus = true,
    active = true,
    hover = true,
    ...others
  }: BadgeProps) => {
    const focusClass = focus
      ? 'focus:text-bg focus:bg-brown focus:outline-subColor1 focus:shadow-[0_4px_4px_0] focus:outline focus:outline-[3px] focus:shadow-brown/25'
      : '';
    const activeClass = active
      ? 'active:bg-active-fill active:shadow-none'
      : '';
    const hoverClass =
      type === 'Fill'
        ? 'hover:bg-brown1 hover:shadow-[0_4px_4px_0] hover:shadow-brown/25'
        : 'hover:bg-hover-outline hover:shadow-[0_4px_4px_0] hover:shadow-brown/25';

    return React.createElement(
      'div',
      {
        className: `${defaultClassName} ${cn(className)} ${focusClass} ${activeClass} ${hover ? hoverClass : ''}`,
        ...others,
      },
      children,
    );
  };
});

export default Badge;
