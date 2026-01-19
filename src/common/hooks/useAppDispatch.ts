import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/model/store.ts";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();