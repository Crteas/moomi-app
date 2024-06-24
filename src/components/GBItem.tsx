import styled from "styled-components";
import { IdollsAndCloset } from "../types/types";
import { useNavigate } from "react-router";

const ItemWrapper = styled.div`
  height: 350px;
  min-width: 200px;
  border: 1px solid black;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const Item = styled.div`
  text-align: center;
`;
const DollImg = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 20px;
  padding: 10px;
`;
const DollName = styled.span`
  text-align: center;
  display: block;
  padding-top: 5px;
`;

export default function GBItem({ data }: { data: IdollsAndCloset }) {
  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/GBitem/${data.id}`);
  };
  return (
    <ItemWrapper>
      <Item>
        <DollImg
          src={data.photo ? data.photo : "iconImg/no_img.png"}
          alt="dollImg"
          onClick={goDetail}
        />
      </Item>
      <Item>
        <DollName>{data.name}</DollName>
      </Item>
    </ItemWrapper>
  );
}
