import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
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
import DollItem from "../components/DollItem";

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
export interface IdollInfo {
  name: string;
  size: string;
  whereBuy: string;
  groupOrder: string;
  price: string;
  etc: string;
  photo: string;
  attr: string;
  id: string;
  userId: string;
}

// 스크롤width이슈가 있음
function DollList() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [dollList, setDollList] = useState<IdollInfo[]>();
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchDollList = async () => {
      const dollListQuery = query(
        collection(db, "dolls"),
        where("userId", "==", user?.uid),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      unsubscribe = await onSnapshot(dollListQuery, (snapshot) => {
        const list = snapshot.docs.map((doc) => {
          const {
            createdAt,
            name,
            whereBuy,
            groupOrder,
            price,
            size,
            attr,
            etc,
            photo,
            userId,
          } = doc.data();
          return {
            createdAt,
            name,
            whereBuy,
            groupOrder,
            price,
            size,
            attr,
            etc,
            photo,
            id: doc.id,
            userId,
          };
        });
        setDollList(list);
      });
    };
    fetchDollList();
    return () => {
      unsubscribe && unsubscribe(); // tear down, cleanup
    };
  }, []);
  return (
    <DollListWrapper>
      {dollList?.map((list) => (
        <DollItem key={list.id} {...list} />
      ))}
    </DollListWrapper>
  );
}

export default DollList;
