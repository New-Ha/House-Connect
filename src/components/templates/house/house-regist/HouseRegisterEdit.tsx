import { useEffect } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { WithSuspenseAndErrorBoundary } from '@/components/organisms/withAsyncErrorHandling';
import { housePostQuery } from '@/hooks/useHouse';
import HouseRegisterForm, {
  HouseRegistFormProps,
} from '@/components/templates/house/house-regist/HouseRegisterForm';

type HouseRegisterEditProps = HouseRegistFormProps & {
  houseId: string;
};

function HouseRegisterEditPageComponent({
  form,
  houseId,
}: HouseRegisterEditProps) {
  const housePostQueryOptions = housePostQuery(houseId);
  const { data: housePost } = useSuspenseQuery(housePostQueryOptions);

  useEffect(() => {
    const fetchHouseData = () => {
      if (housePost) {
        form.reset(prev => ({
          ...prev,
          ...housePost,
        }));
      }
    };
    fetchHouseData();
  }, [form, houseId, housePost]);

  return <HouseRegisterForm form={form} />;
}

const HouseRegisterEdit = WithSuspenseAndErrorBoundary({
  InnerSuspenseComponent: HouseRegisterEditPageComponent,
});

export default HouseRegisterEdit;
