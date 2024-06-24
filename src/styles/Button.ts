import styled from "styled-components";

const Button = styled.button`
  border: none;
  padding: 0px 20px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.buttonColor};
`;

export default Button;
