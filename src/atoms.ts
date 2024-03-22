import { atom } from "recoil";

import { IdollInfo } from "./types/types";

// 공동구매 리스트를 담는 atom
export const groupBuyingList = atom<IdollInfo[]>({
  key: "groupBuying",
  default: [],
});
