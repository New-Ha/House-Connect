import { z } from 'zod';

export const AccountForm = z.object({
  avatar: z.union([z.instanceof(File), z.undefined()]),
  nickname: z
    .union([
      z.string().min(2, { message: '최소 2글자 이상 입력해주세요.' }),
      z.undefined(),
    ])
    .optional(),
});

export type AccountFormType = z.infer<typeof AccountForm>;
