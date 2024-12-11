import React, { ComponentProps, ReactNode } from 'react';

import cn from '@/libs/cn';
import TypoType from '@/types/typo.type';

type TypographyProps =
  | ComponentProps<'span'>
  | ComponentProps<'p'>
  | {
      children: React.ReactNode;
      className?: string;
    };

type TypographyComponentProps = {
  [key in TypoType]: (props: TypographyProps) => ReactNode;
};

const typoType: {
  type: TypoType;
  defaultClassName: string;
  component: string;
}[] = [
  { type: 'Head1', defaultClassName: 'text-Head1', component: 'h1' },
  { type: 'Head2', defaultClassName: '!text-Head2', component: 'h2' },
  { type: 'Head3', defaultClassName: 'text-Head3', component: 'h3' },

  { type: 'SubTitle1', defaultClassName: 'text-SubTitle1', component: 'h4' },
  { type: 'SubTitle2', defaultClassName: 'text-SubTitle2', component: 'h5' },
  { type: 'SubTitle3', defaultClassName: 'text-SubTitle3', component: 'h6' },

  { type: 'P1', defaultClassName: 'text-P1', component: 'p' },
  { type: 'P2', defaultClassName: 'text-P2', component: 'p' },
  { type: 'P3', defaultClassName: 'text-P3', component: 'p' },

  { type: 'Span1', defaultClassName: 'text-Span1', component: 'span' },
  { type: 'Span2', defaultClassName: 'text-Span2', component: 'span' },

  { type: 'SpanMid1', defaultClassName: 'text-SpanMid1', component: 'span' },
  { type: 'SpanMid2', defaultClassName: 'text-SpanMid2', component: 'span' },
];

const Typography = {} as TypographyComponentProps;
typoType.forEach(({ type, component, defaultClassName }) => {
  Typography[type] = ({ children, className, ...others }: TypographyProps) =>
    React.createElement(
      component,
      { className: `${defaultClassName} ${cn(className)}`, ...others },
      children,
    );
});

export default Typography;
