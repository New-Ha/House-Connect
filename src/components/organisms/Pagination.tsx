import { Dispatch, SetStateAction } from 'react';

import Container from '@/components/atoms/Container';
import IconButton from '@/components/molecules/IconButton';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';

type PaginationProps = {
  totalPage: number;
  pageState: [number, Dispatch<SetStateAction<number>>];
};

const calcPagination = (currentPage: number, totalPage: number) => {
  const pages: [string | number] = [1];

  if (totalPage <= 6) {
    return Array.from({ length: totalPage }, (_, index) => index + 1);
  }
  if (currentPage <= 4) {
    for (let i = 2; i <= Math.min(5, totalPage); i++) {
      pages.push(i);
    }
    if (totalPage > 5) {
      pages.push('...');
    }
  } else if (currentPage >= totalPage - 3) {
    if (currentPage > 2) {
      pages.push('...');
    }
    for (let i = totalPage - 4; i < totalPage; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage > 3) {
      pages.push('...');
    }

    const startRange = Math.max(2, currentPage - 1);
    const endRange = Math.min(totalPage - 1, currentPage + 1);

    for (let i = startRange; i <= endRange; i++) {
      pages.push(i);
    }

    // 중간 생략된 부분 끝
    if (endRange < totalPage - 1) {
      pages.push('...');
    }
  }

  pages.push(totalPage);
  return pages;
};
export default function Pagination(props: PaginationProps) {
  const { pageState, totalPage } = props;
  const [currentPage, setCurrentPage] = pageState;
  const pageList = calcPagination(currentPage, totalPage);

  if (totalPage === 0 || totalPage === null) return null;

  return (
    <Container.FlexRow className="items-center justify-center">
      <IconButton.Ghost
        iconType="prev"
        className="size-10 justify-center"
        stroke={currentPage === 1 ? 'brown2' : 'brown'}
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
      />
      {pageList.map(page =>
        typeof page === 'number' ? (
          <Button.Ghost key={page} onClick={() => setCurrentPage(page)}>
            <Typography.SubTitle1
              className={`px-[0.875rem] py-[0.625rem] ${currentPage === page ? 'rounded-[0.25rem] bg-brown text-white' : 'text-brown'}`}
            >
              {page}
            </Typography.SubTitle1>
          </Button.Ghost>
        ) : (
          <Typography.SubTitle1
            key={page}
            className="px-[0.875rem] py-[0.625rem] text-brown"
          >
            {page}
          </Typography.SubTitle1>
        ),
      )}
      <IconButton.Ghost
        iconType="next"
        className="size-10 justify-center"
        stroke={currentPage === totalPage ? 'brown2' : 'brown'}
        fill={currentPage === totalPage ? 'brown2' : 'brown'}
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPage))}
      />
    </Container.FlexRow>
  );
}
