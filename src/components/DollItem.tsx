import styled from "styled-components";
import { IdollInfo } from "../routes/DollList";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useNavigate } from "react-router";

const Wrapper = styled.div``;

const Column = styled.div``;

const Photo = styled.img`
  width: 250px;
`;

const DeleteBtn = styled.button``;
const EditBtn = styled.button``;

export default function DollItem({
  attr,
  dollName,
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
            navigate(`doll/${id}`);
          }}
        />
      </Column>
      <Column>
        <p>이름:{dollName}</p>
        <p>가격:{price}</p>
        <p>크기:{size}</p>
        <p>구매처:{whereBuy}</p>
        <p>공구주:{groupOrder}</p>
        <p>속성:{attr}</p>
        <p>비고:{etc}</p>
      </Column>
    </Wrapper>
  );
}
