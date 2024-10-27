/* eslint-disable react/require-default-props */
import { MouseEvent, ReactNode } from 'react';
import { useResetRecoilState } from 'recoil';

import Container from '@/components/atoms/Container';
import { ModalType } from '@/types/modal.type';
import { ModalSelector } from '@/stores/globalModal.store';
import cn from '@/libs/cn';

type ModalContainerType = {
  className?: string;
  children: ReactNode;
  modalType?: ModalType;
  onClickClose?: () => void;
};

export default function ModalBackdrop({
  className,
  children,
  modalType,
  onClickClose,
}: ModalContainerType) {
  const resetModalState = useResetRecoilState(
    ModalSelector(modalType as ModalType),
  );

  const onClickOutsideCloseModal = ({
    currentTarget,
    target,
  }: MouseEvent<HTMLDivElement>) => {
    if (currentTarget === target) {
      if (onClickClose) onClickClose();
      else resetModalState();
    }
  };

  return (
    <Container.FlexRow
      onClick={onClickOutsideCloseModal}
      className={cn(
        'fixed left-0 top-0 z-50 h-[100vh] w-[100vw] cursor-pointer items-center justify-center px-6 bg-[#6D6D6D]/50',
        className,
      )}
    >
      {children}
    </Container.FlexRow>
  );
}
