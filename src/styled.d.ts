import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    bodyColor: string;
    textColor: string;
    headerColor: string;
    fontSize: string;
    buttonColor: string;
  }
}
