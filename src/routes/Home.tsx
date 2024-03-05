import styled from "styled-components";
import ShortCutIcon from "../components/ServiceIcon";
import TextItemList from "../components/TextItemList";

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

function Home() {
  return (
    <Wrapper>
      <ShortCutIconList>
        <ShortCutIcon url="/dolls/list" src="dolls" name="인형" />
        <ShortCutIcon url="/closet/list" src="closet" name="옷" />
        <ShortCutIcon url="/dolls/list" src="closet" name="인형" />
      </ShortCutIconList>
      <section>
        <TextItemList currentCategory="dolls" />
        <TextItemList currentCategory="closet" />
      </section>
    </Wrapper>
  );
}

export default Home;
