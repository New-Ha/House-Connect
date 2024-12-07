import { useRecoilValue } from 'recoil';

import Avatar from '@/components/atoms/Avatar';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import MessageBox from '@/components/templates/chats/MessageBox';
import cn from '@/libs/cn';
import { UserAtom } from '@/stores/auth.store';
import { Tables } from '@/types/supabase';
import { formatDateByCountry } from '@/libs/dateUtils';
import { UserMessageType } from '@/types/chat.type';
import useModal from '@/hooks/useModal';
import { ProfileModalState } from '@/types/modal.type';

type UserMessageProps = {
  userMessage: UserMessageType;
  chatPartnerInfo: Tables<'user'>;
};

// 유저에 따른 chats UI Component
export default function UserMessageBox({
  userMessage,
  chatPartnerInfo,
}: UserMessageProps) {
  const currentUserInfo = useRecoilValue(UserAtom);
  const { userId, messages, lastCreatedAt } = userMessage;
  const { setModalState: setProfileModal, closeModal: closeProfileModal } =
    useModal('Profile');
  const isCurrentUser = userMessage.userId === currentUserInfo?.id;

  const userProfileModalContext: ProfileModalState = {
    isOpen: true,
    buttonContent: '1:1 채팅',
    type: 'Profile',
    userId: isCurrentUser ? currentUserInfo?.id ?? '' : chatPartnerInfo.id,
    userName: isCurrentUser
      ? currentUserInfo?.nickname ?? ''
      : chatPartnerInfo.nickname ?? '',
    profileMessage: '안녕하세요!!!',
    profileImage: isCurrentUser
      ? currentUserInfo?.avatar ?? ''
      : chatPartnerInfo.avatar ?? '',
    onClickChat: () => {
      closeProfileModal();
    },
  };

  return messages.length > 0 ? (
    <Container.FlexRow
      className={cn(
        'gap-4',
        currentUserInfo?.id !== userId && 'flex-row-reverse',
      )}
    >
      <Avatar.XS
        src={
          (isCurrentUser ? currentUserInfo.avatar : chatPartnerInfo.avatar) ||
          ''
        }
        onClick={() => setProfileModal(userProfileModalContext)}
      />
      <Container.FlexCol
        className={cn(
          'gap-[0.625rem]',
          currentUserInfo?.id !== userId && 'items-end',
        )}
      >
        {messages.map((eachMessage, index) =>
          index !== messages.length - 1 ? (
            <MessageBox
              isChatPartner={currentUserInfo?.id !== userId}
              key={eachMessage.id}
            >
              {eachMessage.message}
            </MessageBox>
          ) : (
            // 마지막 메세지일 시 시간 표시
            <Container.FlexRow
              key={eachMessage.id}
              className={cn(
                'items-end gap-2',
                currentUserInfo?.id !== userId && 'flex-row-reverse',
              )}
            >
              <MessageBox
                isChatPartner={currentUserInfo?.id !== userId}
                key={eachMessage.id}
              >
                {eachMessage.message}
              </MessageBox>
              <Typography.Span2 className="translate-y-[-0.125rem] text-brown2">
                {formatDateByCountry({
                  date: lastCreatedAt,
                  time: true,
                })}
              </Typography.Span2>
            </Container.FlexRow>
          ),
        )}
      </Container.FlexCol>
    </Container.FlexRow>
  ) : null; // 메세지가 없을 경우
}
