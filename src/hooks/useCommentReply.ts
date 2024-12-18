/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { supabase } from '@/libs/supabaseClient';
import { createToast, errorToast, successToast } from '@/libs/toast';
import HOUSE_KEYS from '@/constants/queryKeys/house';


type Comment = {
  id?: string;
  topId?: string;
  content?: string;
  userId?: string;
  methodType: 'insert' | 'update' | 'delete';
  onCloseRegister?: () => void;
};

export const useComment = () => {
  const { houseId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: updateComment, isPending: commentPending } = useMutation({
    mutationFn: async (payload: Comment) => {
      if (payload.methodType === 'insert') {
        const { error: insertError } = await supabase
          .from('house_comment')
          .insert([
            {
              house_id: payload.topId as string,
              content: payload.content as string,
              user_id: payload.userId as string,
            },
          ]);
        if (insertError) {
          throw new Error(insertError.message);
        }
      } else if (payload.methodType === 'update') {
        const { error: updateError } = await supabase
          .from('house_comment')
          .update({ content: payload.content })
          .eq('id', payload.id as string);
        if (updateError) {
          throw new Error(updateError.message);
        }
      } else {
        const { error: deleteError } = await supabase
          .from('house_comment')
          .delete()
          .eq('id', payload.id as string);
        if (deleteError) {
          throw new Error(deleteError.message);
        }
      }
    },
    onMutate: variables => {
      if (variables.methodType === 'insert') {
        createToast('comment', '댓글 등록 중');
      } else if (variables.methodType === 'update') {
        createToast('comment', '댓글 수정 중');
      } else {
        createToast('comment', '댓글 삭제 중');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: HOUSE_KEYS.HOUSE_COMMENT_REPLY(houseId),
      });
      successToast('comment', '댓글 변경 완료');
    },
    onError: () => {
      errorToast('comment', '댓글 에러 ');
    },
  });
  return { updateComment, commentPending };
};

export const useReply = () => {
  const { houseId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: updateReply, isPending: replyPending } = useMutation({
    mutationFn: async (payload: Comment) => {
      if (payload.methodType === 'insert') {
        const { error: insertError } = await supabase
          .from('house_reply')
          .insert([
            {
              comment_id: payload.topId as string,
              content: payload.content as string,
              user_id: payload.userId as string,
            },
          ]);
        if (insertError) {
          throw new Error(insertError.message);
        }
      } else if (payload.methodType === 'update') {
        const { error: updateError } = await supabase
          .from('house_reply')
          .update({ content: payload.content })
          .eq('id', payload.id as string);
        if (updateError) {
          throw new Error(updateError.message);
        }
      } else {
        const { error: deleteError } = await supabase
          .from('house_reply')
          .delete()
          .eq('id', payload.id as string);
        if (deleteError) {
          throw new Error(deleteError.message);
        }
      }
    },
    onMutate: variables => {
      if (variables.methodType === 'insert') {
        createToast('reply', '답글 등록 중');
      } else if (variables.methodType === 'update') {
        createToast('reply', '답글 수정 중');
      } else {
        createToast('reply', '답글 삭제 중');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: HOUSE_KEYS.HOUSE_COMMENT_REPLY(houseId),
      });
      successToast('reply', '답글 변경 완료');
    },
    onError: () => {
      errorToast('reply', '답글 에러 ');
    },
  });
  return { updateReply, replyPending };
};

export const houseCommentQuery = (houseId: string | undefined) =>
  queryOptions({
    queryKey: HOUSE_KEYS.HOUSE_COMMENT_REPLY(houseId),
    queryFn: async () =>
      supabase
        .from('house_comment')
        .select(
          '*, house_reply(*,user(nickname,avatar)),user(nickname,avatar)',
          {
            count: 'exact',
          },
        )
        .eq('house_id', houseId ?? ''),
    enabled: !!houseId,
  });


