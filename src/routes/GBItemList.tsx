import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import {
  QuerySnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { IdollsAndCloset } from "../types/types";
import GBItem from "../components/GBItem";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 90%;
`;
const GBList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
  justify-content: center;
`;
const Item = styled.div``;

export default function GBItemList() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [gBList, setGBList] = useState<IdollsAndCloset[]>([]);
  const [lastSnap, setLastSnap] = useState<QuerySnapshot | null>(null);

  useEffect(() => {
    if (isLoading) return;
    // 무한 스크롤
    let observer: IntersectionObserver | null = null;
    if (target) {
      const observeCallback = async (
        [entry]: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          fetchNextGBItem();
          if (!hasNext) {
            observer.observe(entry.target);
          }
        }
      };

      observer = new IntersectionObserver(observeCallback);
      observer.observe(target);
    }

    return () => {
      observer && observer.disconnect();
    };
  }, [target, isLoading]);

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
        setHasNext(false);
      } else {
        setLastSnap(snapShot);
        setGBList(dataList);
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
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
          return (
            <Item key={data.id}>
              <GBItem data={data} />
            </Item>
          );
        })}
      </GBList>
      <div ref={setTarget}></div>
    </Wrapper>
  );
}
