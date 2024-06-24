import styled from "styled-components";
import { IDeliveryProgress, IdollsAndCloset } from "../types/types";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 300px;
`;

const InfoWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const DollName = styled.div`
  font-size: 27px;
`;

export default function ItemDetail({
  itemInfo,
}: {
  itemInfo: IdollsAndCloset;
}) {
  const [deliveryState, setDeliveryState] = useState("");
  const checkDeliveryState = (state: IDeliveryProgress) => {
    if (state === "delivered") {
      setDeliveryState("배송완료");
    } else if (state === "inProduction") {
      setDeliveryState("제작중");
    } else if (state === "inTransit") {
      setDeliveryState("배송중");
    } else {
      setDeliveryState("알수없음");
    }
  };

  useEffect(() => {
    if (itemInfo?.deliveryProgress) {
      checkDeliveryState(itemInfo?.deliveryProgress);
    }
  }, []);

  return (
    <Wrapper>
      <DollName>{itemInfo?.name}</DollName>
      <br></br>
      <InfoWrapper>
        <Img
          src={itemInfo?.photo ? itemInfo.photo : "/iconImg/no_img.png"}
          alt="photo"
        />
        <div>
          <div>
            <span>공구주 :</span> {itemInfo?.groupOrder}
          </div>
          <div>
            <span>비고 :</span> {itemInfo?.comment}
          </div>
          <div>
            <span>배송상황 :</span> {deliveryState}
          </div>
          <div>
            <span>가격 :</span> {itemInfo.price}
          </div>
          <div>
            <span>속성 : </span>
            {itemInfo?.attr === "attr" ? "속성" : "무속성"}
          </div>
        </div>
      </InfoWrapper>
    </Wrapper>
  );
}
