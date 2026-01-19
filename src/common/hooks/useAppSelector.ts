import {useSelector} from "react-redux";
import {RootState} from "@/app/model/store.ts";

export const useAppSelector = useSelector.withTypes<RootState>();