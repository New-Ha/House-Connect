/* eslint-disable react/require-default-props */
import Badge, { BadgeProps, BadgeType } from '@/components/atoms/Badge';
import Icon, { IconProps } from '@/components/atoms/Icon';
import cn from '@/libs/cn';
import { IconDirectionType, IconType } from '@/types/icon.type';

type BadgeIconProps = Omit<IconProps, 'type'> &
  BadgeProps & {
    iconType: IconType;
    badge?: BadgeType;
    direction?: IconDirectionType;
    iconClassName?: string;
  };
export default function BadgeIcon(props: BadgeIconProps) {
  const {
    badge,
    fill,
    stroke,
    iconType,
    direction = 'left',
    children,
    className = '',
    focus = false,
    active = false,
    hover = false,
    iconClassName,
    ...others
  } = props;
  const IconComponent = (
    <Icon type={iconType} stroke={stroke} className={iconClassName} />
  );
  const directionStyle = {
    right: '',
    left: 'flex-row-reverse',
    top: 'flex-col-reverse',
    bottom: 'flex-col',
  };
  const customClassName = 'gap-2 rounded-full px-4 text-lg';

  if (badge === 'Fill')
    return (
      <Badge.Fill
        className={cn(directionStyle[direction], customClassName, className)}
        focus={focus}
        active={active}
        hover={hover}
        {...others}
      >
        {children}
        {IconComponent}
      </Badge.Fill>
    );
  if (badge === 'Outline')
    return (
      <Badge.Outline
        className={cn(directionStyle[direction], customClassName, className)}
        focus={focus}
        active={active}
        hover={hover}
        {...others}
      >
        {children}
        {IconComponent}
      </Badge.Outline>
    );
  return null;
}
BadgeIcon.Fill = function BadgeIconFill(props: BadgeIconProps) {
  return <BadgeIcon badge="Fill" {...props} />;
};
BadgeIcon.Outline = function BadgeIconOutline(props: BadgeIconProps) {
  return <BadgeIcon badge="Outline" {...props} />;
};
