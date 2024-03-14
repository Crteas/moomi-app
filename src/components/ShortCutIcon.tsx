import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IShortCutIcon } from "../types/types";

const Wrapper = styled.li`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  border: 2px solid black;
  box-sizing: border-box;
`;

const ShortCutIconImg = styled.img`
  border-radius: 20px;
  margin-bottom: 5px;
`;

const ServiceName = styled.span`
  text-align: center;
`;

const IconLink = styled(Link)`
  display: flex;
  flex-direction: column;
`;

const imgSrcObject = {
  dolls: "./iconImg/dolls_Icon.png",
  closet: "./iconImg/closet_Icon.png",
  link: "./iconImg/link_Icon.png",
  add: "./iconImg/add_item_Icon.png",
};

export default function ShortCutIcon({ url, src, name }: IShortCutIcon) {
  return (
    <Wrapper>
      <IconLink to={url}>
        <ShortCutIconImg src={imgSrcObject[src]} />
        <ServiceName>{name}</ServiceName>
      </IconLink>
    </Wrapper>
  );
}
