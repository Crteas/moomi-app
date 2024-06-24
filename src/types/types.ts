export type IUserData = {
  email: string;
  name: string;
  password: string;
  error?: string;
};

// 홈 아이콘에 대한 인터페이스
export type IShortCutIcon = {
  url: string;
  src: "dolls" | "closet" | "link" | "add";
  name: string;
};

// 인형 사이즈
type IdollSize = 5 | 10 | 15 | 20 | 25 | 30;

// IGHomeList props에 쓰는 Interface
export type IGBHomeList = {
  data: IdollsAndCloset[] | undefined;
};

type IAttr = "attr" | "noAttr";
export type IDeliveryProgress = "inProduction" | "inTransit" | "delivered";
type ICategory = "dolls" | "closet";

// 인형과 옷장 타입
export type IdollsAndCloset = {
  [key: string]:
    | string
    | number
    | boolean
    | { value: string; value2: string }
    | { value: string; value2: string }[]
    | FileList
    | undefined;
  name: string;
  price: number;
  size: IdollSize;
  groupOrder: string;
  buyerLeader?: string;
  amIbuyerLeader?: boolean;
  attr: IAttr;
  whereBuy?: string;
  photo?: string;
  deliveryProgress: IDeliveryProgress;
  comment?: string;
  customLink?: string;
  id: string;
  userId: string;
  createdAt: string;
  isGroupBuying: string;
  category: ICategory;
  buyers?: { value: string; value2: string }[];
};

// AddGBItem Form에 쓰는 interface
export type IGBForm = {
  name: string;
  price: number;
  size: IdollSize;
  groupOrder: string;
  buyerLeader?: string;
  amIbuyerLeader?: boolean;
  attr: IAttr;
  whereBuy?: string;
  photo?: FileList;
  deliveryProgress: IDeliveryProgress;
  comment?: string;
  customLink?: string;
  category: ICategory;
  buyers?: { value: string; value2: string }[];
};

// 열거형 대신 쓴거
export const deliveryState = {
  inProduction: "inProduction",
  inTransit: "inTransit",
  delivered: "delivered",
} as const;
export type deliveryState = (typeof deliveryState)[keyof typeof deliveryState];

export type IFormItems =
  | "name"
  | "price"
  | "size"
  | "groupOrder"
  | "buyerLeader"
  | "amIbuyerLeader"
  | "attr"
  | "whereBuy"
  | "photo"
  | "deliveryProgress"
  | "comment"
  | "customLink"
  | "category"
  | "buyers"
  | `buyers.${number}`
  | `buyers.${number}.value`
  | `buyers.${number}.value2`;
