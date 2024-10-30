import { useQueryClient, useSuspenseQueries } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Suspense, useState, ComponentType } from 'react';
import { FallbackProps, ErrorBoundary } from 'react-error-boundary';

import HouseDetailTemplate, {
  HouseData,
} from '@/components/templates/House/HouseDetail/HouseDetailTemplate';
import { houseBookmarkQuery, houseDetailQuery } from '@/hooks/useHouseDetail';
import { UserAtom } from '@/stores/auth.store';
import CommentTemplate from '@/components/templates/CommentTemplate';
import { houseCommentQuery } from '@/hooks/useCommentReply';
import { CommentType } from '@/types/houseComment.type';
import Loading from '@/components/pages/Loading';
import { routePaths } from '@/constants/route';
import Container from '@/components/atoms/Container';
import Error404 from '@/components/pages/maintenance/Error404';
import SupabaseCustomError from '@/libs/supabaseCustomError';

export function ErrorFallback({ error }: FallbackProps) {
  const { statusCode } = error as SupabaseCustomError;

  if (statusCode >= 400 && statusCode < 500) {
    return <Error404 />;
  }

  // TODO: unknown error page로 대체
  return <h1 className="text-8xl text-brown">알 수 없는 오류</h1>;
}

function HouseDetail() {
  const { houseId } = useParams();
  const [isLoadingDelaying, setIsLoadingDelaying] = useState(false);
  const navigate = useNavigate();
  const user = useRecoilValue(UserAtom);
  const queryClient = useQueryClient();
  const data = useSuspenseQueries({
    queries: [
      houseDetailQuery(queryClient, houseId),
      houseBookmarkQuery(queryClient, user?.id, houseId),
      houseCommentQuery(houseId),
    ],
  });

  const [
    { data: houseDetailData },
    { data: houseBookmarkData },
    {
      data: { data: commentsData, count: commentsCount },
    },
  ] = data;

  return (
    <Container className="relative size-full">
      {isLoadingDelaying && (
        <Loading
          className="absolute left-0 top-0 z-50 h-[100vh] w-[100vw]"
          delayTime={2000}
          setIsDelaying={setIsLoadingDelaying}
          text="로그인이 필요한 서비스입니다"
          callback={() => navigate(routePaths.signIn)}
        />
      )}
      <HouseDetailTemplate
        houseData={houseDetailData as HouseData}
        bookmark={houseBookmarkData}
        houseId={houseId as string}
        setIsLoadingDelaying={setIsLoadingDelaying}
      />
      <CommentTemplate
        comments={commentsData as unknown as CommentType[]}
        commentsCount={commentsCount?.toString() || '0'}
      />
    </Container>
  );
}

function WithSuspenseAndErrorBoundary<T>(InnerSuspenseComponent: ComponentType<T>) {
  // eslint-disable-next-line react/display-name
  return function (props: T & JSX.IntrinsicAttributes) {
    return (
      <ErrorBoundary fallbackRender={ErrorFallback}>
        <Suspense fallback={<Loading text="Loading..." />}>
          <InnerSuspenseComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
}

const SuspendedHouseDetail = WithSuspenseAndErrorBoundary(HouseDetail);
export default SuspendedHouseDetail;
