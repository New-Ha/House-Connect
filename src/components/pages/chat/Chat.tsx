import { Outlet, useLocation, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

import Container from '@/components/atoms/Container';
import { ChatList } from '@/components/templates/chats';
import { UserAtom } from '@/stores/auth.store';
import {
  useChatRoomListPageData,
  useOpenChatChannel,
  useUpdateLastRead,
} from '@/hooks/useChat';
import { MessageType } from '@/types/chat.type';
import Typography from '@/components/atoms/Typography';
import { CHAT_KEYS } from '@/constants/queryKeys';
import Loading from '@/components/pages/maintenance/Loading';
import cn from '@/libs/cn';
import { Tables } from '@/types/supabase';

export default function Chat() {
  const userInfo = useRecoilValue(UserAtom);
  const location = useLocation();
  const {
    chatRoomListPageData,
    totalNewChatsCount,
    isLoading: isLoadingPageData,
  } = useChatRoomListPageData(userInfo?.id ?? '')!;
  const lastReadMutation = useUpdateLastRead();
  const params = useParams<{ chatRoomId: string }>();
  const chatRoomId = params.chatRoomId as string;
  const queryClient = useQueryClient();

  const isChatTopRoute = /^\/chat\/?$/.test(location.pathname);
  const isChatRoomRoute = /^\/chat\/[a-zA-Z0-9_-]+$/.test(location.pathname);

  useOpenChatChannel<MessageType>({
    channelName: `chatRoomList`,
    realtimeEventFilters: [
      {
        filterOption: {
          event: '*',
          schema: 'public',
          table: 'messages',
        },
        callbackFn: (
          payload: RealtimePostgresChangesPayload<Tables<'messages'>>,
        ) => {
          // * type guard
          if ('chat_room_id' in payload.new) {
            const { chat_room_id } = payload.new;

            if (isChatRoomRoute && chatRoomId === chat_room_id) {
              // * 상대와 대화 중일 때 상대로부터 온 메세지를 읽음처리
              const lastReadDate = JSON.stringify(new Date());

              lastReadMutation.mutate({
                userId: userInfo?.id as string,
                chatRoomId,
                lastReadDate,
              });
            }
          }

          queryClient.invalidateQueries({ queryKey: CHAT_KEYS.ALL });
        },
      },
    ],
    useEffectDependencies: [queryClient, chatRoomId],
  });

  if (isLoadingPageData)
    return <Loading text="Loading Chats..." textStyle="tracking-widest" />;

  return (
    <Container.FlexRow className="min-h-full w-full">
      <ChatList
        chatRoomListPageData={chatRoomListPageData}
        totalNewChatsCount={totalNewChatsCount}
        className={cn(
          'laptop:border-r-0.5 laptop:border-r-brown3',
          isChatTopRoute && 'laptop:max-w-[21.75rem]',
          isChatRoomRoute && 'hidden laptop:max-w-[21.75rem] laptop:flex',
        )}
      />
      {isChatTopRoute ? (
        <Container.FlexRow className="hidden size-full items-center justify-center text-brown1 laptop:flex">
          <Typography.P3>대화를 시작할 채팅방을 선택해주세요</Typography.P3>
        </Container.FlexRow>
      ) : (
        <Outlet />
      )}
    </Container.FlexRow>
  );
}
