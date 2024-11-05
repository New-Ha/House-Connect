import { ComponentType, ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Loading from '@/components/pages/maintenance/Loading';
import ErrorFallback from '@/components/molecules/ErrorFallback';

function WithSuspenseAndErrorBoundary<T>({
  InnerSuspenseComponent,
  SuspenseFallback,
}: {
  InnerSuspenseComponent: ComponentType<T>;
  SuspenseFallback?: ReactNode;
}) {
  // eslint-disable-next-line react/display-name
  return function (props: T & JSX.IntrinsicAttributes) {
    return (
      <ErrorBoundary fallbackRender={ErrorFallback}>
        <Suspense fallback={SuspenseFallback || <Loading text="Loading..." />}>
          <InnerSuspenseComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
}

export default WithSuspenseAndErrorBoundary;
