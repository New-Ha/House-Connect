import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { zodResolver } from '@hookform/resolvers/zod';

import { SignUpProfileFormType } from '@/types/signUp.type';
import { InputRangeState } from '@/components/molecules/DualInputRange';
import { HouseForm, HouseFormType } from '@/types/house.type';
import { SessionAtom } from '@/stores/auth.store';
import { fetchTemporaryHouseId, useDeleteHousePost } from '@/hooks/useHouse';
import useModal from '@/hooks/useModal';
import { routePaths } from '@/constants/route';
import HouseRegisterEdit from '@/components/templates/house/house-regist/HouseRegisterEdit';
import HouseRegisterForm from '@/components/templates/house/house-regist/HouseRegisterForm';

export type UserLifeStyleType = {
  smoking: SignUpProfileFormType['smoking'];
  pet: SignUpProfileFormType['pet'];
  appeals: SignUpProfileFormType['appeals'];
};

export type UserMateStyleType = {
  mate_gender: SignUpProfileFormType['mate_gender'];
  mate_number: SignUpProfileFormType['mate_number'];
  mate_appeals: SignUpProfileFormType['mate_appeals'];
  prefer_mate_age: InputRangeState;
};

export default function HouseRegister() {
  const navigate = useNavigate();
  const userId = useRecoilState(SessionAtom)[0]?.user.id as string;
  const { houseId } = useParams<{ houseId: string }>();
  const form = useForm<HouseFormType & UserLifeStyleType & UserMateStyleType>({
    resolver: zodResolver(HouseForm),
    mode: 'onChange',
    defaultValues: {
      house_img: [],
      representative_img: '',
      post_title: '',
      region: '지역',
      district: '시, 구',
      house_type: 0,
      rental_type: 1,
      floor: 0,
      house_size: undefined,
      room_num: undefined,
      deposit_price: undefined,
      monthly_price: undefined,
      manage_price: undefined,
      house_appeal: [],
      term: [0, 24],
      describe: undefined,
      bookmark: 0,
      temporary: 0,
      user_id: userId,
      smoking: true,
      pet: 1,
      appeals: [],
      mate_gender: 1,
      mate_number: 1,
      mate_appeals: [],
      prefer_mate_age: [0, 30],
    },
  });

  // Check temporary post
  const { setModalState, closeModal } = useModal('Continue');
  const { deleteHousePost } = useDeleteHousePost();
  useEffect(() => {
    const checkTemporaryHouse = async () => {
      if (!houseId) {
        const result = await fetchTemporaryHouseId(userId);
        if (result) {
          const { id: tempHouseId } = result;
          setModalState({
            isOpen: true,
            type: 'Continue',
            onClickCancel: () => {
              deleteHousePost(tempHouseId);
              closeModal();
            },
            onClickContinue: () => {
              navigate(routePaths.houseEdit(tempHouseId));
              closeModal();
            },
          });
        }
      }
    };
    checkTemporaryHouse();
  }, [userId, houseId, navigate]);

  if (houseId) {
    return <HouseRegisterEdit form={form} houseId={houseId} />;
  }

  return <HouseRegisterForm form={form} />;
}
