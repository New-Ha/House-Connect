import React, { ComponentProps, ReactNode } from 'react';

import cn from '@/libs/cn';
import Icon from '@/components/atoms/Icon';
/*
- xs; 40px (2.5rem)
- s; 44px (2.75rem)
- m; 48px (3rem)
- l; 60px (3.75rem)
- xl; 72px (4.5rem)
- 2xl; 96px (6rem)
- 3xl; 128px (8rem)
*/
export type AvatarProps = ComponentProps<'img'> & { isActive?: boolean };
export type AvatarSizeType = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

type AvatarComponentProps = {
  // eslint-disable-next-line no-unused-vars
  [key in AvatarSizeType]: (props: AvatarProps) => ReactNode;
};

const AvatarSize: { size: AvatarSizeType; defaultClassName: string }[] = [
  {
    size: 'XS',
    defaultClassName: 'size-10',
  },
  {
    size: 'S',
    defaultClassName: 'size-11',
  },
  {
    size: 'M',
    defaultClassName: 'size-12',
  },
  {
    size: 'L',
    defaultClassName: 'size-[3.75rem]',
  },
  {
    size: 'XL',
    defaultClassName: 'size-[4.5rem]',
  },
  {
    size: 'XXL',
    defaultClassName: 'size-24',
  },
  {
    size: 'XXXL',
    defaultClassName: 'size-32',
  },
];

const Avatar = {} as AvatarComponentProps;
AvatarSize.forEach(({ size, defaultClassName }) => {
  Avatar[size] = ({
    className,
    isActive = false,
    src,
    ...others
  }: AvatarProps) =>
    src ? (
      React.createElement('img', {
        className: cn(
          'shadow-avatar shrink-0 cursor-pointer rounded-full',
          defaultClassName,
          isActive && 'shadow-avatar-active',
          className,
        ),
        src: src?.startsWith('images/avatar/')
          ? `${import.meta.env.VITE_SUPABASE_STORAGE_URL}${src.replace('images/', '')}?t=${Date.now()}`
          : `${src}`,
        ...others,
      })
    ) : (
      <Icon type="avatar" className={cn(defaultClassName, className)} />
    );
});
export default Avatar;
