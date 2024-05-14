import { useRecoilState } from 'recoil';
import { ChangeEvent } from 'react';

import ModalBackdrop from './ModalBackdrop';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import Container from '@/components/atoms/Container';
import { RoommateApplyAtom } from '@/stores/globalModal.store';

export default function RoommateApplyModal() {
  const [
    {
      isOpen,
      introduceContent,
      roommateAppeals,
      onClickCancel,
      onClickConfirm,
    },
    setRoommateApplyState,
  ] = useRecoilState(RoommateApplyAtom);

  const onChangeIntroduceContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newInroduceContent = e.currentTarget.value;

    setRoommateApplyState(prev => ({
      ...prev,
      introduceContent: newInroduceContent,
    }));
  };

  return isOpen ? (
    <ModalBackdrop modalType="RoommateApply">
      <Container.FlexCol className="max-h-[808px] max-w-[678px] bg-bg p-8 text-brown">
        <Typography.Head3 className="border-b-[0.5px] border-brown pb-7">
          룸메이트 신청
        </Typography.Head3>
        <Container.FlexCol className="gap-[60px] pb-8 pt-6">
          <Container.FlexCol className="gap-6">
            <Typography.SubTitle2>내가 원하는 룸메이트</Typography.SubTitle2>
            <Container.FlexRow className="h-[8.75rem] w-full flex-wrap items-start gap-2 rounded-lg bg-brown3 p-6">
              {roommateAppeals.map(appeal => (
                <Badge.Outline
                  key={appeal}
                  className="rounded-3xl px-[20px] py-[10px]"
                >
                  {appeal}
                </Badge.Outline>
              ))}
            </Container.FlexRow>
          </Container.FlexCol>
          <Container.FlexCol className="gap-6">
            <Typography.SubTitle2>내 소개글 (최대 250자)</Typography.SubTitle2>
            <Container.FlexCol>
              <textarea
                placeholder="나를 소개하는 글을 작성해보세요."
                value={introduceContent}
                onChange={onChangeIntroduceContent}
                className="h-72 w-full rounded-[15px] bg-brown3 p-6 placeholder:text-brown2"
              />
            </Container.FlexCol>
          </Container.FlexCol>
        </Container.FlexCol>
        <Container.FlexRow className="justify-end gap-2">
          <Button.Outline
            onClick={onClickCancel}
            className="rounded-lg px-9 py-4"
          >
            취소
          </Button.Outline>
          <Button.Fill
            onClick={onClickConfirm}
            className="rounded-lg px-9 py-4 text-bg"
          >
            전송
          </Button.Fill>
        </Container.FlexRow>
      </Container.FlexCol>
    </ModalBackdrop>
  ) : null;
}
