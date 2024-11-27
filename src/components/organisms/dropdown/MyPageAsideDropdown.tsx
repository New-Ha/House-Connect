import { NavLink } from 'react-router-dom';
import { Dispatch, SetStateAction, useRef } from 'react';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import { asideItems } from '@/constants/mypage';
import cn from '@/libs/cn';
import useCloseOnClickOutside from '@/hooks/useCloseOnClickOutside';

type MyPageAsideDropdownProps = {
  className?: string;
  setDropView: Dispatch<SetStateAction<boolean>>;
};

export default function MyPageAsideDropdown({
  className,
  setDropView,
}: MyPageAsideDropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useCloseOnClickOutside(containerRef, () => setDropView(false));

  return (
    <Container.FlexCol
      ref={containerRef}
      className={cn(
        'w-[14.3rem] rounded-lg shadow-dropdown z-50 bg-white',
        className,
      )}
    >
      {asideItems.map(({ name, path }) => (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
        <li
          className="cursor-pointer list-none p-[1.23rem] hover:bg-brown6"
          key={path}
          onClick={() => setDropView(false)}
        >
          <NavLink
            to={path}
            className={({ isActive }) =>
              isActive ? 'text-brown' : 'text-brown2'
            }
          >
            <Typography.SubTitle3>{name}</Typography.SubTitle3>
          </NavLink>
        </li>
      ))}
    </Container.FlexCol>
  );
}

MyPageAsideDropdown.defaultProps = {
  className: '',
};
