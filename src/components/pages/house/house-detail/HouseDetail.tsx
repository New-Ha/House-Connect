import { useQueryClient, useSuspenseQueries } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

import HouseDetailTemplate, { HouseData } from '@/components/templates/house/house-detail/HouseDetailTemplate';
import {
  houseBookmarkQuery,
  houseDetailQuery,
  removeStorage,
  useDeleteHouseDetail,
} from '@/hooks/useHouseDetail';
import { UserAtom } from '@/stores/auth.store';
import CommentTemplate from '@/components/templates/CommentTemplate';
import { houseCommentQuery } from '@/hooks/useCommentReply';
import { CommentType } from '@/types/houseComment.type';
import Loading from '@/components/pages/maintenance/Loading';
import { routePaths } from '@/constants/route';
import Container from '@/components/atoms/Container';
import WithSuspenseAndErrorBoundary from '@/components/molecules/WithSuspenseAndErrorBoundary';
import IconButton from '@/components/molecules/IconButton';

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
  const { deleteHouseDetailPage } = useDeleteHouseDetail();

  const [
    houseDetailData,
    houseBookmarkData,
    { data: commentsData, count: commentsCount },
  ] = data;

  // ! houseData.user_id === user?.id => houseOwner
  const onClickDeleteHouse = (houseId: string | undefined) => {
    if (houseId) {
      deleteHouseDetailPage(houseId, {
        onSuccess: () => {
          removeStorage(houseId, user?.id as string);
        },
      });
    }
  };

  return (
    <Container className="relative w-full">
      {isLoadingDelaying && (
        <Loading
          className="absolute left-0 top-0 z-50 h-[100vh] w-[100vw]"
          delayTime={2000}
          setIsDelaying={setIsLoadingDelaying}
          text="로그인이 필요한 서비스입니다"
          callback={() => navigate(routePaths.signIn)}
        />
      )}
      {/* s-tablet 이하에서의 header를 대체하는 navigation component */}
      <nav className="sticky top-0 z-10 flex justify-between bg-bg py-6 s-tablet:hidden">
        <Container.FlexRow className="items-center gap-[1.54rem] mobile:gap-[2rem]">
          <li className="list-none">
            <IconButton.Ghost
              iconType="prev"
              stroke="brown1"
              iconClassName="w-[0.85rem] h-[1.54rem]"
              onClick={() => navigate(-1)}
            />
          </li>
          <li className="list-none">
            <IconButton.Ghost
              iconType="home"
              iconClassName="size-[1.54rem]"
              onClick={() => navigate(routePaths.root)}
            />
          </li>
        </Container.FlexRow>
        <Container.FlexRow className="items-center gap-[1.48rem] mobile:gap-[1.7rem]">
          <li className="list-none">
            <IconButton.Ghost
              iconType="pencil"
              iconClassName="size-[1.54rem]"
              onClick={() => navigate(routePaths.houseEdit(houseId))}
            />
          </li>
          <li className="list-none">
            <IconButton.Ghost
              iconType="trash"
              iconClassName="size-[1.78rem]"
              onClick={() => onClickDeleteHouse(houseId)}
            />
          </li>
        </Container.FlexRow>
      </nav>
      <HouseDetailTemplate
        houseData={houseDetailData as HouseData}
        bookmark={houseBookmarkData}
        houseId={houseId as string}
        setIsLoadingDelaying={setIsLoadingDelaying}
        houseOwner={houseDetailData.user_id === user?.id}
        className="pt-4"
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
