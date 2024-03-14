import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { User } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { IdollInfo } from "../types/types";

const Wrapper = styled.div``;
const Img = styled.img`
  background-color: wheat;
  width: 300px;
  height: 300px;
  object-fit: contain;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const ArrowButton = styled.div``;
export default function HomeImage() {
  const [imgList, setImgList] = useState<string[]>([]);
  const [order, setOrder] = useState<number>(0);
  const interval = useRef<number>();
  // 리스트 순환코드
  const updateOrder = (
    direction: string,
    order: number,
    listLength: number
  ) => {
    const increment = direction === "rightArrow" ? 1 : -1;
    let newOrder = (order + increment + listLength) % listLength;
    return newOrder;
  };

  const clickArrow = (e: React.MouseEvent<HTMLDivElement>) => {
    const { direction } = e.currentTarget.dataset;
    if (imgList.length === 0 || !direction) return;
    // 클릭시 재실행
    clearInterval(interval.current);

    interval.current = window.setInterval(() => {
      setOrder((preOrder) =>
        updateOrder("rightArrow", preOrder, imgList.length)
      );
    }, 5000);

    setOrder((preOrder) => updateOrder(direction, preOrder, imgList.length));
  };

  //이미지주소들을 imgList에 넣는 함수
  const fetchImgList = async () => {
    const user: User | null = auth.currentUser;
    try {
      if (user) {
        //dolls 를 불러오기위한 query
        const imgListQuery = query(
          collection(db, "item"),
          where("userId", "==", user?.uid),
          where("category", "==", "dolls"),
          orderBy("createdAt", "desc"),
          limit(5)
        );

        // snapshot 선언
        const snapShot = await getDocs(imgListQuery);

        // 불러온 아이템중 photo만 배열에 넣기
        const newImgList = snapShot.docs.map((doc) => {
          const item: IdollInfo = doc.data() as IdollInfo;
          return item.photo;
        });
        setImgList(newImgList);
      }
    } catch (e) {
      console.log(e); //오류가 발생할 경우 대체 이미지
    }
  };
  useEffect(() => {
    fetchImgList();
  }, []);

  //

  useEffect(() => {
    interval.current = window.setInterval(() => {
      setOrder((preOrder) =>
        updateOrder("rightArrow", preOrder, imgList.length)
      );
    }, 5000);
    return () => {
      clearInterval(interval.current);
    };
  }, [imgList.length]);

  return (
    <Wrapper>
      <Img src={imgList[order]} />

      <PaginationWrapper>
        <ArrowButton data-direction="leftArrow" onClick={clickArrow}>
          {"<"}
        </ArrowButton>
        <div>
          {order + 1}/{imgList.length}
        </div>
        <ArrowButton data-direction="rightArrow" onClick={clickArrow}>
          {">"}
        </ArrowButton>
      </PaginationWrapper>
    </Wrapper>
  );
}
