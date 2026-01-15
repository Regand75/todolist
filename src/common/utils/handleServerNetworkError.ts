import { setAppErrorAC, setAppStatusAC } from "@/app/app-slice"
import type { Dispatch } from "@reduxjs/toolkit"
import { isAxiosError } from "axios"

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch) => {
  if (isAxiosError(error)) {
    dispatch(setAppErrorAC({ error: error.response?.data?.message || error.message }))
  } else if (error instanceof Error) {
    dispatch(setAppErrorAC({ error: error.message }))
  } else {
    dispatch(setAppErrorAC({ error: "Something went wrong" }))
  }
  dispatch(setAppStatusAC({ status: "failed" }))
}
