import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Divider from '@/components/atoms/Divider';
import Typography from '@/components/atoms/Typography';
import IconButton from '@/components/molecules/IconButton';
import { UserType } from '@/types/auth.type';
import {
  rentalTypesInfo,
  genderInfo,
  floorInfo,
} from '@/constants/profileDetailInfo';
import { HouseFormType } from '@/types/house.type';
import { UserAtom } from '@/stores/auth.store';
import copyUrl from '@/libs/copyUrl';
import {
  removeStorage,
  useDeleteHouseDetail,
  useUpdateBookMark,
} from '@/hooks/useHouseDetail';
import {
  UserLifeStyleType,
  UserMateStyleType,
} from '@/components/pages/house/house-regist/HouseRegister';
import ImageCarouselModal from '@/components/templates/house/house-detail/ImageCarouselModal';
import HouseImageTemplate from '@/components/templates/house/house-detail/HouseImageTemplate';
import HouseInfoCard from '@/components/templates/house/house-detail/HouseInfoCard';
import UserInfoCard from '@/components/templates/house/house-detail/UserInfoCard';
import { supabase } from '@/libs/supabaseClient';
import SupabaseCustomError from '@/libs/supabaseCustomError';
import { routePaths } from '@/constants/route';
import cn from '@/libs/cn';

// TODO: house.type HouseData(join된 column도 포함) 필요한 column만 pick해서 가져오기
export type HouseData = Omit<HouseFormType, 'rental_type' | 'floor'> & {
  created_at: string;
  updated_at: string;
  floor: keyof typeof floorInfo;
  user: User;
  user_lifestyle: UserLifeStyleType;
  rental_type: keyof typeof rentalTypesInfo;
  user_mate_style: UserMateStyleType;
};

type User = Pick<UserType, 'id' | 'name' | 'avatar'> & {
  gender: keyof typeof genderInfo;
};

type HouseDetailTemplateProps = {
  houseData: HouseData;
  bookmark: boolean;
  houseId: string;
  setIsLoadingDelaying: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  houseOwner: boolean;
};

