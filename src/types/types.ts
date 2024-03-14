export type IUserData = {
  email: string;
  name: string;
  password: string;
  error?: string;
};

// 받는데이터 인터페이스
export interface IdollInfo {
  name: string;
  size: string;
  whereBuy: string;
  groupOrder: string;
  isGroupBuying: boolean;
  price: string;
  etc: string;
  photo: string;
  attr: string;
  id?: string;
  category: string;
  userId: string;
  link?: string;
  createdAt?: string;
}

export type IShortCutIcon = {
  url: string;
  src: "dolls" | "closet" | "link" | "add";
  name: string;
};
