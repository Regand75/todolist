import { instance } from '@/common/instance';
import { BaseResponseType } from '@/common/types';
import { loginInputs } from '@/features/auth/api/authApi.types.ts';

export const authApi = {
  login(body: loginInputs) {
    return instance.post<BaseResponseType<{ userId: number; token: string }>>('/auth/login', body);
  },
  logout() {
    return instance.delete<BaseResponseType>(`/auth/login`);
  },
  me() {
    return instance.get<BaseResponseType<{ id: number; email: string; login: string }>>(`/auth/me`);
  },
};
