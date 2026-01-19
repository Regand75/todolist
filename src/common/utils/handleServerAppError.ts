import { setAppErrorAC, setAppStatusAC } from "@/app/model/app-slice.ts"
import type { Dispatch } from "@reduxjs/toolkit"
import {BaseResponseType} from "@/common/types";

export const handleServerAppError = <T,>(data: BaseResponseType<T>, dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "failed" }))
  const errorMessage = data.messages.length ? data.messages[0] : 'Something went wrong'
  dispatch(setAppErrorAC({ error: errorMessage }))
}