import { useSuspenseQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import Container from '@/components/atoms/Container';
import { commentsQuery } from '@/hooks/useCommentReply';
import { UserAtom } from '@/stores/auth.store';
import { WithSuspense } from '@/components/organisms/withAsyncErrorHandling';
import Loading from '@/components/pages/maintenance/Loading';
import Typography from '@/components/atoms/Typography';
import Icon from '@/components/atoms/Icon';
import Divider from '@/components/atoms/Divider';
import Link from '@/components/atoms/Link';
import { routePaths } from '@/constants/route';

function MyActivityCommentsTemplateComponent() {
  const user = useRecoilValue(UserAtom);
  const { data: comments } = useSuspenseQuery(commentsQuery(user?.id));
  
  return (
    <Link to={routePaths.houseDetail('06dd84f0-8a64-49cd-b4f2-efba63246838')}>
      <Container.FlexCol className="size-full">
        <Container.Grid className="flex-1 grid-cols-1 items-start gap-x-[1.125rem] py-10">
          {comments && comments?.length > 0 ? (
            comments.map(something => (
              <Container.FlexCol
                key={JSON.stringify(something)}
                className="size-full cursor-pointer gap-[1.846rem] border-b border-brown pb-[2.154rem] pt-[1.538rem] tablet:gap-6 tablet:pb-8 tablet:pt-[1.25rem]"
              >
                <Container.FlexCol className="gap-[1rem]">
                  <Typography.P3 className="text-[0.923rem] text-brown1 s-tablet:text-[1.231rem] tablet:text-[1rem]">
                    2024.06.28
                  </Typography.P3>
                  <Typography.P2 className="text-[1.077rem] leading-normal text-brown s-tablet:text-[1.385rem] tablet:text-[1.25rem]">
                    안녕하세요. 메시지 보냈는데 확인 부탁드려요.
                  </Typography.P2>
                </Container.FlexCol>
                <Container.FlexCol className="w-full gap-[0.77rem] rounded-xl border border-brown px-[1.54rem] py-[1.846rem] tablet:gap-[0.624rem] tablet:px-5 tablet:py-6">
                  <Typography.SubTitle3 className="text-[1.077rem] text-point tablet:text-[0.875rem]">
                    HOUSE
                  </Typography.SubTitle3>
                  <Typography.SubTitle2 className="text-[1.231rem] leading-normal text-brown tablet:text-[1rem]">
                    반포동 근처 룸메이트 구합니다.
                  </Typography.SubTitle2>
                  <Container.FlexRow className="gap-[0.8rem]">
                    <Container.FlexRow className="gap-[0.5rem]">
                      <Icon
                        type="heart"
                        fill="brown"
                        className="h-[1.077rem] w-[1.23rem] tablet:h-[1rem] tablet:w-[1.125rem]"
                      />
                      <Typography.Span1 className="text-[0.923rem] text-brown tablet:text-[0.875rem]">
                        1
                      </Typography.Span1>
                    </Container.FlexRow>
                    <Container.FlexRow className="gap-[0.5rem]">
                      <Icon
                        type="speech-balloon"
                        className="h-[1.077rem] w-[1.23rem] tablet:h-[1rem] tablet:w-[1.125rem]"
                      />
                      <Typography.Span1 className="text-[0.923rem] text-brown tablet:text-[0.875rem]">
                        1
                      </Typography.Span1>
                    </Container.FlexRow>
                    <Divider.Col />
                    <Typography.Span1 className="text-[0.923rem] text-brown1 tablet:text-[0.875rem]">
                      user1234
                    </Typography.Span1>
                  </Container.FlexRow>
                </Container.FlexCol>
              </Container.FlexCol>
            ))
          ) : (
            <Typography.Span1 className="text-brown">
              댓글이 없습니다.
            </Typography.Span1>
          )}
        </Container.Grid>
      </Container.FlexCol>
    </Link>
  );
}

const MyActivityCommentsTemplate = WithSuspense({
  InnerSuspenseComponent: MyActivityCommentsTemplateComponent,
  SuspenseFallback: <Loading className="size-full py-28" />,
});

export default MyActivityCommentsTemplate;
