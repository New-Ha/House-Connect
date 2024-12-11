import { ComponentProps } from 'react';

import { CustomIconType, IconDirectionType, IconType } from '@/types/icon.type';
import BadgeButton from '@/components/molecules/BadgeButton';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import TypoType from '@/types/typo.type';

type TypoOmittedType = Exclude<
  TypoType,
  'Head1' | 'Head2' | 'Head3' | 'SubTitle1' | 'SubTitle2' | 'SubTitle3'
>;

type BadgesButtonsProps = CustomIconType &
  Omit<ComponentProps<'div'>, 'onClick'> & {
    contents: string[];
    badgeStyle?: string;
    badgeType?: 'Fill' | 'Outline';
    iconType?: IconType | undefined;
    direction?: IconDirectionType;
    iconStyle?: string;
    typoStyle?: string;
    typoType?: TypoOmittedType;
    onClick?: (badgeContent: string) => void;
  };

const BadgeType = {
  Fill: BadgeButton.Fill,
  Outline: BadgeButton.Outline,
};

const TypoTypeComponent = {
  P1: Typography.P1,
  P2: Typography.P2,
  P3: Typography.P3,
  Span1: Typography.Span1,
  Span2: Typography.Span2,
  SpanMid1: Typography.SpanMid1,
  SpanMid2: Typography.SpanMid2,
};

export default function BadgeButtons({
  badgeStyle,
  iconType,
  direction,
  iconStyle,
  contents,
  badgeType = 'Fill',
  className,
  typoStyle,
  typoType = 'P1',
  onClick = () => {},
  stroke,
  fill,
}: BadgesButtonsProps) {
  const BadgeButtonComponent = BadgeType[badgeType];
  const TypographyComponent = TypoTypeComponent[typoType];

  return (
    <Container.FlexRow className={className}>
      {contents && contents.map(content => (
        <BadgeButtonComponent
          key={content}
          className={badgeStyle}
          iconType={iconType}
          iconClassName={iconStyle}
          direction={direction}
          onClick={() => onClick(content)}
          stroke={stroke}
          fill={fill}
        >
          <TypographyComponent className={typoStyle}>
            {content}
          </TypographyComponent>
        </BadgeButtonComponent>
      ))}
    </Container.FlexRow>
  );
}

BadgeButtons.defaultProps = {
  badgeStyle: '',
  iconStyle: '',
  iconType: undefined,
  direction: 'right',
  typoType: 'P1',
  typoStyle: '',
  badgeType: 'Fill',
  onClick: () => {},
};
