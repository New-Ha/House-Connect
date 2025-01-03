import {
  QueryFunctionContext,
  queryOptions,
  useInfiniteQuery,
  useMutation,
  useQueries,
  UseQueryResult,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
/* eslint-disable consistent-return */
import { FileObject } from '@supabase/storage-js';

import { routePaths } from '@/constants/route';
import {
  createToast,
  errorToast,
  removeToast,
  successToast,
} from '@/libs/toast';
import { supabase } from '@/libs/supabaseClient';
import { HouseFormType, HouseListFilterType } from '@/types/house.type';
import {
  UserLifeStyleType,
  UserMateStyleType,
} from '@/components/pages/house/house-regist/HouseRegister';
import USER_KEYS from '@/constants/queryKeys/user';
import HOUSE_KEYS from '@/constants/queryKeys/house';
import { Keys } from '@/types/common.type';
import SupabaseCustomError from '@/libs/supabaseCustomError';

// fetch House post
export const housePostQuery = (houseId: string | undefined) => {
  if (!houseId) {
    throw new Error('게시글이 존재하지 않습니다.');
  }

  return queryOptions({
    queryKey: HOUSE_KEYS.HOUSE_POST(houseId),
    queryFn: async () => {
      const { data, error, status } = await supabase
        .from('house')
        .select('*')
        .eq('id', houseId)
        .single();

      if (error) throw new SupabaseCustomError(error, status);

      return {
        bookmark: data.bookmark,
        deposit_price: data.deposit_price,
        describe: data.describe,
        district: data.district,
        floor: data.floor as 0 | 1 | 2,
        house_appeal: data.house_appeal,
        house_img: data.house_img,
        house_size: data.house_size,
        house_type: data.house_type as 0 | 1 | 2 | 3,
        manage_price: data.manage_price,
        monthly_price: data.monthly_price,
        post_title: data.post_title,
        region: data.region,
        rental_type: data.rental_type as 0 | 1 | 2 | 3,
        representative_img: data.representative_img,
        room_num: data.room_num,
        temporary: data.temporary as 0 | 1,
        term: data.term as HouseFormType['term'],
        user_id: data.user_id,
      };
    },
  });
};

// fetch user life & mate style
const fetchUserLifeStyle = async (
  userId: string,
): Promise<UserLifeStyleType> => {
  const { data, error, status } = await supabase
    .from('user_lifestyle')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw new SupabaseCustomError(error, status);

  return {
    smoking: data.smoking,
    pet: data.pet as 0 | 1 | 2,
    appeals: data.appeals || [],
  };
};

const fetchUserMateStyle = async (
  userId: string,
): Promise<UserMateStyleType> => {
  const { data, error, status } = await supabase
    .from('user_mate_style')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw new SupabaseCustomError(error, status);

  return {
    mate_gender: data.mate_gender as 0 | 1 | 2,
    mate_number: data.mate_number as 0 | 1 | 2 | 3,
    mate_appeals: data.mate_appeals || [],
    prefer_mate_age:
      data.prefer_mate_age as UserMateStyleType['prefer_mate_age'],
  };
};

export const useFetchProfileData = (userId: string) => {
  const queryResults = useQueries({
    queries: [
      {
        queryKey: USER_KEYS.USER_LIFESTYLE(userId),
        queryFn: () => fetchUserLifeStyle(userId),
        enabled: !!userId,
      },
      {
        queryKey: USER_KEYS.USER_MATE_STYLE(userId),
        queryFn: () => fetchUserMateStyle(userId),
        enabled: !!userId,
      },
    ],
  });

  return {
    userLifeStyleQuery: queryResults[0] as UseQueryResult<
      UserLifeStyleType,
      Error
    >,
    userMateStyleQuery: queryResults[1] as UseQueryResult<
      UserMateStyleType,
      Error
    >,
  };
};

// storage 관련 함수
export const getStorageImage = async (
  storagePath: string,
): Promise<FileObject[] | undefined> => {
  const { data, error } = await supabase.storage
    .from('images')
    .list(storagePath, { limit: 1000, offset: 0 });
  if (error)
    throw new Error(`이미지를 가져오는데 실패했습니다: ${error.message}`);
  return data;
};

export const removeStorageFile = async (
  imageList: FileObject[],
  storagePath: string,
): Promise<void> => {
  const removePromises = imageList.map(imgObj =>
    supabase.storage.from('images').remove([`${storagePath}/${imgObj.name}`]),
  );
  const results = await Promise.all(removePromises);
  results.forEach(({ error }) => {
    if (error) throw new Error(`이미지 삭제에 실패했습니다: ${error.message}`);
  });
};

const moveImageStorage = async (
  images: string[],
  toStoragePath: string,
  fromStoragePath: string,
): Promise<boolean> => {
  const movePromises = images.map(imgName =>
    supabase.storage
      .from('images')
      .move(`${toStoragePath}/${imgName}`, `${fromStoragePath}/${imgName}`),
  );
  const results = await Promise.all(movePromises);
  results.forEach(({ error }, index) => {
    if (error)
      throw new Error(
        `이미지 ${images[index]} 이동에 실패했습니다: ${error.message}`,
      );
  });
  return true;
};

const saveImageStorage = async (
  userId: string,
  images: string[],
  postId: string,
): Promise<void> => {
  const postStoragePath = `house/${userId}/${postId}`;
  const tempStoragePath = `house/${userId}/temporary`;
  const moved = await moveImageStorage(
    images,
    tempStoragePath,
    postStoragePath,
  );
  if (moved) {
    const removeList = await getStorageImage(tempStoragePath);
    if (removeList) await removeStorageFile(removeList, tempStoragePath);
  }
};

// house data 생성 | 수정 | 삭제 hooks
export const useHouseRegist = () => {
  const navigate = useNavigate();
  const { mutate: registHouse, isPending: isRegistHouse } = useMutation({
    mutationFn: async (houseData: HouseFormType) => {
      const { data: insertedData, error } = await supabase
        .from('house')
        .insert(houseData)
        .select('id');

      if (error) throw new Error(`houseUploadError: ${error.message}`);
      const houseId = insertedData[0].id;
      return houseId;
    },
    onMutate: () => createToast('uploadHousePost', '게시글 업로드 중...'),
    onError: error =>
      errorToast(
        'uploadHousePost',
        `게시글 업로드에 실패했습니다.: ${error.message}`,
      ),
    onSuccess: async (houseId, variables) => {
      const { user_id, house_img, representative_img, temporary } = variables;
      if (representative_img !== '') {
        const images = [representative_img, ...house_img];
        await saveImageStorage(user_id, images, houseId);
      }
      successToast('uploadHousePost', '게시글이 저장되었습니다.');
      if (temporary === 1) navigate(routePaths.houseDetail(houseId));
      else navigate(routePaths.house);
    },
  });
  return { registHouse, isRegistHouse };
};

export const useHouseUpdate = () => {
  const navigate = useNavigate();
  const { mutate: updateHouse, isPending: isUpdateHouse } = useMutation({
    mutationFn: async ({
      houseData,
      houseId,
    }: {
      houseData: HouseFormType;
      houseId: string;
    }) => {
      const { data, error } = await supabase
        .from('house')
        .update(houseData)
        .eq('id', houseId)
        .select();

      if (error)
        throw new Error(`게시글 업데이트에 실패했습니다.: ${error.message}`);
      return data;
    },
    onMutate: async ({
      houseData,
      houseId,
    }: {
      houseData: HouseFormType;
      houseId: string;
    }) => {
      const toastId = createToast('updateHouse', '게시글 업데이트 중...', {
        autoClose: false,
      });
      try {
        const postStoragePath = `house/${houseData.user_id}/${houseId}`;
        const tempStoragePath = `house/${houseData.user_id}/temporary`;
        const imageList = await getStorageImage(postStoragePath);
        if (imageList) {
          const postImages = imageList.map(imgObj => imgObj.name);
          const moved = await moveImageStorage(
            postImages,
            postStoragePath,
            tempStoragePath,
          );
          if (moved) removeToast(toastId as string);
        }
        return toastId;
      } catch (error) {
        errorToast(
          toastId as string,
          '게시글 수정 중 문제가 생겼습니다. 고객센터에 문의해주세요.',
        );
      }
    },
    onError: error => {
      errorToast(
        'updateHouse',
        `게시글 업데이트 중 문제가 생겼습니다.: ${error.message}`,
      );
    },
    onSuccess: async (_, { houseData, houseId }, toastId) => {
      if (houseData) {
        const { user_id, house_img, representative_img } = houseData;
        const images = [representative_img, ...house_img];
        await saveImageStorage(user_id, images, houseId);
        removeToast(toastId as string);
        successToast('uploadHousePost', '게시글이 업데이트되었습니다.');
        navigate(routePaths.houseDetail(houseId));
      }
    },
  });
  return { updateHouse, isUpdateHouse };
};

// Update user profile
export const useUserProfileUpdate = () => {
  const { mutate: updateUserProfile } = useMutation({
    mutationFn: async ({
      dbName,
      data,
      userId,
    }: {
      dbName: string;
      data: UserLifeStyleType | UserMateStyleType;
      userId: string;
    }) => {
      const { error } = await supabase
        .from(dbName)
        .update(data)
        .eq('id', userId);
      if (error) throw new Error(`Profile update error: ${error.message}`);
    },
    onMutate: () => createToast('updateProfile', '프로필 수정 중'),
    onError: error => {
      console.error('Update profile error:', error);
      errorToast('updateProfile', error.message);
    },
    onSuccess: () => successToast('updateProfile', '프로필이 수정되었습니다.'),
  });
  return { updateUserProfile };
};

export const useDeleteHousePost = () => {
  const { mutate: deleteHousePost } = useMutation({
    mutationFn: async (houseId: string) => {
      const { error } = await supabase.from('house').delete().eq('id', houseId);
      if (error) {
        throw new Error(error.message);
      }
    },
    onMutate: () => createToast('deletePost', '임시저장된 글 삭제 중...'),
    onError: () =>
      errorToast('deletePost', '임시저장된 글 삭제에 실패했습니다.'),
    onSuccess: () =>
      successToast('deletePost', '임시저장된 글이 삭제되었습니다.'),
  });
  return { deleteHousePost };
};

// Check temporary post
export const fetchTemporaryHouseId = async (
  userId: string,
): Promise<{ id: string } | null> => {
  const TEMPORARY = 0;
  const { data, error } = await supabase
    .from('house')
    .select('id')
    .match({ user_id: userId, temporary: TEMPORARY });

  if (error)
    throw new Error(`임시저장된 글 확인에 실패했습니다.: ${error.message}`);

  if (!data || data.length === 0) {
    return null;
  }
  return { id: data[0].id };
};

// houseList hooks
type HouseListQueryKeyType = ReturnType<typeof HOUSE_KEYS.HOUSE_LIST>;

const fetchHouseList = async ({
  pageParam = 0,
  queryKey,
  pageSize = 10,
}: QueryFunctionContext<HouseListQueryKeyType, number> & {
  pageSize?: number;
}) => {
  const HOUSE_PER_PAGE = pageSize;
  const [, , filterState] = queryKey;
  const filterPayload = filterState as HouseListFilterType;

  let fetchHouseListQuery = supabase
    .from('house')
    .select(
      `id,
      house_type,
      rental_type,
      region,
      district,
      term,
      deposit_price,
      monthly_price,
      representative_img,
      house_appeal,
      user_id,
      user_mate_style!inner(mate_gender, mate_number)`, // ! supabase default join은 left join으로 inner로 명시해주어야 inner join이 가능
    )
    .eq('temporary', 1)
    .order('created_at', { ascending: false });

  const filterCondition: {
    [K in keyof HouseListFilterType]: {
      filterCallback: (
        query: typeof fetchHouseListQuery,
        filterValue: HouseListFilterType[K],
      ) => typeof fetchHouseListQuery;
    };
  } = {
    house_type: {
      filterCallback: (query, houseType) => {
        if (houseType !== undefined && houseType !== null) {
          query.eq('house_type', houseType);
        }

        return query;
      },
    },
    rental_type: {
      filterCallback: (query, rentalType) => {
        if (rentalType !== undefined && rentalType !== null) {
          query.eq('rental_type', rentalType);
        }

        return query;
      },
    },
    regions: {
      filterCallback: (query, regions) => {
        if (regions !== undefined && regions !== null) {
          query.in('address', regions);
        }

        return query;
      },
    },
    term: {
      filterCallback: (query, term) => {
        let copyQuery = query;

        if (term !== undefined && term !== null) {
          const [termStart, termEnd] = term;
          if (termStart >= 0) {
            copyQuery = copyQuery.filter('term->>0', 'gte', termStart);
          }
          if (termEnd <= 24) {
            copyQuery = copyQuery.filter('term->>1', 'lte', termEnd);
          }
        }

        return copyQuery;
      },
    },
    deposit_price: {
      filterCallback: (query, depositPrice) => {
        let copyQuery = query;

        if (depositPrice !== undefined && depositPrice !== null) {
          if (depositPrice[0] >= 0) {
            copyQuery = copyQuery.gte('deposit_price', depositPrice[0]);
          }
          if (depositPrice[1] <= 10000) {
            copyQuery = copyQuery.lte('deposit_price', depositPrice[1]);
          }
        }

        return copyQuery;
      },
    },
    monthly_rental_price: {
      filterCallback: (query, monthlyRentalPrice) => {
        let copyQuery = query;

        if (monthlyRentalPrice !== undefined && monthlyRentalPrice !== null) {
          if (monthlyRentalPrice[0] >= 0) {
            copyQuery = copyQuery.gte('monthly_price', monthlyRentalPrice[0]);
          }
          if (monthlyRentalPrice[1] <= 500) {
            copyQuery = copyQuery.lte('monthly_price', monthlyRentalPrice[1]);
          }
        }

        return copyQuery;
      },
    },
    mate_gender: {
      filterCallback: (query, mateGender) => {
        if (mateGender !== undefined && mateGender !== null) {
          query.eq('user_mate_style.mate_gender', mateGender);
        }

        return query;
      },
    },
    mate_number: {
      filterCallback: (query, mateNumber) => {
        if (mateNumber !== undefined && mateNumber !== null) {
          query.eq('user_mate_style.mate_gender', mateNumber);
        }

        return query;
      },
    },
  };

  (Object.keys(filterPayload) as Keys<typeof filterPayload>).forEach(
    filterType => {
      if (
        filterPayload[filterType] !== undefined &&
        filterPayload[filterType] !== null
      ) {
        fetchHouseListQuery = filterCondition[filterType]?.filterCallback(
          fetchHouseListQuery,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          filterPayload[filterType] as any,
        ) as typeof fetchHouseListQuery;
      }
    },
  );

  const { data, error } = await fetchHouseListQuery.range(
    pageParam * HOUSE_PER_PAGE,
    (pageParam + 1) * HOUSE_PER_PAGE - 1,
  );

  if (error) throw new Error(error.message);

  return {
    data,
    nextPage: pageParam + 1,
    hasMore: data.length > 0 && data.length % HOUSE_PER_PAGE === 0,
  };
};

export const useInfiniteHouseList = (
  filterPayload: HouseListFilterType,
  pageSize: number = 10,
) =>
  useInfiniteQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: HOUSE_KEYS.HOUSE_LIST(filterPayload),
    queryFn: queryFunctionContext =>
      fetchHouseList({ ...queryFunctionContext, pageSize }),
    initialPageParam: 0,
    getNextPageParam: lastPage =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
  });
