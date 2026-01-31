import { defaultResponseSchema, fieldErrorSchema } from '@/common/schemas/schemas.ts';
import * as z from 'zod';

export type BaseResponseType<T = {}> = {
  data: T;
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldErrorType[];
};

export type DefaultResponseType = z.infer<typeof defaultResponseSchema>;

export type FieldErrorType = z.infer<typeof fieldErrorSchema>;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