export default function HouseDetailTemplate({
  houseData,
  bookmark,
  houseId,
  setIsLoadingDelaying,
  className,
  houseOwner,
}: HouseDetailTemplateProps) {
  const user = useRecoilValue(UserAtom);
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const { updateBookMark, isPending } = useUpdateBookMark();
  const { deleteHouseDetailPage } = useDeleteHouseDetail();

  useEffect(() => {
    if (modal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [modal]);

  const onClickBookMark = () => {
    updateBookMark({
      userId: user?.id as string,
      houseId: houseId as string,
      isBookMark: bookmark,
    });
  };

  const onClickEditBtn = (houseId: string) => {
    navigate(routePaths.houseEdit(houseId));
  };

  const onClickDeleteBtn = () => {
    deleteHouseDetailPage(houseId, {
      onSuccess: () => {
        removeStorage(houseId, user?.id as string);
      },
    });
  };

  const getDataString = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const onClickCreateChat = async () => {
    // * 비 로그인 유저가 chatting을 클릭할 시 loading page 이후 로그인 페이지로 이동시키기 위함
    if (!user) {
      setIsLoadingDelaying(true);
    }

    if (houseData.user_id && user?.id) {
      const {
        data: isChatRoomExist,
        error: isChatRoomExistError,
        status: isChatRoomExistStatus,
      } = await supabase
        .from('chat_room')
        .select('*')
        .containedBy('users', [houseData.user_id, user.id]); // 배열이 'a', 'b'로만 구성되어 있는지 확인

      if (isChatRoomExistError) {
        throw new SupabaseCustomError(
          isChatRoomExistError,
          isChatRoomExistStatus,
        );
      }

      // ! 채팅방이 존재하지 않을 때 -> 중복 채팅방 생성 방지
      if (isChatRoomExist.length === 0) {
        const {
          data: chatRoomData,
          error: chatRoomDataError,
          status: chatRoomDataStatus,
        } = await supabase
          .from('chat_room')
          .insert([
            {
              users: [houseData.user_id, user.id],
              last_message: '',
              last_message_date: JSON.stringify(new Date()),
            },
          ])
          .select();

        if (chatRoomDataError) {
          throw new SupabaseCustomError(chatRoomDataError, chatRoomDataStatus);
        }

        const { error: userChatDataError, status: userChatDataStatus } =
          await supabase
            .from('user_chat')
            .insert([
              {
                last_read: JSON.stringify(new Date()),
                chat_room_id: chatRoomData[0].id,
                user_id: user.id,
              },
              {
                last_read: JSON.stringify(new Date()),
                chat_room_id: chatRoomData[0].id,
                user_id: houseData.user_id,
              },
            ])
            .select('*');

        if (userChatDataError) {
          throw new SupabaseCustomError(userChatDataError, userChatDataStatus);
        }

        navigate(routePaths.chatRoom(chatRoomData[0].id), {
          state: { chatPartnerId: houseData.user_id },
        });
      } else {
        navigate(routePaths.chatRoom(isChatRoomExist[0].id), {
          state: { chatPartnerId: houseData.user_id },
        });
      }
    }
  };

  return (
    <Container.FlexCol className={cn('gap-8', className)}>
      {modal && (
        <ImageCarouselModal
          houseId={houseId}
          representativeImg={houseData.representative_img}
          houseImg={houseData.house_img}
          userId={houseData.user_id}
          setModal={setModal}
        />
      )}
      <HouseImageTemplate
        houseId={houseId}
        representativeImg={houseData.representative_img}
        houseImg={houseData.house_img}
        userId={houseData.user_id}
        setModal={setModal}
      />
      <Container.FlexCol>
        <Container.FlexCol className="gap-[3.25rem]">
          <Container.FlexCol className="gap-4">
            <Container.FlexRow className="items-center">
              <Typography.Head3 className="pr-3 text-[1.8461538462rem] leading-[120%] text-brown tablet:text-Head2">
                {houseData && houseData.post_title}
              </Typography.Head3>
              {houseOwner && (
                <>
                  <Button.Ghost
                    className="hidden p-[0.5625rem] text-brown s-tablet:flex"
                    onClick={() => onClickEditBtn(houseId)}
                  >
                    <Typography.P3>수정</Typography.P3>
                  </Button.Ghost>
                  <Button.Ghost
                    className="hidden p-[0.5625rem] text-brown s-tablet:flex"
                    onClick={onClickDeleteBtn}
                  >
                    <Typography.P3>삭제</Typography.P3>
                  </Button.Ghost>
                </>
              )}
            </Container.FlexRow>
            <Container.FlexRow className="gap-3">
              <Typography.P2 className="leading-[130%] text-brown1">
                {`최근 등록일 ${getDataString(houseData.created_at)}`}
              </Typography.P2>
              <Divider.Row className="border-l-0" />
              <Typography.P2 className="leading-[130%] text-brown1">
                {`최근 수정일 ${getDataString(houseData.updated_at)}`}
              </Typography.P2>
            </Container.FlexRow>
          </Container.FlexCol>
          <Container.FlexRow className="justify-between">
            <Container.FlexRow className="flex-wrap gap-3">
              {!houseOwner && (
                <Button.Outline
                  onClick={onClickCreateChat}
                  className="rounded-lg bg-white px-[2rem] py-[1.25rem] text-brown "
                >
                  <Typography.P3 className="tablet:text-P1">
                    메시지 보내기
                  </Typography.P3>
                </Button.Outline>
              )}
            </Container.FlexRow>
            <Container.FlexRow className="gap-5 tablet:gap-7 laptop:gap-8">
              <Container.FlexCol className="items-center justify-center gap-3">
                <IconButton.Ghost
                  iconType={bookmark ? 'fill-heart' : 'heart'}
                  onClick={onClickBookMark}
                  disabled={isPending}
                />
                <Typography.P3 className="text-brown1 tablet:text-P2">
                  {houseData.bookmark}
                </Typography.P3>
              </Container.FlexCol>
              <Container.FlexCol className="items-center justify-center gap-3">
                <IconButton.Ghost iconType="share" onClick={copyUrl} />
                <Typography.P3 className="text-brown1 tablet:text-P2">
                  공유
                </Typography.P3>
              </Container.FlexCol>
            </Container.FlexRow>
          </Container.FlexRow>
        </Container.FlexCol>
        <Divider.Col className="my-8 border-t-0 laptop:my-11 " />

        <Container.Grid className="grid-cols-1 gap-20 text-brown laptop:grid-cols-2 laptop:gap-6">
          <UserInfoCard houseData={houseData} />
          <HouseInfoCard houseData={houseData} />
        </Container.Grid>

        <Container.FlexCol className="gap-7 py-[3.25rem] text-brown laptop:py-[4.5rem] ">
          <Typography.SubTitle1>상세설명</Typography.SubTitle1>
          <Container.FlexCol className="rounded-lg bg-brown6 p-6">
            <pre className="whitespace-pre-wrap font-Noto-Sans-KR text-P2 leading-6">
              {houseData.describe}
            </pre>
          </Container.FlexCol>
        </Container.FlexCol>
        <Divider.Row />
      </Container.FlexCol>
    </Container.FlexCol>
  );
}

HouseDetailTemplate.defaultProps = {
  className: '',
};
