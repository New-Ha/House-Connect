/* eslint-disable react/display-name */
import { ComponentType, ReactNode, Suspense } from 'react';

import DefaultLoading from '@/components/pages/maintenance/Loading';

export default function WithSuspense<T>({
  InnerSuspenseComponent,
  SuspenseFallback,
}: {
  InnerSuspenseComponent: ComponentType<T>;
  SuspenseFallback?: ReactNode;
}) {
  return function (props: T & JSX.IntrinsicAttributes) {
    return (
      <Suspense fallback={SuspenseFallback || <DefaultLoading />}>
        <InnerSuspenseComponent {...props} />
      </Suspense>
    );
  };
}
