import classNames from 'classnames';

import { CustomIconType, IconType } from '@/types/icon.type';
import IconSVG from '@/components/atoms/iconSVG';
import cn from '@/libs/cn';

export type IconProps = CustomIconType & {
  type: IconType;
  className?: string;
};

export default function Icon(props: IconProps) {
  const {
    type,
    fill = undefined,
    stroke = undefined,
    className = '',
  } = props;

  const iconStyle = classNames(className, {
    [`[&_path]:fill-${fill}`]: fill,
    [`[&_path]:stroke-${stroke}`]: stroke,
  });

  const DynamicIconSVG = IconSVG[type];

  return (
    <DynamicIconSVG className={cn(iconStyle)} />
  );
}

Icon.defaultProps = { className: ''};
