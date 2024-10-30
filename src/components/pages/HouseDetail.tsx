import { useQueryClient, useSuspenseQueries } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

import HouseDetailTemplate, {
  HouseData,
} from '@/components/templates/House/HouseDetail/HouseDetailTemplate';
import { houseBookmarkQuery, houseDetailQuery } from '@/hooks/useHouseDetail';
import { UserAtom } from '@/stores/auth.store';
import CommentTemplate from '@/components/templates/CommentTemplate';
import { houseCommentQuery } from '@/hooks/useCommentReply';
import { CommentType } from '@/types/houseComment.type';
import Loading from '@/components/pages/maintenance/Loading';
import { routePaths } from '@/constants/route';
import Container from '@/components/atoms/Container';
import WithSuspenseAndErrorBoundary from '@/components/molecules/WithSuspenseAndErrorBoundary';

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
    combine: results => results.map(result => result.data),
  });

  const [
    houseDetailData,
    houseBookmarkData,
    { data: commentsData, count: commentsCount },
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

const SuspendedHouseDetail = WithSuspenseAndErrorBoundary(HouseDetail);
export default SuspendedHouseDetail;
