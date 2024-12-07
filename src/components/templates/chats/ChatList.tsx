import { NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { routePaths } from '@/constants/route';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import cn from '@/libs/cn';
import Avatar from '@/components/atoms/Avatar';
import { UserAtom } from '@/stores/auth.store';
import { formatDateByCountry, isToday } from '@/libs/dateUtils';
import { useUpdateLastRead } from '@/hooks/useChat';
import NewChatCountCircle from '@/components/templates/chats/NewChatCountCircle';
import { Tables } from '@/types/supabase';

type ChatListProps = {
  chatRoomListPageData: {
    chatRoomId: string;
    lastMessage: string;
    lastMessageDate: string;
    userIds: string[];
    newChatCount: number;
    chatPartnerInfo: Tables<'user'>;
  }[];
  totalNewChatsCount: number;
  className?: string;
};

export default function ChatList({
  chatRoomListPageData,
  totalNewChatsCount,
  className,
}: ChatListProps) {
  const userInfo = useRecoilValue(UserAtom);
  const lastReadMutation = useUpdateLastRead();

  return (
    <Container.FlexCol className={cn('w-full max-w-full border-0', className)}>
      {/* chatList header */}
      <Container.FlexRow className="sticky left-0 top-0 min-h-[4.875rem] items-center justify-between gap-2 bg-brown6 px-5">
        <Typography.SubTitle1 className="text-brown">채팅</Typography.SubTitle1>
        <NewChatCountCircle
          content={totalNewChatsCount}
          containerStyle="self-center"
        />
      </Container.FlexRow>
      {/* 친구 대화 목록 전체 container */}
      {userInfo ? (
        <Container.FlexCol className="gap-2 overflow-y-auto bg-bg p-2">
          {chatRoomListPageData.map(
            ({
              chatPartnerInfo: { id: chatPartnerId, avatar, nickname },
              chatRoomId,
              lastMessage,
              lastMessageDate,
              newChatCount,
            }) => (
              <NavLink
                key={chatRoomId}
                to={routePaths.chatRoom(chatRoomId)}
                state={{ chatPartnerId }}
                onClick={() => {
                  lastReadMutation.mutate({ userId: userInfo.id, chatRoomId });
                }}
                className={({ isActive }) =>
                  cn(
                    'flex items-start gap-4 rounded-xl p-3 hover:bg-brown6',
                    isActive ? 'bg-brown7' : 'bg-bg',
                  )
                }
              >
                {/* shrink를 0으로 설정하지 않으면 이미지가 깨짐 */}
                <Avatar.M src={avatar ?? ''} />
                <Container.FlexCol className="w-full space-y-[0.25rem]">
                  <Container.FlexRow className="items-center justify-between">
                    <Typography.Span1 className="font-bold leading-150 text-brown">
                      {nickname}
                    </Typography.Span1>
                    <Typography.Span2 className="font-medium leading-150 text-brown2">
                      {formatDateByCountry({
                        date: new Date(lastMessageDate),
                        time: isToday(new Date(), new Date(lastMessageDate)),
                      })}
                    </Typography.Span2>
                  </Container.FlexRow>
                  <Container.FlexRow className="items-center justify-between ">
                    <Typography.Span2 className="max-w-[12rem] truncate font-medium text-brown2">
                      {lastMessage}
                    </Typography.Span2>
                    <NewChatCountCircle content={newChatCount} />
                  </Container.FlexRow>
                </Container.FlexCol>
              </NavLink>
            ),
          )}
        </Container.FlexCol>
      ) : (
        <h1>Loading chatList</h1>
      )}
    </Container.FlexCol>
  );
}

ChatList.defaultProps = {
  className: '',
};
