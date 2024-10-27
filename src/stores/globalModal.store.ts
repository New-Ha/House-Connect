import { atom, errorSelector, selectorFamily } from 'recoil';

import {
  AlertModalState,
  ConfirmModalState,
  ContinuationModalState,
  HouseListFilterModalState,
  ModalStateByType,
  ModalType,
  ProfileModalState,
  ProfileModifyModalState,
  RoommateApplicationState,
  RoommateApplyState,
} from '@/types/modal.type';

export const GlobalModalAtom = atom<ModalType>({
  key: 'globalModalstate',
  default: 'Alert',
});

export const AlertModalAtom = atom<AlertModalState>({
  key: 'alertModalState',
  default: {
    isOpen: false,
    type: 'Alert',
    title: '',
    message: '',
    buttonContent: '',
    onClickConfirm: () => {},
  },
});

export const ConfirmModalAtom = atom<ConfirmModalState>({
  key: 'confirmModalState',
  default: {
    isOpen: false,
    type: 'Confirm',
    title: '',
    message: '',
    onClickCancel: () => {},
    onClickConfirm: () => {},
    confirmButtonContent: '',
    cancelButtonContent: '',
  },
});

export const ProfileModalAtom = atom<ProfileModalState>({
  key: 'profileModalState',
  default: {
    isOpen: false,
    buttonContent: '',
    type: 'Profile',
    // TODO: userId fetch from supabase
    userId: '',
    userName: '',
    profileMessage: '',
    profileImage: '',
    onClickChat: () => {
      alert('send chat request to user1234!!!');
    },
  },
});
export const RoommateApplicationAtom = atom<RoommateApplicationState>({
  key: 'RoommateApplicationState',
  default: {
    isOpen: false,
    type: 'RoommateApplicationStatus',
    profileImage: '',
    userName: '',
    roommateAppeals: [],
    introduceContent: '',
    onClickChat: () => {
      alert('상대방과의 채팅이 시작합니다!');
    },
    onClickCancel: () => {},
    onClickConfirm: () => {},
  },
});

export const RoommateApplyAtom = atom<RoommateApplyState>({
  key: 'RoommateApplyState',
  default: {
    isOpen: false,
    type: 'RoommateApply',
    introduceContent: '',
    roommateAppeals: [],
    onClickCancel: () => {},
    onClickConfirm: () => {},
  },
});

export const ProfileModifyModalAtom = atom<ProfileModifyModalState>({
  key: 'applyModalState',
  default: {
    isOpen: false,
    type: 'ProfileModify',
    userInfo: null,
  },
});

export const ContinuationModalAtom = atom<ContinuationModalState>({
  key: 'continuationModalState',
  default: {
    isOpen: false,
    type: 'Continue',
    title: '',
    message: '',
    onClickCancel: () => {},
    onClickContinue: () => {},
    cancelButtonContent: '',
    continueButtonContent: '',
  },
});

export const HouseListFilterModalAtom = atom<HouseListFilterModalState>({
  key: 'houseListFilterState',
  default: {
    isOpen: false,
    type: 'HouseListFilter',
  },
});

export const ModalSelector = selectorFamily({
  key: 'modalPropsByType',
  get:
    <P extends ModalType>(modalType: P) =>
    ({ get }) => {
      switch (modalType) {
        case 'Alert':
          return get(AlertModalAtom) as ModalStateByType[P];
        case 'Confirm':
          return get(ConfirmModalAtom) as ModalStateByType[P];
        case 'Profile':
          return get(ProfileModalAtom) as ModalStateByType[P];
        case 'RoommateApplicationStatus':
          return get(RoommateApplicationAtom) as ModalStateByType[P];
        case 'RoommateApply':
          return get(RoommateApplyAtom) as ModalStateByType[P];
        case 'Continue':
          return get(ContinuationModalAtom) as ModalStateByType[P];
        case 'ProfileModify':
          return get(ProfileModifyModalAtom) as ModalStateByType[P];
        case 'HouseListFilter':
          return get(HouseListFilterModalAtom) as ModalStateByType[P];
        default:
          errorSelector('Undefined cannot be a value of ModalType.');
          throw new Error('Undefined cannot be a value of ModalType.');
      }
    },
  set:
    <P extends ModalType>(modalType: P) =>
    ({ set }, newModalState) => {
      switch (modalType) {
        case 'Alert':
          set(AlertModalAtom, newModalState as AlertModalState);
          break;
        case 'Confirm':
          set(ConfirmModalAtom, newModalState as ConfirmModalState);
          break;
        case 'Profile':
          set(ProfileModalAtom, newModalState as ProfileModalState);
          break;
        case 'RoommateApplicationStatus':
          set(
            RoommateApplicationAtom,
            newModalState as RoommateApplicationState,
          );
          break;
        case 'RoommateApply':
          set(RoommateApplyAtom, newModalState as RoommateApplyState);
          break;
        case 'Continue':
          set(ContinuationModalAtom, newModalState as ContinuationModalState);
          break;
        case 'ProfileModify':
          set(ProfileModifyModalAtom, newModalState as ProfileModifyModalState);
          break;
        case 'HouseListFilter':
          set(
            HouseListFilterModalAtom,
            newModalState as HouseListFilterModalState,
          );
          break;
        default:
          // eslint-disable-next-line no-console
          errorSelector(`Received unexpected modal type: ${modalType}`);
          throw new Error(`Received unexpected modal type: ${modalType}`);
      }
    },
});

export default {};
