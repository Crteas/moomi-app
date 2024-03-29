import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import {
  QuerySnapshot,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { IdollsAndCloset } from "../types/types";

const Wrapper = styled.div``;
const GBList = styled.ul``;
const GBItem = styled.li``;

export default function GBItemList() {
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [gBList, setGBList] = useState<IdollsAndCloset[]>([]);
  const [lastSnap, setLastSnap] = useState<QuerySnapshot | null>(null);

  const fetchGBItemList = async () => {
    const user = auth.currentUser;
    const category = "dolls";
    if (!user) return;
    try {
      const firstListQuery = query(
        collection(db, "dollsAndCloset"),
        where("userId", "==", user?.uid),
        where("category", "==", category),
        orderBy("createdAt", "desc"),
        limit(10)
      );
      const snapShot = await getDocs(firstListQuery);

      const dataList = snapShot.docs.map((doc) => {
        const data: IdollsAndCloset = doc.data() as IdollsAndCloset;
        return data;
      });
      if (snapShot.empty) {
        alert("없어요");
      } else {
        setLastSnap(snapShot);
        setGBList(dataList);
      }
    } catch (e) {}
  };

  const fetchNextGBItem = async () => {
    if (!lastSnap || !hasNext) return;
    const snapShotLength = lastSnap.docs.length;
    if (snapShotLength >= 10) {
      // 더 있다.
      const lastVisible = lastSnap.docs[snapShotLength - 1];
      const next = query(
        collection(db, "dollsAndCloset"),
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(10)
      );
      const nextSnapShot = await getDocs(next);
      setLastSnap(nextSnapShot);
      if (nextSnapShot.empty) {
        setHasNext(false);
      } else {
        const nextData = nextSnapShot.docs.map((doc) => {
          const data: IdollsAndCloset = doc.data() as IdollsAndCloset;
          return data;
        });
        setGBList((prev) => [...prev, ...nextData]);
      }
    } else {
      setHasNext(false);
    }
  };

  useEffect(() => {
    fetchGBItemList();
  }, []);
  return (
    <Wrapper>
      <GBList>
        {gBList.map((data) => {
          return <GBItem key={data.id}>{data.name}</GBItem>;
        })}
      </GBList>
      <button type="button" onClick={fetchNextGBItem}>
        다음
      </button>
      <div></div>
    </Wrapper>
  );
}
