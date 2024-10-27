import { useRecoilValue } from 'recoil';

import AlertModal from '@/components/organisms/modals/AlertModal';
import ConfirmModal from '@/components/organisms/modals/ConfirmModal';
import ProfileModal from '@/components/organisms/modals/ProfileModal';
import RoomMateApplicationStatus from '../organisms/modals/RoommateApplicationStatusModal';
import { GlobalModalAtom } from '@/stores/globalModal.store';
import RoommateApplyModal from '../organisms/modals/RoommateApplyModal';
import ContinuationModal from '@/components/organisms/modals/ContinuationModal';
import ProfileModifyModal from '@/components/organisms/modals/ProfileModifyModal';
import HouseListFilterModal from '@/components/organisms/modals/HouseListFilterModal';

export default function GlobalModal() {
  const modalType = useRecoilValue(GlobalModalAtom);

  // eslint-disable-next-line react-refresh/only-export-components
  const TypesOfModals = {
    Alert: AlertModal,
    Confirm: ConfirmModal,
    Profile: ProfileModal,
    RoommateApplicationStatus: RoomMateApplicationStatus,
    RoommateApply: RoommateApplyModal,
    Continue: ContinuationModal,
    ProfileModify: ProfileModifyModal,
    HouseListFilter: HouseListFilterModal,
  };

  const SelectedModal = TypesOfModals[modalType];

  return <SelectedModal />;
}
