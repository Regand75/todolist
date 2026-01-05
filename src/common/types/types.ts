export type FieldErrorType = {
  error: string
  field: string
}

export type BaseResponseType<T = {}> = {
  data: T
  resultCode: number
  messages: string[]
  fieldsErrors: FieldErrorType[]
}
