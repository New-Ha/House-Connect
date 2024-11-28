import { AuthError, PostgrestError } from '@supabase/supabase-js';

class SupabaseCustomError extends Error {
  public code?: string;

  public statusCode: number;

  public hint?: string;

  public details?: string;

  constructor(error: PostgrestError | AuthError, statusCode: number) {
    super(error.message);
    this.name = 'SupabaseCustomError';
    this.statusCode = statusCode;

    if (error instanceof AuthError) {
      console.error({
        name: this.name,
        statusCode: this.statusCode,
      });
    } else {
      this.code = error.code;
      this.hint = error.hint;
      this.details = error.details;

      console.error({
        name: this.name,
        code: this.code,
        hint: this.hint,
        details: this.details,
        statusCode: this.statusCode,
      });
    }
  }
}

export default SupabaseCustomError;
