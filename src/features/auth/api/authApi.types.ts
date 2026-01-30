import { loginSchema } from '@/features/auth/model/schemas';
import * as z from 'zod';

export type loginInputs = z.infer<typeof loginSchema>;
