import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { IdollInfo } from "../types/types";
import styled from "styled-components";

type ICurrentCategory = "dolls" | "closet" | "etc";

type ITextItemList = {
  currentCategory?: ICurrentCategory;
};

const ListUL = styled.ul`
  list-style: none;
  border: 1px solid black;
`;

const ListWrapper = styled.div`
  box-sizing: border-box;
  background-color: #f4f4f4;
  min-width: 200px;
`;
const ListItem = styled.li``;

export default function TextItemList({ currentCategory }: ITextItemList) {
  const [itemList, setItemList] = useState<IdollInfo[]>([]);

  // useEffect(() => {
  //   const fetchList = async () => {
  //     const user = auth.currentUser;
  //     const dollListQuery = query(
  //       collection(db, "item"),
  //       where("userId", "==", user?.uid),
  //       where("category", "==", currentCategory),
  //       orderBy("createdAt", "desc"),
  //       limit(25)
  //     );

  //     const docSnap = await getDocs(dollListQuery);
  //     const itemData = docSnap.docs.map((doc) => doc.data());
  //     setItemList(itemData as IdollInfo[]);
  //   };
  //   fetchList();
  // }, []);

  return (
    <ListWrapper>
      {currentCategory === "dolls" ? "인형" : "옷"}
      <ListUL>
        {/* 
        {itemList.map((data, idx) => (
          //컴포넌트 하나 만들기
          <li key={idx}>
            <span>{data.name}</span>
          </li>
        ))}
       */}

        <ListItem>테스트1</ListItem>
        <ListItem>{currentCategory}</ListItem>
      </ListUL>
    </ListWrapper>
  );
}
