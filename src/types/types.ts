export type IUserData = {
  email: string;
  name: string;
  password: string;
  error?: string;
};

// 받는데이터 인터페이스
export interface IdollInfo {
  name: string; // 이름
  size: string; // 크기
  whereBuy: string; // 구매처
  groupOrder: string; // 공구주
  buyerLeader?: string;
  isGroupBuying: boolean; // 공구중인 아이템?
  price: string; // 가격
  etc: string; // 비고
  photo: string; // 사진주소
  attr: string; // 속성
  id?: string; // ??
  category: string; // 카테고리
  userId: string; // 유저아이디
  link?: string; // 커스텀링크
  createdAt?: string; // 생성시간
}

export type IShortCutIcon = {
  url: string;
  src: "dolls" | "closet" | "link" | "add";
  name: string;
};

type ISizeType = 5 | 10 | 15 | 20 | 25 | 30;

// AddGBItem Form에 쓰는 Interface
export type IGBForm = {
  size: ISizeType;
  attr: "noattr" | "attr";
  category: "dolls" | "closet";
  name: string;
  price: number;
  groupOrder?: string;
  buyerLeader?: string;
  etc?: string;
  whereBuy?: string;
  link?: string;
  photo?: FileList;
};

// IGHomeList props에 쓰는 Interface
export type IGBHomeList = {
  data: IdollInfo[] | undefined;
};
