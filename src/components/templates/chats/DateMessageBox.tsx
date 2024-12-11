import { ReactNode } from 'react';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import { formatDateByCountry } from '@/libs/dateUtils';

type DateMessageBoxProps = {
  children: ReactNode;
  date: Date;
};

// date별로 묶을 UI Component
export default function DateMessageBox({
  children,
  date,
}: DateMessageBoxProps) {
  const messageDate = formatDateByCountry({ date });

  return (
    <Container.FlexCol className="gap-8">
      <Typography.Span2 className="mx-auto w-fit rounded-[1.25rem] bg-brown6 px-4 py-2 font-medium text-brown1">
        {messageDate}
      </Typography.Span2>
      {children}
    </Container.FlexCol>
  );
}
