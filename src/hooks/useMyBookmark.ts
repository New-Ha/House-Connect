import { infiniteQueryOptions } from '@tanstack/react-query';

import { UserType } from '@/types/auth.type';
import { supabase } from '@/libs/supabaseClient';
import { HouseCardType } from '@/types/house.type';
import USER_KEYS from '@/constants/queryKeys/user';
import SupabaseCustomError from '@/libs/supabaseCustomError';

export type HouseBookmarkType = {
  house: HouseCardType;
};

export const useInfiniteMyBookmarkHouseList = (
  user: UserType | null,
  filter: string,
  pageSize: number = 10,
) =>
  infiniteQueryOptions({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: USER_KEYS.USER_BOOKMARK_INFINITE_HOUSE_FILTER(user?.id, filter),
    queryFn: async ({ pageParam }) => {
      const HOUSE_PER_PAGE = pageSize;

      const { data, error, status } = await supabase
        .from('user_bookmark')
        .select('house!inner(*)')
        .eq('user_id', user?.id ?? '')
        .or(`region.like.%${filter}%,district.like.%${filter}%`, {
          referencedTable: 'house',
        })
        .range(
          pageParam * HOUSE_PER_PAGE,
          (pageParam + 1) * HOUSE_PER_PAGE - 1,
        );

      if (error) {
        throw new SupabaseCustomError(error, status);
      }

      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.length ? allPages.length + 1 : undefined,
    throwOnError: true,
  });
