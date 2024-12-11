import { useState } from 'react';

import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import IconButton from '@/components/molecules/IconButton';
import Carousel from '@/components/organisms/Carousel';
import ModalBackdrop from '@/components/organisms/modals/ModalBackdrop';
import { HouseFormType } from '@/types/house.type';
import cn from '@/libs/cn';

export type HouseImageProp = {
  houseId: string;
  representativeImg: HouseFormType['representative_img'];
  houseImg: HouseFormType['house_img'];
  userId: HouseFormType['user_id'];
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ImageCarouselModal({
  houseId,
  representativeImg,
  houseImg,
  userId,
  setModal,
}: HouseImageProp) {
  const HOUSE_STORAGE_URL = `${import.meta.env.VITE_SUPABASE_BUCKET_URL}/house/${userId}/${houseId}`;
  const houseImages = [representativeImg, ...houseImg];
  const [carouselStep, setCarouselStep] = useState(0);

  return (
    <ModalBackdrop
      className="flex flex-col bg-dark-brown p-0 hover:cursor-auto"
      onClickClose={() => setModal(false)}
    >
      {/* header section */}
      <Container.FlexRow
        className={cn(
          'h-[4.92rem] w-full z-10 items-center bg-transparent px-[1.85rem] shrink-0',
          's-tablet:px-[2.46rem] s-tablet:h-[6.77rem]',
          'tablet:px-14 tablet:h-[6rem]',
          'desktop:h-[8.5rem]',
        )}
      >
        <IconButton.Ghost
          className="justify-center"
          iconType="close"
          iconClassName="[&_path]:fill-white size-[1.23rem] s-tablet:size-[1.85rem] tablet:size-6"
          onClick={() => setModal(false)}
        />
        <Container.FlexRow className="flex-1 justify-center">
          <Typography.P1
            lang="en"
            className="text-[1.23rem] text-white s-tablet:text-[1.54rem] tablet:text-xl"
          >
            {`${carouselStep + 1} / ${houseImages.length}`}
          </Typography.P1>
        </Container.FlexRow>
      </Container.FlexRow>
      <Container.FlexRow
        className={cn(
          'relative flex-1 h-full items-center justify-center max-h-[calc(100vh-4.92rem)]',
          's-tablet:max-h-[calc(100vh-6.77rem)]',
          'tablet:px-[6rem] tablet:max-h-[calc(100vh-6rem)]',
          'laptop:px-[8.5rem]',
          'desktop:px-[11.75rem] desktop:max-h-[calc(100vh-8.5rem)]',
        )}
      >
        <Carousel order={carouselStep} className="size-full">
          {houseImages.map(src => (
            <Img
              key={src}
              alt="하우스 사진"
              src={`${HOUSE_STORAGE_URL}/${src}`}
              className="min-w-full rounded-none"
              imageStyle="object-center object-contain"
            />
          ))}
        </Carousel>
        <IconButton.Ghost
          className={cn(
            'absolute left-[1rem] top-1/2 translate-y-[-50%] hover:cursor-pointer p-[0.1rem]',
            'laptop:left-[3rem]',
          )}
          iconClassName={cn(
            '[&_circle]:stroke-white [&_path]:fill-white drop-shadow-icon size-[2.46rem]',
            'screen480:size-[3rem]',
            'laptop:size-[3.5rem]',
            'desktop:translate-y-[-50%]',
          )}
          iconType="prev-circle"
          direction="left"
          onClick={() => {
            setCarouselStep(prev =>
              prev - 1 < 0 ? houseImages.length - 1 : prev - 1,
            );
          }}
        />
        <IconButton.Ghost
          className={cn(
            'absolute right-[1rem] top-1/2 translate-y-[-50%] hover:cursor-pointer p-[0.1rem]',
            'laptop:right-[3rem]',
          )}
          iconClassName={cn(
            '[&_circle]:stroke-white [&_path]:fill-white drop-shadow-icon size-[2.46rem]',
            'screen480:size-[3rem]',
            'laptop:size-[3.5rem]',
            'desktop:translate-y-[-50%]',
          )}
          iconType="next-circle"
          direction="right"
          onClick={() => {
            setCarouselStep(prev =>
              prev + 1 >= houseImages.length ? 0 : prev + 1,
            );
          }}
        />
      </Container.FlexRow>
    </ModalBackdrop>
  );
}
