/* eslint-disable react/display-name */

import { ComponentType, ReactNode, Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import DefaultLoading from '@/components/pages/maintenance/Loading';
import DefaultErrorFallback from '@/components/molecules/ErrorFallback';

export default function WithSuspenseAndErrorBoundary<T>({
  InnerSuspenseComponent,
  SuspenseFallback,
  ErrorFallback,
}: {
  InnerSuspenseComponent: ComponentType<T>;
  SuspenseFallback?: ReactNode;
  ErrorFallback?: (props: FallbackProps) => ReactNode;
}) {
  return function (props: T & JSX.IntrinsicAttributes) {
    return (
      <ErrorBoundary fallbackRender={ErrorFallback || DefaultErrorFallback}>
        <Suspense fallback={SuspenseFallback || <DefaultLoading />}>
          <InnerSuspenseComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
}
