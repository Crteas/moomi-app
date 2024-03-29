import styled from "styled-components";
import { IGBHomeList, IdollsAndCloset } from "../types/types";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  min-height: 150px;
`;

const ColumnName = styled.div`
  display: grid;
  position: sticky;
  top: 0px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  background-color: pink;
  padding-top: 10px;
`;
const Name = styled.div`
  text-align: center;
`;

const RowWrapper = styled.div`
  background-color: pink;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
`;
const Rows = styled.ul`
  padding-top: 20px;
`;
const ItemWrapper = styled.li`
  margin-bottom: 10px;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
const Item = styled.div`
  text-align: center;
`;

type IRow = {
  data: IdollsAndCloset;
};

function Row({ data }: IRow) {
  return (
    <ItemWrapper>
      <Item>{data.name}</Item>
      <Item>
        {data.groupOrder}/{data.buyerLeader}
      </Item>
      <Item>{data.comment}</Item>
      <Item>
        <a href={data.customLink} target="_blank" rel="noopener noreferrer">
          링크
        </a>
      </Item>
    </ItemWrapper>
  );
}

export default function GBHomeList({ data }: IGBHomeList) {
  return (
    <Wrapper>
      <RowWrapper>
        <ColumnName>
          <Name>이름</Name>
          <Name>공구주/총대</Name>
          <Name>상황</Name>
          <Name>링크</Name>
        </ColumnName>
        <Rows>
          {data?.map((data, index) => (
            <Row key={index} data={data} />
          ))}
        </Rows>
      </RowWrapper>
    </Wrapper>
  );
}
