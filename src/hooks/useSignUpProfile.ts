import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { routePaths } from '@/constants/route';
import { supabase } from '@/libs/supabaseClient';
import { SignUpProfileType } from '@/types/signUp.type';
import { createToast, errorToast, successToast } from '@/libs/toast';
import { UserAtom } from '@/stores/auth.store';

class CustomSupabaseError extends Error {
  constructor(
    public message: string,
    public code: number,
    public hint: string,
    public details: string,
  ) {
    super(message);
    this.name = 'SupabaseError';
    this.code = code;
    this.hint = hint;
    this.details = details;
  }
}

const useSignUpProfile = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(UserAtom);
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: SignUpProfileType) => {
      if (!user) throw new Error('Authentication Required!');
      const {
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
        id: user.id,
        smoking: smoking as boolean,
        pet: pet as number,
        appeals,
      };
      const userLookingHouse = {
        id: user.id,
        type: type as number,
        rental_type: rental_type as number,
        regions,
        term,
        deposit_price,
        monthly_rental_price,
      };
      const userMateStyle = {
        id: user.id,
        mate_gender: mate_gender as number,
        mate_number: mate_number as number,
        mate_appeals,
      };

      const responses = await Promise.all([
        supabase.from('user_lifestyle').upsert([userLifeStyle]),
        supabase.from('user_looking_house').upsert([userLookingHouse]),
        supabase.from('user_mate_style').upsert([userMateStyle]),
        supabase
          .from('user')
          .update({ is_set_profile: true })
          .eq('id', user.id),
      ]);

      responses.forEach(response => {
        if (response.error) {
          const { message, hint, details } = response.error;
          const supabaseError = new CustomSupabaseError(
            message,
            response.status,
            hint,
            details,
          );

          throw supabaseError;
        }
      });

      return responses;
    },
    onMutate: () =>
      createToast('signUpProfile', '프로필 설정을 마무리 하고 있습니다...'),
    onError: error => {
      const supabaseError = error as CustomSupabaseError;
      console.error(
        `#️⃣ status: ${supabaseError.code}\n❌ message: ${supabaseError.message}`,
      );
      errorToast('signUpProfile', '프로필 설정에 실패하였습니다.');
    },
    onSuccess: () => {
      successToast('signUpProfile', '프로필 설정을 완료했습니다.');
      navigate(routePaths.signUpProfileOutro);
    },
  });
  return { mutate, isPending };
};

export default useSignUpProfile;
