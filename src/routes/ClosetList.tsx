import styled from "styled-components";
import ItemList from "../components/ItemList";
import { Link } from "react-router-dom";

const Wrapper = styled.div``;

export default function ClosetList() {
  return (
    <Wrapper>
      <Link to={"/"}>{"<-"}</Link>
      <ItemList />
    </Wrapper>
  );
}
