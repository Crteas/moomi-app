import styled from "styled-components";
import { useNavigate } from "react-router";
import { IdollInfo } from "../types/types";

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

export default function DollItem({ ...data }: IdollInfo) {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Column>
        <Photo
          src={data.photo}
          onClick={() => {
            navigate(`/dolls/${data.id}`);
          }}
        />
      </Column>
      <Column>
        <p>{data.name}</p>
      </Column>
    </Wrapper>
  );
}
