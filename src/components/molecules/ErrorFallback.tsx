import { FallbackProps } from 'react-error-boundary';

import Error404 from '@/components/pages/maintenance/Error404';
import SupabaseCustomError from '@/libs/supabaseCustomError';

function ErrorFallback({ error }: FallbackProps) {
  const { statusCode } = error as SupabaseCustomError;

  if (statusCode >= 400 && statusCode < 500) {
    return <Error404 />;
  }

  // TODO: unknown error page로 대체
  return <h1 className="text-8xl text-brown">알 수 없는 오류</h1>;
}

export default ErrorFallback;
