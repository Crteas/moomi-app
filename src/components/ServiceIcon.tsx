import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.li`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  border: 2px solid black;
`;

const ShortCutIconImg = styled.img`
  border-radius: 20px;
`;

const ServiceName = styled.span`
  text-align: center;
`;

const IconLink = styled(Link)`
  display: flex;
  flex-direction: column;
`;

type IShortCutIcon = {
  url: string;
  src: "dolls" | "closet" | "etc";
  name: string;
};

const imgSrcObject = {
  dolls: "./iconImg/dolls_Icon.png",
  closet: "./iconImg/closet_Icon.png",
  etc: "./iconImg/etc_Icon.png",
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
