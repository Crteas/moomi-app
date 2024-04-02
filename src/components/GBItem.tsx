import styled from "styled-components";
import { IdollsAndCloset } from "../types/types";

const Wrapper = styled.div`
  height: 350px;
  min-width: 200px;
  border: 1px solid black;
  box-sizing: border-box;
`;
const Item = styled.div`
  text-align: center;
`;
const DollImg = styled.img`
  width: 200px;
  height: 300px;
  object-fit: contain;
`;
const DollName = styled.span`
  text-align: center;
`;
export default function GBItem({ data }: { data: IdollsAndCloset }) {
  return (
    <Wrapper>
      <Item>
        <DollImg
          src={data.photo ? data.photo : "iconImg/no_img.png"}
          alt="dollImg"
        />
      </Item>
      <Item>
        <DollName>{data.name}</DollName>
      </Item>
    </Wrapper>
  );
}
