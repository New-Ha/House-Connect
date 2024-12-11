import { useParams } from 'react-router-dom';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import CommentReplyList from '@/components/organisms/CommentReplyList';
import CommentRegister from '@/components/molecules/CommentRegister';
import { CommentType } from '@/types/houseComment.type';

function CommentTemplate(props: {
  comments: CommentType[];
  commentsCount: string;
}) {
  const { houseId } = useParams();
  const { comments, commentsCount } = props;

  return (
    <Container.FlexCol className="pb-36 pt-8">
      <Container.FlexCol className="gap-8 py-8">
        <Typography.SubTitle1 className="text-brown">
          댓글 {commentsCount}개
        </Typography.SubTitle1>
        <CommentRegister
          topId={houseId as string}
          methodType="insert"
          isReply={false}
        />
      </Container.FlexCol>

      {comments &&
        comments?.map(comment => (
          <CommentReplyList
            key={comment?.id}
            comment={comment as unknown as CommentType}
          />
        ))}
    </Container.FlexCol>
  );
}

export default CommentTemplate;
