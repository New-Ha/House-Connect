/* eslint-disable react/display-name */
import { ComponentType, ReactNode } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import DefaultErrorFallback from '@/components/molecules/ErrorFallback';

export default function WithErrorBoundary<T>({
  InnerErrorBoundaryComponent,
  ErrorFallback,
}: {
  InnerErrorBoundaryComponent: ComponentType<T>;
  ErrorFallback?: (props: FallbackProps) => ReactNode;
}) {
  return function (props: T & JSX.IntrinsicAttributes) {
    return (
      <ErrorBoundary fallbackRender={ErrorFallback || DefaultErrorFallback}>
        <InnerErrorBoundaryComponent {...props} />
      </ErrorBoundary>
    );
  };
}
