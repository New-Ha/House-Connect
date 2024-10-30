import { FallbackProps } from 'react-error-boundary';

import Error404 from '@/components/pages/maintenance/Error404';
import SupabaseCustomError from '@/libs/supabaseCustomError';
import UnknownError from '@/components/pages/maintenance/UnknownError';

function ErrorFallback({ error }: FallbackProps) {
  const { statusCode } = error as SupabaseCustomError;

  if (statusCode >= 400 && statusCode < 500) {
    return <Error404 />;
  }

  return <UnknownError />;
}

export default ErrorFallback;
