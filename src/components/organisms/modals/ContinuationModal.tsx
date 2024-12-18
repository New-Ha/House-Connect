import { useRecoilValue } from 'recoil';

import { ContinuationModalAtom } from '@/stores/globalModal.store';
import ModalBackdrop from '@/components/organisms/modals/ModalBackdrop';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';

export default function ContinuationModal() {
  const { isOpen, onClickCancel, onClickContinue } = useRecoilValue(
    ContinuationModalAtom,
  );

  return isOpen ? (
    <ModalBackdrop modalType="Continue">
      <Container.FlexCol className="w-full max-w-96 cursor-auto rounded-2xl bg-bg text-brown">
        <Container.FlexCol className="gap-5 p-6">
          <Typography.SubTitle3>저장된 글이 있어요!</Typography.SubTitle3>
          <Typography.P3 className="whitespace-pre-line text-start leading-6">
            {`저장된 글을 불러와 이어서 작성할 수 있습니다. 
						취소를 누르면 저장된 글은 삭제됩니다.`}
          </Typography.P3>
        </Container.FlexCol>
        <Container.FlexRow className="justify-end pb-[10px] pr-[10px]">
          <Button.Ghost
            onClick={onClickCancel}
            type="button"
            className="px-4 py-2 "
          >
            <Typography.P3 className="font-semibold">취소</Typography.P3>
          </Button.Ghost>
          <Button.Ghost
            onClick={onClickContinue}
            type="button"
            className="px-4 py-2"
          >
            <Typography.P3 className="font-semibold text-point">
              이어쓰기
            </Typography.P3>
          </Button.Ghost>
        </Container.FlexRow>
      </Container.FlexCol>
    </ModalBackdrop>
  ) : null;
}

ContinuationModal.defaultProps = {
  onClickCancel: () => {},
  onClickContinue: () => {},
  cancelButtonContent: '취소',
  continueButtonContent: '이어쓰기',
};
