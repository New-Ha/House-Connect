import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
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
import Loading from '@/components/pages/Loading';
import { routePaths } from '@/constants/route';

function HouseDetail() {
  const { houseId } = useParams();
  const [isLoadingDelaying, setIsLoadingDelaying] = useState(false);
  const navigate = useNavigate();
  const user = useRecoilValue(UserAtom);
  const queryClient = useQueryClient();
  const data = useQueries({
    queries: [
      houseDetailQuery(queryClient, houseId),
      houseBookmarkQuery(queryClient, user?.id, houseId),
    ],
  });

  const isPending = data.some(result => result.isFetching);

  const { data: comments } = useQuery(houseCommentQuery(houseId));

  const [houseDetail, houseBookmark] = data;
  const { data: houseData } = houseDetail;
  const { data: bookmark } = houseBookmark;

  if (isPending)
    return <Loading text="Loading..." textStyle="tracking-widest" />;

  return (
    <>
      {isLoadingDelaying && (
        <Loading
          className="absolute left-0 top-0 z-50 h-[100vh] w-[100vw]"
          delayTime={2000}
          setIsDelaying={setIsLoadingDelaying}
          text="로그인이 필요한 서비스입니다"
          callback={() => navigate(routePaths.signIn)}
        />
      )}
      {houseData && (
        <HouseDetailTemplate
          houseData={houseData?.data as HouseData}
          bookmark={bookmark?.data as boolean}
          houseId={houseId as string}
          setIsLoadingDelaying={setIsLoadingDelaying}
        />
      )}
      <CommentTemplate
        comments={comments?.data as unknown as CommentType[]}
        commentsCount={comments?.count as unknown as string}
      />
    </>
  );
}

export default HouseDetail;
