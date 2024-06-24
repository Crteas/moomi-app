import { atom } from "recoil";
import { IdollsAndCloset } from "./types/types";

export const formDataState = atom<IdollsAndCloset | null>({
  key: "formDataState",
  default: null,
});
