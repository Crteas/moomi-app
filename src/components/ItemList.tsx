import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Unsubscribe } from "firebase/auth";
import styled from "styled-components";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import DollItem from "./DollItem";
import { IdollInfo } from "../types/types";

const DollListWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.bgColor};
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const DollImg = styled.img`
  width: 200px;
`;

// 스크롤width이슈가 있음
function ItemList() {
  const location = useLocation();
  const isDollList = location.pathname === "/dolls/list";
  const isClosetList = location.pathname === "/closet/list";
  const user = auth.currentUser;
  const [itemList, setItemList] = useState<IdollInfo[]>();

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchDollList = async () => {
      let currentCategory = null;

      if (isDollList) {
        currentCategory = "dolls";
      } else if (isClosetList) {
        currentCategory = "closet";
      }

      const dollListQuery = query(
        collection(db, "item"),
        where("userId", "==", user?.uid),
        where("category", "==", currentCategory),
        orderBy("createdAt", "desc"),
        limit(25)
      );

      unsubscribe = await onSnapshot(dollListQuery, (snapshot) => {
        const list = snapshot.docs.map((doc) => {
          const data = doc.data() as IdollInfo;
          return {
            ...data,
            id: doc.id, // document의 id.
          };
        });
        setItemList(list);
      });
    };
    fetchDollList();
    return () => {
      unsubscribe && unsubscribe(); // tear down, cleanup
    };
  }, []);
  return (
    <DollListWrapper>
      {itemList?.map((list) => (
        <DollItem key={list.id} {...list} />
      ))}
    </DollListWrapper>
  );
}

export default ItemList;
