import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { IdollInfo } from "../types/types";

// firebase에서 공구리스트 불러오기
export const fetchGroupBuyingList = async () => {
  const user = auth.currentUser;
  const dollListQuery = query(
    collection(db, "item"),
    where("userId", "==", user?.uid),
    where("isGroupBuying", "==", true),
    orderBy("createdAt", "desc")
  );

  const snapShot = await getDocs(dollListQuery);
  const newList = snapShot.docs.map((doc) => {
    return doc.data() as IdollInfo;
  });
  return newList;
};

// 공구중 리스트의 초기설정함수
export const initGroupOrderData = async (): Promise<IdollInfo[]> => {
  const localData = localStorage.getItem("groupOrder");
  if (localData) {
    console.log("이미있음!");
    return JSON.parse(localData);
  } else {
    const list = await fetchGroupBuyingList();
    localStorage.setItem("groupOrder", JSON.stringify(list));
    return list;
  }
};
