import {
  infiniteQueryOptions,
  queryOptions,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

import USER_KEYS from '@/constants/queryKeys/user';
import { supabase } from '@/libs/supabaseClient';
import SupabaseCustomError from '@/libs/supabaseCustomError';
import { UserComments } from '@/types/comments.type';
import HOUSE_KEYS from '@/constants/queryKeys/house';

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
