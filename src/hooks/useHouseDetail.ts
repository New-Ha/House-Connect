import {
  QueryClient,
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { routePaths } from '@/constants/route';
import { supabase } from '@/libs/supabaseClient';
import { createToast, errorToast, successToast } from '@/libs/toast';
import HOUSE_KEYS from '@/constants/queryKeys/house';
import SupabaseCustomError from '@/libs/supabaseCustomError';

type BookMarkType = {
  userId: string;
  houseId: string;
  isBookMark: boolean;
};

const unBookmarkedPost = async (userId: string, houseId: string) => {
  const { error: deleteError } = await supabase
    .from('user_bookmark')
    .delete()
    .eq('user_id', userId)
    .eq('house_id', houseId);
  if (deleteError) {
    throw new Error(deleteError.message);
  }
};

const bookmarkedPost = async (userId: string, houseId: string) => {
  if (!userId) throw new Error('로그인 후 이용바랍니다.');

  const { error: insertError } = await supabase
    .from('user_bookmark')
    .insert([{ user_id: userId, house_id: houseId }])
    .select('*');
  if (insertError) {
    throw new Error(insertError.message);
  }
};

export const useUpdateBookMark = () => {
  const queryClient = useQueryClient();
  const { mutate: updateBookMark, isPending } = useMutation({
    mutationFn: async (payload: BookMarkType) => {
      if (payload.isBookMark) {
        await unBookmarkedPost(payload.userId, payload.houseId);
      } else {
        await bookmarkedPost(payload.userId, payload.houseId);
      }
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: HOUSE_KEYS.HOUSE_DETAIL_BOOKMARK(
          variables.userId,
          variables.houseId,
        ),
      });
      queryClient.invalidateQueries({
        queryKey: HOUSE_KEYS.HOUSE_DETAIL(variables.houseId),
      });
    },
    onError: error => {
      createToast('error_bookmark', error.message, {
        isLoading: false,
        type: 'error',
        autoClose: 1000,
      });
    },
  });
  return { updateBookMark, isPending };
};

export const removeStorage = async (houseId: string, userId: string) => {
  const { data, error } = await supabase.storage
    .from('images')
    .list(`house/${userId}/${houseId}`, {
      limit: 10,
      offset: 0,
    });
  if (error) throw new Error(error.message);
  if (data) {
    data.forEach(async imgObj => {
      const imgName = imgObj.name;
      const { error: removeError } = await supabase.storage
        .from('images')
        .remove([`house/${userId}/${houseId}/${imgName}`]);
      if (removeError) throw new Error(removeError.message);
    });
  }
};

export const useDeleteHouseDetail = () => {
  const navigate = useNavigate();
  const { mutate: deleteHouseDetailPage } = useMutation({
    mutationFn: async (houseId: string) => {
      const { error } = await supabase.from('house').delete().eq('id', houseId);
      if (error) {
        throw new Error(error.message);
      }
    },
    onMutate: () =>
      createToast('deleteHouseDetailPage', '하우스 디테일 페이지 삭제 중...'),
    onError: () =>
      errorToast(
        'deleteHouseDetailPage',
        '하우스 디테일 페이지 삭제에 실패했습니다.',
      ),
    onSuccess: () => {
      successToast(
        'deleteHouseDetailPage',
        '하우스 디테일 페이지가 삭제되었습니다.',
      );
      navigate(routePaths.house);
    },
  });
  return { deleteHouseDetailPage };
};

export const houseDetailQuery = (
  queryClient: QueryClient,
  houseId: string | undefined,
) =>
  queryOptions({
    queryKey: HOUSE_KEYS.HOUSE_DETAIL(houseId),
    queryFn: async () => {
      if (!houseId) return null;

      const { data, error, status } = await supabase
        .from('house')
        .select(
          `*, user(id, name, avatar, gender), user_lifestyle(smoking, pet, appeals), user_mate_style(mate_gender, mate_number, mate_appeals, prefer_mate_age)`,
        )
        .eq('id', houseId ?? '')
        .single();
      if (error) {
        throw new SupabaseCustomError(error, status);
      }
      return data;
    },
    initialData: () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.getQueryData(HOUSE_KEYS.HOUSE_DETAIL(houseId)) as any,
  });

export const houseBookmarkQuery = (
  queryClient: QueryClient,
  userId: string | undefined,
  houseId: string | undefined,
) =>
  queryOptions({
    queryKey: HOUSE_KEYS.HOUSE_DETAIL_BOOKMARK(userId, houseId),
    queryFn: async () => {
      // ! 원래 useQuery의 enabled 옵션을 대체하는 if문
      // ! useQuery -> useSuspenseQuery로 변경하면서 enabled 옵션을 사용하지 못 함
      if (!userId || !houseId) return null;

      const { data, error, status } = await supabase
        .from('user_bookmark')
        .select('*')
        .eq('user_id', userId)
        .eq('house_id', houseId)
        .maybeSingle();

      if (error) {
        throw new SupabaseCustomError(error, status);
      }

      return data;
    },
    initialData: () =>
      queryClient.getQueryData(
        HOUSE_KEYS.HOUSE_DETAIL_BOOKMARK(userId, houseId),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any,
  });
