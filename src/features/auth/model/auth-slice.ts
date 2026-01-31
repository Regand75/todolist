import { createAppSlice, handleServerAppError, handleServerNetworkError } from '@/common/utils';
import { loginInputs } from '@/features/auth/api/authApi.types';
import { setAppStatusAC } from '@/app/model/app-slice';
import { ResultCode } from '@/common/enums';
import { authApi } from '@/features/auth/api/authApi';
import { AUTH_TOKEN } from '@/common/constants';
import { clearDataAC } from '@/common/actions';

export const authSlice = createAppSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    userEmail: null as string | null,
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectUserData: (state) => state.userEmail,
  },
  reducers: (create) => ({
    loginTC: create.asyncThunk(
      async (data: loginInputs, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }));
          const res = await authApi.login(data);
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: 'succeeded' }));
            localStorage.setItem(AUTH_TOKEN, res.data.data.token);
            return { isLoggedIn: true, userEmail: data.email };
          } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
          state.userEmail = action.payload.userEmail;
        },
      },
    ),
    logoutTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }));
          const res = await authApi.logout();
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: 'succeeded' }));
            dispatch(clearDataAC({ tasks: {}, todolists: [] }));
            localStorage.removeItem(AUTH_TOKEN);
            return { isLoggedIn: false, userEmail: null };
          } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
          state.userEmail = action.payload.userEmail;
        },
      },
    ),
    meTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }));
          const res = await authApi.me();
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: 'succeeded' }));
            return { isLoggedIn: true, userEmail: res.data.data.email };
          } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
          state.userEmail = action.payload.userEmail;
        },
      },
    ),
  }),
});

export const { selectIsLoggedIn, selectUserData } = authSlice.selectors;
export const { loginTC, logoutTC, meTC } = authSlice.actions;
export const authReducer = authSlice.reducer;
