import styled from "styled-components";
import ShortCutIcon from "../components/ShortCutIcon";
import HomeImage from "../components/HomeImage";
import { useEffect, useState } from "react";
import { initGroupOrderData } from "../api/api";
import GBHomeList from "../components/GBHomeList";
import { IdollsAndCloset } from "../types/types";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ShortCutIconList = styled.ul`
  list-style: none;
  display: flex;
  gap: 50px;
`;

const HomeSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  gap: 20px;
  height: 250px;
`;
const ImgWrapper = styled.div``;

function Home() {
  const [list, setList] = useState<IdollsAndCloset[]>();
  useEffect(() => {
    initGroupOrderData().then((data) => {
      setList(data);
    });
  }, []);
  return (
    <Wrapper>
      {/* 보유중인 옷 사진 */}
      <ImgWrapper>
        <HomeImage />
      </ImgWrapper>

      <br />
      <ShortCutIconList>
        <ShortCutIcon url="/dolls/list" src="dolls" name="인형" />
        <ShortCutIcon url="/GBlist" src="closet" name="공구" />
        <ShortCutIcon url="/dolls/list" src="link" name="링크" />
        <ShortCutIcon url="/addGBitem" src="add" name="등록" />
      </ShortCutIconList>
      <HomeSection>
        {/* 공구중인 아이템 */}
        <GBHomeList data={list} />
      </HomeSection>
    </Wrapper>
  );
}

export default Home;
