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
        <p>{dollName}</p>
        <p>{price}</p>
        <p>{size}</p>
        <p>{whereBuy}</p>
        <p>{groupOrder}</p>
        <p>{attr}</p>
        <p>{etc}</p>
      </Column>
    </Wrapper>
  );
}
