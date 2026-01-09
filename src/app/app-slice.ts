import {createSlice} from "@reduxjs/toolkit";
import {RequestStatusType} from "@/common/types";

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: 'dark' as ThemeMode,
        status: "idle" as RequestStatusType,
    },
    selectors: {
        selectThemeMode: (state) => state.themeMode,
        selectStatus: (state) => state.status,
    },
    reducers: (create) => {
        return {
            changeThemeModeAC: create.reducer<{themeMode: ThemeMode}>((state, action) => {
                state.themeMode = action.payload.themeMode;
            }),
            changeStatusAC: create.reducer<{status: RequestStatusType}>((state, action) => {
                state.status = action.payload.status;
            }),
        }
    }
})

export const {changeThemeModeAC, changeStatusAC} = appSlice.actions;
export const {selectThemeMode, selectStatus} = appSlice.selectors;
export const appReducer = appSlice.reducer

export type ThemeMode = 'dark' | 'light';