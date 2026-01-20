import {ResultCode} from "@/common/enums";
import * as z from "zod";

export const fieldErrorSchema = z.object({
    error: z.string(),
    field: z.string(),
})

export const baseResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
    z.object({
        data: schema,
        resultCode: z.nativeEnum(ResultCode),
        messages: z.string().array(),
        fieldsErrors: fieldErrorSchema.array(),
    })

export const defaultResponseSchema = baseResponseSchema(z.object({}))