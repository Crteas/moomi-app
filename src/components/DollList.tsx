import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

export interface IdollInfo {
  id: number;
  dollName: string;
  size: number;
  whereBuy: string;
  manager: string;
  price: number;
  etc: string | null;
  img: string | null;
  attr: string | null;
}

export const dollLists: IdollInfo[] = [
  {
    id: 0,
    dollName: "프루",
    size: 10,
    whereBuy: "트위터",
    manager: "공구주1",
    price: 135000,
    etc: null,
    img: null,
    attr: null,
  },
  {
    id: 1,
    dollName: "김밥든프루",
    size: 20,
    whereBuy: "트위터",
    manager: "공구주1",
    price: 99000,
    etc: null,
    img: null,
    attr: null,
  },
  {
    id: 2,
    dollName: "피자든프루dsadas",
    size: 30,
    whereBuy: "트위터",
    manager: "공구주1",
    price: 119500,
    etc: null,
    img: null,
    attr: null,
  },
];

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  margin-bottom: 30px;
`;

const DollListWrapper = styled.div`
  display: block;
  max-width: 700px;
  margin: 0 auto;
  background-color: wheat;
`;

const DollImg = styled.img`
  width: 200px;
`;
// 스크롤width이슈가 있음
function DollList() {
  const navigate = useNavigate();
  const [list, setList] = useState<IdollInfo[]>();
  const [isReady, setReady] = useState(false);
  useEffect(() => {
    setList(dollLists);
    setReady(true);
  }, []);
  return (
    <div>
      <DollListWrapper>
        {list?.map((doll) => (
          <div key={doll.id}>
            <Item>
              <DollImg
                src="som1.jpg"
                onClick={() => {
                  navigate(`/doll/${doll.id}`);
                }}
              />
              <div>{doll.dollName}</div>
            </Item>
          </div>
        ))}
      </DollListWrapper>
    </div>
  );
}

export default DollList;
