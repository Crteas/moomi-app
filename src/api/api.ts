import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { IdollsAndCloset } from "../types/types";

// firebase에서 공구리스트 불러오기
export const fetchGroupBuyingList = async () => {
  const user = auth.currentUser;
  const dollListQuery = query(
    collection(db, "dollsAndCloset"),
    where("userId", "==", user?.uid),
    where("isGroupBuying", "==", true),
    orderBy("createdAt", "desc")
  );

  const snapShot = await getDocs(dollListQuery);
  const newList = snapShot.docs.map((doc) => {
    return doc.data() as IdollsAndCloset;
  });
  return newList;
};

// 공구중 리스트의 조건부 초기설정함수
export const initGroupOrderData = async (
  isInit?: boolean
): Promise<IdollsAndCloset[]> => {
  if (isInit) {
    localStorage.removeItem("groupOrder");
  }

  const localData = localStorage.getItem("groupOrder");
  if (localData) {
    const data: { list: IdollsAndCloset[]; timestamp: number } =
      JSON.parse(localData);
    const isDataStale = checkDataStaleness(data.timestamp);

    if (isDataStale) {
      console.log("오래된 데이터");
      return fetchDataAndStore();
    } else {
      console.log("이미있음!");
      return data.list;
    }
  } else {
    return fetchDataAndStore();
  }
};

const fetchDataAndStore = async (): Promise<IdollsAndCloset[]> => {
  try {
    const list: IdollsAndCloset[] = await fetchGroupBuyingList();
    const dataToStore = {
      list,
      timestamp: Date.now(), // 현재 시간을 타임스탬프로 저장
    };
    localStorage.setItem("groupOrder", JSON.stringify(dataToStore));
    return list;
  } catch (e) {
    console.log(e);
    // 모달 에러 처리
    return [];
  }
};

const checkDataStaleness = (timestamp: number, day?: number): boolean => {
  if (!day) day = 2;
  const twoDaysInMilliseconds = day * 24 * 60 * 60 * 1000;

  // 현재 시간과 비교하여 2일을 초과했는지 확인
  return Date.now() - timestamp > twoDaysInMilliseconds;
};
