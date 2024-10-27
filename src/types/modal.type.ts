import { SignUpProfileType } from '@/types/signUp.type';

export type ModalType =
  | 'Alert'
  | 'Confirm'
  | 'Profile'
  | 'RoommateApplicationStatus'
  | 'RoommateApply'
  | 'Continue'
  | 'ProfileModify'
  | 'HouseListFilter';

export type ModalStateByType = {
  Alert: AlertModalState;
  Confirm: ConfirmModalState;
  Profile: ProfileModalState;
  RoommateApplicationStatus: RoommateApplicationState;
  RoommateApply: RoommateApplyState;
  Continue: ContinuationModalState;
  ProfileModify: ProfileModifyModalState;
  HouseListFilter: HouseListFilterModalState;
};

export type AlertModalState = {
  isOpen: boolean;
  type: 'Alert';
  title: string;
  message: string;
  buttonContent: string;
  onClickConfirm: () => void;
};

export type ConfirmModalState = {
  isOpen: boolean;
  type: 'Confirm';
  title: string;
  message: string;
  onClickCancel: () => void;
  onClickConfirm: () => void;
  confirmButtonContent: string;
  cancelButtonContent: string;
};

export type ProfileModalState = {
  isOpen: boolean;
  type: 'Profile';
  onClickChat: () => void;
  userId: string;
  userName: string;
  profileMessage: string;
  profileImage: string;
  buttonContent: string;
};

export type RoommateApplicationState = {
  isOpen: boolean;
  type: 'RoommateApplicationStatus';
  profileImage: string;
  userName: string;
  roommateAppeals: string[];
  introduceContent: string;
  onClickChat: () => void;
  onClickCancel: () => void;
  onClickConfirm: () => void;
};

export type RoommateApplyState = {
  isOpen: boolean;
  type: 'RoommateApply';
  introduceContent: string;
  roommateAppeals: string[];
  onClickCancel: () => void;
  onClickConfirm: () => void;
};

export type ContinuationModalState = {
  isOpen: boolean;
  type: 'Continue';
  title: string;
  message: string;
  onClickCancel: () => void;
  onClickContinue: () => void;
  cancelButtonContent: string;
  continueButtonContent: string;
};

export type ProfileModifyModalState = {
  isOpen: boolean;
  type: 'ProfileModify';
  userInfo: SignUpProfileType | null;
};

export type HouseListFilterModalState = {
  isOpen: boolean;
  type: 'HouseListFilter';
};
