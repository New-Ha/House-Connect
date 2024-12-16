import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import USER_KEYS from '@/constants/queryKeys/user';
import { supabase } from '@/libs/supabaseClient';
import SupabaseCustomError from '@/libs/supabaseCustomError';
import { UserComments } from '@/types/comments.type';
import HOUSE_KEYS from '@/constants/queryKeys/house';

/**
 ** user_house_comments rpc definition
  * ? house_reply, house_comment, house에 관련된 데이터를 supabase api를 통해서 가져오는 것은
  * ? 복잡한 쿼리가 필요하므로 sql로 supabase rpc로 정의 함.
  * ? 한 house에 동일한 유저가 댓글, 답글을 다는 경우가 있으므로 house_id, user_id를 기준으로 grouping.
  * ? user에 관련된 정보도 필요하므로 user_id삭제 후 user에 대한 정보도 left join하여 추가

  * * rpc definition sql query
  -- union을 할 때 select부분에서 불러오는 column의 순서가 맞지 않으면 type 불일치가 생긴다
  -- e.g) content자리에 updated_at이 오면 text와 timestamptz의 type이 맞지 않으므로 오류가 발생
  CREATE
  OR REPLACE FUNCTION user_house_comments (input_user_id UUID) RETURNS TABLE (
    house_id UUID,
    comments JSON,
    house JSON,
    "user" JSON
  ) AS $$
    with comments_union_result AS (
      select 
      house_id,
      id as comment_id,
      user_id,
      content,
      updated_at as comment_updated_at
      from
        house_comment
      where
        user_id = input_user_id
        
      UNION ALL

      select
        hc.house_id as house_id,
        hr.comment_id as comment_id,
        coalesce(hr.user_id, hc.user_id) as user_id,
        hr.content as content,
        hr.updated_at as comment_updated_at
      from 
        house_reply as hr 
      inner join 
        house_comment as hc 
      on 
        hr.comment_id = hc.id
      where
        hr.user_id = input_user_id
    )

    -- comments의 union결과를 house정보를 가져오기 위해 다시 join
    select
      cur.house_id,
      json_agg(json_build_object(
        'comment_id', cur.comment_id,
        'content', cur.content,
        'comment_updated_at', cur.comment_updated_at
      )) as comments,
      row_to_json(h) as house,
      row_to_json(u) as "user"
    from 
      comments_union_result as cur
    left join
      house as h
    on
      h.id = cur.house_id
    left join
      "user" as u
    on
      cur.user_id = u.id
    group by
      cur.house_id, cur.user_id, h.*, u.*
  $$ LANGUAGE sql;
 */

export const commentsQuery = (userId: string | undefined) =>
  queryOptions({
    queryKey: USER_KEYS.USER_HOUSE_COMMENTS(userId),
    queryFn: async () => {
      if (!userId) return [];
      const { data, error, status } = await supabase.rpc(
        'user_house_comments',
        { input_user_id: userId },
      );

      const commentsData = data as UserComments;

      // * [{..., comments: [{id, updated_at, content}, ...]}]와 같은 구조로 되어 있음.
      const sortedDataByUpdatedAt = commentsData?.sort((a, b) => {
        // * comments를 updated_at오름차순 정렬하여 가장 최신의 comment를 기준으로 data를 오름차순 정렬을 위함.
        const aDate = new Date(
          [...a.comments].sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime(),
          )[0].updated_at,
        ).getTime();
        const bDate = new Date(
          [...b.comments].sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime(),
          )[0].updated_at,
        ).getTime();

        return bDate - aDate;
      });

      if (error) {
        throw new SupabaseCustomError(error, status);
      }

      return sortedDataByUpdatedAt;
    },
  });

export const useInfiniteMyHouseList = (userId: string, pageSize: number = 6) =>
  infiniteQueryOptions({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: HOUSE_KEYS.MY_HOUSE(userId),
    queryFn: async ({ pageParam }) => {
      const { data, error, status } = await supabase
        .from('house')
        .select('*')
        .eq('user_id', userId)
        .eq('temporary', 1)
        .range(pageParam * pageSize, (pageParam + 1) * pageSize - 1)
        .order('created_at', { ascending: false });

      if (error) throw new SupabaseCustomError(error, status);

      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.length === pageSize ? allPages.length : undefined,
    throwOnError: true,
  });
