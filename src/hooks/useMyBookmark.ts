import { queryOptions } from '@tanstack/react-query';

import { UserType } from '@/types/auth.type';
import { supabase } from '@/libs/supabaseClient';
import { HouseCardType } from '@/types/house.type';
import USER_KEYS from '@/constants/queryKeys/user';
import SupabaseCustomError from '@/libs/supabaseCustomError';

export type HouseBookmarkType = {
  house: HouseCardType;
};

export const useMyBookmarkHouseList = (
  user: UserType | null,
  page: number,
  filter: string,
) =>
  queryOptions({
    queryKey: USER_KEYS.USER_BOOKMARK(user?.id, page, filter),
    queryFn: async () => {
      const { data, error, status } = await supabase
        .from('user_bookmark')
        .select('house(*)')
        .eq('user_id', user?.id ?? '')
        .or(`region.like.%${filter}%,district.like.%${filter}%`, {
          referencedTable: 'house',
        })
        .range((page - 1) * 9, page * 9);

      if (error) {
        throw new SupabaseCustomError(error, status);
      }

      return data;
    },
    throwOnError: true,
  });
export const useMyBookmarkHouseCount = (
  user: UserType | null,
  filter: string,
) =>
  queryOptions({
    queryKey: USER_KEYS.USER_BOOKMARK_HOUSE_COUNT(user?.id, filter),
    queryFn: async () =>
      supabase
        .from('house')
        .select('region, district, user_bookmark!inner(id)', {
          count: 'exact',
          head: false,
        })
        .eq('user_bookmark.id', user?.id ?? '')
        .or(`region.like.%${filter}%,district.like.%${filter}%`, {}),
    enabled: !!user,
  });
