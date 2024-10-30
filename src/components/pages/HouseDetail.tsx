import {
  useQueries,
  useQuery,
  useQueryClient,
  useSuspenseQueries,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useState, Suspense } from 'react';
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
import Error404 from '@/components/pages/maintenance/Error404';
import SupabaseCustomError from '@/libs/supabaseCustomError';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
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
    ],
  });

  const { data: comments } = useSuspenseQuery(houseCommentQuery(houseId));

  const [houseDetail, houseBookmark] = data;
  const { data: houseData } = houseDetail;
  const { data: bookmark } = houseBookmark;

  console.log('houseData =>', houseData);
  console.log('bookmark =>', bookmark);

  return (
    <ErrorBoundary fallbackRender={ErrorFallback}>
      <Suspense fallback={<Loading text="Loading..." />}>
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
          houseData={houseData?.data as HouseData}
          bookmark={bookmark?.data as boolean}
          houseId={houseId as string}
          setIsLoadingDelaying={setIsLoadingDelaying}
        />
        <CommentTemplate
          comments={comments?.data as unknown as CommentType[]}
          commentsCount={comments?.count as unknown as string}
        />
      </Suspense>
    </ErrorBoundary>
  );
}

export default HouseDetail;
