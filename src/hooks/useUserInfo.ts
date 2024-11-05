import { queryOptions, useMutation } from '@tanstack/react-query';

import { supabase } from '@/libs/supabaseClient';
import { UserType } from '@/types/auth.type';
import { RegionUnion, SignUpProfileType } from '@/types/signUp.type';
import { createToast, errorToast, successToast } from '@/libs/toast';
import useModal from '@/hooks/useModal';
import USER_KEYS from '@/constants/queryKeys/user';
import SupabaseCustomError from '@/libs/supabaseCustomError';

export type UserInfoType = {
  avatar: string;
  name: string;
  nickname: string;
  gender: 1 | 2;
  user_lifestyle: UserLifeStyleType;
  user_looking_house: UserLookingHouseType;
  user_mate_style: UserMateStyleType;
};

type UserLifeStyleType = {
  pet: 0 | 1 | 2;
  appeals: string[];
  smoking: boolean;
};

type UserLookingHouseType = {
  term: [number, number];
  type: 0 | 1 | 2 | 3;
  rental_type: 0 | 1 | 2;
  deposit_price: [number, number];
  monthly_rental_price: [number, number];
  regions: RegionUnion[];
};

type UserMateStyleType = {
  mate_gender: 0 | 1 | 2;
  mate_number: 0 | 1 | 2 | 3;
  mate_appeals: string[];
  prefer_mate_age: [number, number];
};

export const userInfoQuery = (user: UserType | null) =>
  queryOptions({
    queryKey: USER_KEYS.USER_INFO(user?.id),
    queryFn: async () => {
      const { data, error, status } = await supabase
        .from('user')
        .select(
          'avatar, name, nickname,gender, user_lifestyle(appeals, pet, smoking), user_looking_house(deposit_price, monthly_rental_price, regions, rental_type, term, type), user_mate_style(mate_gender, mate_number, mate_appeals, prefer_mate_age)',
        )
        .eq('id', user?.id ?? '')
        .single();

      if (error) {
        throw new SupabaseCustomError(error, status);
      }

      return data;
    },
    enabled: !!user,
  });

export const useUpdateProfile = () => {
  const { closeModal: closeProfileModifyModal } = useModal('ProfileModify');

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (payload: SignUpProfileType & { id: string }) => {
      const {
        id,
        smoking,
        pet,
        appeals,
        mate_appeals,
        mate_number,
        mate_gender,
        monthly_rental_price,
        deposit_price,
        rental_type,
        type,
        term,
        regions,
      } = payload;
      const userLifeStyle = {
        smoking,
        pet,
        appeals,
      };
      const userMateStyle = {
        mate_gender,
        mate_number,
        mate_appeals,
      };
      const userLookingHouse = {
        type,
        rental_type,
        monthly_rental_price,
        deposit_price,
        term,
        regions,
      };

      const response = await Promise.all([
        supabase.from('user_lifestyle').update(userLifeStyle).eq('id', id),
        supabase
          .from('user_looking_house')
          .update(userLookingHouse)
          .eq('id', id),
        supabase.from('user_mate_style').update(userMateStyle).eq('id', id),
      ]);
      response.forEach(value => {
        if (value.error) throw new Error(value.error.message);
      });
    },
    onMutate: () =>
      createToast('update-user-profile', '유저의 정보를 업데이트 중입니다...'),
    onSuccess: () => {
      successToast('update-user-profile', '유저의 정보를 업데이트했습니다.');
      closeProfileModifyModal();
    },
    onError: () =>
      errorToast('update-user-profile', '유저 정보 업데이트에 실패했습니다.'),
  });
  return { updateProfile, isPending };
};
