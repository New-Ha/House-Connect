import { Outlet, useLocation } from 'react-router-dom';

import { routePaths } from '@/constants/route';
import Container from '@/components/atoms/Container';
import Link from '@/components/atoms/Link';
import Typography from '@/components/atoms/Typography';

type MyPageSideBarItemProps = {
  isActive: boolean;
  path: string;
  name: string;
};

function MyPageSideBarItem(props: MyPageSideBarItemProps) {
  const { isActive, path, name } = props;
  return (
    <Link to={`${routePaths.myPage}/${path}`}>
      <Typography.SubTitle3 className={isActive ? 'text-brown' : 'text-brown2'}>
        {name}
      </Typography.SubTitle3>
    </Link>
  );
}

export default function MyPageLayoutTemplate() {
  const location = useLocation();
  const sidebarItems = [
    { path: 'activity', name: '내 활동' },
    { path: 'bookmark', name: '내 북마크' },
    { path: 'mate', name: '메이트 관리' },
    { path: 'alarm', name: '알림 설정' },
    { path: 'theme', name: '테마 설정' },
  ];
  return (
    <Container.Grid className="grid-cols-[12.75rem_1fr] pt-[3.25rem]">
      <aside className="flex flex-col gap-y-10 pt-[3.25rem]">
        <Typography.SubTitle1 className="text-brown">
          마이 페이지
        </Typography.SubTitle1>
        <Container.FlexCol className="gap-y-7">
          {sidebarItems.map(sidebarItem => (
            <MyPageSideBarItem
              key={sidebarItem.name}
              name={sidebarItem.name}
              path={sidebarItem.path}
              isActive={
                location.pathname.endsWith(sidebarItem.path) ||
                (location.pathname.endsWith('account') &&
                  sidebarItem.path === 'activity')
              }
            />
          ))}
        </Container.FlexCol>
      </aside>
      <section className="pt-[3.25rem]">
        <Outlet />
      </section>
    </Container.Grid>
  );
}
