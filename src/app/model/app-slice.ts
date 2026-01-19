import {createSlice} from "@reduxjs/toolkit";
import {RequestStatusType} from "@/common/types";

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: 'dark' as ThemeMode,
        status: "idle" as RequestStatusType,
        error: null as string | null,
    },
    selectors: {
        selectThemeMode: (state) => state.themeMode,
        selectStatus: (state) => state.status,
        selectError: (state) => state.error,
    },
    reducers: (create) => {
        return {
            changeThemeModeAC: create.reducer<{themeMode: ThemeMode}>((state, action) => {
                state.themeMode = action.payload.themeMode;
            }),
            setAppStatusAC: create.reducer<{status: RequestStatusType}>((state, action) => {
                state.status = action.payload.status;
            }),
            setAppErrorAC: create.reducer<{error: string | null}>((state, action) => {
                state.error = action.payload.error;
            }),
        }
    }
})

export const {changeThemeModeAC, setAppStatusAC, setAppErrorAC} = appSlice.actions;
export const {selectThemeMode, selectStatus, selectError} = appSlice.selectors;
export const appReducer = appSlice.reducer

export type ThemeMode = 'dark' | 'light';