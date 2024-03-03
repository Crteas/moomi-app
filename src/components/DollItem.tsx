import styled from "styled-components";
import { IdollInfo } from "./ItemList";
import { useNavigate } from "react-router";

const Wrapper = styled.div`
  padding: 10px;
  box-sizing: border-box;
`;

const Column = styled.div`
  text-align: center;
`;

const Photo = styled.img`
  width: 250px;
  height: 250px;
  object-fit: contain;
  background-color: #e8ece6;
`;

const DeleteBtn = styled.button``;
const EditBtn = styled.button``;

export default function DollItem({
  attr,
  name,
  etc,
  groupOrder,
  photo,
  price,
  size,
  whereBuy,
  userId,
  id,
}: IdollInfo) {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Column>
        <Photo
          src={photo}
          onClick={() => {
            navigate(`/dolls/${id}`);
          }}
        />
      </Column>
      <Column>
        <p>{name}</p>
      </Column>
    </Wrapper>
  );
}
