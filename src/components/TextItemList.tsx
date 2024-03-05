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
import { IdollInfo } from "./ItemList";

type ICurrentCategory = "dolls" | "closet" | "etc";

type ITextItemList = {
  currentCategory: ICurrentCategory;
};

export default function TextItemList({ currentCategory }: ITextItemList) {
  const [itemList, setItemList] = useState<IdollInfo[]>([]);

  useEffect(() => {
    const fetchList = async () => {
      const user = auth.currentUser;
      const dollListQuery = query(
        collection(db, "item"),
        where("userId", "==", user?.uid),
        where("category", "==", currentCategory),
        orderBy("createdAt", "desc"),
        limit(25)
      );

      const docSnap = await getDocs(dollListQuery);
      const itemData = docSnap.docs.map((doc) => doc.data());
      setItemList(itemData as IdollInfo[]);
    };
    fetchList();
  });

  return (
    <>
      {itemList.map((data, idx) => (
        //컴포넌트 하나 만들기
        <div key={idx}>{data.category}</div>
      ))}
    </>
  );
}
