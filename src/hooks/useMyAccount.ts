import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { routePaths } from '@/constants/route';
import { supabase } from '@/libs/supabaseClient';
import { AccountFormType } from '@/types/account.type';
import { createToast, errorToast, successToast } from '@/libs/toast';
import { SessionAtom, UserAtom } from '@/stores/auth.store';

export const useMyAccountUpdate = () => {
  const navigate = useNavigate();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: async (
      payload: AccountFormType & { id: string },
    ) => {
      let avatarUploadResult = '';
      if (payload.avatar) {
        const result = await supabase.storage
          .from('images')
          .upload(`avatar/${payload.id}/avatar`, payload.avatar, {
            cacheControl: '300',
            upsert: true,
          });
        if (result.data?.path)
          avatarUploadResult = `images/${result.data.path}`;
      }
      const updateData = {};
      const { avatar, ...others } = payload;
      if (avatarUploadResult)
        Object.assign(updateData, {
          avatar_url: avatarUploadResult,
        });
      Object.assign(updateData, { ...others });
      await supabase.auth.updateUser({ data: updateData });
    },
    onMutate: () =>
      createToast('update-user', '유저의 정보를 업데이트 중 입니다...'),
    onSuccess: () => {
      successToast('update-user', '유저의 정보를 업데이트 했습니다.');
      navigate(routePaths.myActivity);
    },
    onError: () =>
      errorToast('update-user', '유저의 정보를 업데이트 하지 못했습니다.'),
  });
  return { updateUser, isUpdating };
};

export const useDeleteMyAccount = () => {
  const navigate = useNavigate();
  const setSession = useSetRecoilState(SessionAtom);
  const setUser = useSetRecoilState(UserAtom);
  const { mutate: deleteAccount, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('user').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onMutate: () => createToast('delete-user', '계정을 삭제 중입니다...'),
    onSuccess: async () => {
      // ! 이미 제거된 유저로 Supabase.auth.signOut이 불가하여 수동으로 제거
      successToast('delete-user', '계정 삭제를 완료했습니다.');
      localStorage.removeItem(`sb-${import.meta.env.VITE_PROJECT_ID}-auth-token`);
      setSession(null);
      setUser(null);
      navigate(routePaths.signIn);
    },
    onError: () => {
      errorToast('delete-user', '계정 삭제를 실패했습니다.');
    },
  });
  return { deleteAccount, isDeleting };
};
