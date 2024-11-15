import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Dispatch, SetStateAction, useState } from 'react';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import { asideItems } from '@/constants/mypage';
import IconButton from '@/components/molecules/IconButton';
import cn from '@/libs/cn';
import MyPageAsideDropdown from '@/components/organisms/dropdown/MyPageAsideDropdown';
import { WithErrorBoundary } from '@/components/organisms/withAsyncErrorHandling';
import isRoutePathMatched from '@/libs/isRoutePathMatched';

type MyPageAsideProps = {
  isAsideDropdownOpen: boolean;
  setIsAsideDropdownOpen: Dispatch<SetStateAction<boolean>>;
};

function MyPageAside({
  isAsideDropdownOpen,
  setIsAsideDropdownOpen,
}: MyPageAsideProps) {
  const location = useLocation();
  const isMyAccountRoute = isRoutePathMatched(location.pathname, 'myAccount');
  return (
    <Container className="h-full">
      {/* after tablet breakpoint aside */}
      <aside className="sticky top-[8.5rem] hidden flex-col gap-y-10 tablet:flex">
        <Typography.SubTitle1 className="text-brown">
          마이 페이지
        </Typography.SubTitle1>
        <Container.FlexCol className="gap-y-7">
          {asideItems.map(({ path, name }) => (
            <NavLink
              key={`${path}-${name}`}
              to={path}
              className={({ isActive }) =>
                isActive ? 'text-brown' : 'text-brown2'
              }
            >
              <Typography.SubTitle3>{name}</Typography.SubTitle3>
            </NavLink>
          ))}
        </Container.FlexCol>
      </aside>
      {/* under tablet breakpoint aside */}
      <Container.FlexCol className="relative max-w-[12rem] pb-12 tablet:hidden">
        <IconButton.Ghost
          className="gap-2 pb-6"
          stroke="brown"
          iconType="expand-arrow"
          iconClassName={cn(
            'w-[0.8rem] h-[1rem]',
            isAsideDropdownOpen && 'rotate-180',
          )}
          onClick={e => {
            e.stopPropagation();
            setIsAsideDropdownOpen(prev => !prev);
          }}
        >
          <Typography.Head1 className="text-[1.54rem] font-semibold text-brown">
            마이 페이지
          </Typography.Head1>
        </IconButton.Ghost>
        {isAsideDropdownOpen && (
          <MyPageAsideDropdown
            className="absolute top-[3rem]"
            setDropView={setIsAsideDropdownOpen}
          />
        )}
        <Typography.Head2 className="text-[1.077rem] font-semibold text-brown">
          {asideItems.find(({ path }) => path === location.pathname)?.name}
          {isMyAccountRoute && '내 활동'}
        </Typography.Head2>
      </Container.FlexCol>
    </Container>
  );
}

function MyPageLayoutTemplateComponent() {
  const [isAsideDropdownOpen, setIsAsideDropdownOpen] = useState(false);

  return (
    <Container.Grid className="size-full grid-cols-1 grid-rows-[auto_1fr] tablet:grid-cols-[12.75rem_1fr] tablet:grid-rows-1">
      <MyPageAside
        isAsideDropdownOpen={isAsideDropdownOpen}
        setIsAsideDropdownOpen={setIsAsideDropdownOpen}
      />

      <section className="size-full pb-8">
        <Outlet />
      </section>
    </Container.Grid>
  );
}

const MyPageLayoutTemplate = WithErrorBoundary({
  InnerErrorBoundaryComponent: MyPageLayoutTemplateComponent,
});

export default MyPageLayoutTemplate;
