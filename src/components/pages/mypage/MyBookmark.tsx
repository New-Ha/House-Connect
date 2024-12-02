import { NavLink, Outlet } from 'react-router-dom';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import cn from '@/libs/cn';
import { WithSuspense } from '@/components/organisms/withAsyncErrorHandling';
import Loading from '@/components/pages/maintenance/Loading';
import { routePaths } from '@/constants/route';

function MyBookmarkPageComponent() {
  const tabItem = [
    { displayName: '하우스', path: routePaths.myBookmarkHouses },
    { displayName: '라운지', path: routePaths.myBookmarkLounges },
    { displayName: '게시물', path: routePaths.myBookmarkPosts },
  ];

  return (
    <Container.FlexCol className="size-full">
      <Container.FlexRow>
        {tabItem.map(({ displayName, path }) => (
          <li key={displayName} className="flex-1 list-none">
            <NavLink
              to={path}
              className={({ isActive }) =>
                cn(
                  'flex size-full items-center justify-center border-b-brown px-[1.54rem] py-[1.385rem] text-brown2 tablet:w-[8.3rem] tablet:flex-none tablet:p-5',
                  isActive ? 'border-b-3 text-brown' : '',
                )
              }
            >
              <Typography.SubTitle1 className="text-[1.077rem] font-semibold tablet:text-lg">
                {displayName}
              </Typography.SubTitle1>
            </NavLink>
          </li>
        ))}
      </Container.FlexRow>
      <Outlet />
    </Container.FlexCol>
  );
}

const MyBookmark = WithSuspense({
  InnerSuspenseComponent: MyBookmarkPageComponent,
  SuspenseFallback: <Loading className="size-full" />,
});

export default MyBookmark;
