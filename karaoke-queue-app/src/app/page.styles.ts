import { CSSProperties } from "react";

export const bodyStyle : CSSProperties = {
  margin : "0px",
  backgroundColor : "#1d1a25",
  fontFamily : "Inter Roboto Arial"
};

export const sidesContainerStyle : CSSProperties = {
  display : "grid",
  gridTemplateAreas : `
    "left right"
  `,
  gridTemplateColumns : "4fr 1fr",
  
  height : "100vh",
  width : "100vw",

  boxSizing : "border-box",
};

export const currentSingerContainerStyle : CSSProperties = {
  gridArea : "currentSinger",

  display : "grid",
  gridRow : "auto 1fr 1fr"
};

export const currentEntryStyle : CSSProperties = {
  color : "lime",
  backgroundColor : "#938c8c"
};