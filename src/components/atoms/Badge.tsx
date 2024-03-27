import React from 'react';

import cn from '@/libs/cn.ts';

export type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
};

type BadgeType = 'Fill' | 'Outline';

type BadgeComponentProps = {
  [key in BadgeType]: (props: BadgeProps) => React.ReactNode;
};
const badgeType: { type: BadgeType; defaultClassName: string }[] = [
  {
    type: 'Fill',
    defaultClassName:
      'flex group items-center rounded-xl bg-brown hover:bg-bg hover:outline hover:outline-brown',
  },
  {
    type: 'Outline',
    defaultClassName:
      'flex group items-center rounded-xl bg-bg outline outline-brown hover:outline-none hover:bg-brown',
  },
];
const Badge = {} as BadgeComponentProps;
badgeType.forEach(({ type, defaultClassName }) => {
  Badge[type] = ({ children, className, ...others }: BadgeProps) =>
    React.createElement(
      'div',
      {
        className: `${defaultClassName} ${cn(className)} `,
        ...others,
      },
      children,
    );
});

export default Badge;
