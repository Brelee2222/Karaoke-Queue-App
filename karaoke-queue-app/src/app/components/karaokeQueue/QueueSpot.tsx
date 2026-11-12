import { normalTextColor, smoothBoxStyle } from "@/constants/styles.constants";
import { KaraokeSpot } from "@/utils/types"
import { CSSProperties } from "react";

export default function QueueSpot(props : 
    KaraokeSpot & { color : string }
) {

const {
    color,
    singerName,
    songTitle,
    vocalVersion
} = props;

return (
<div style={{...containerStyle}}>
    <span style={singerNameStyle}>
        <span style={{ fontWeight : "bold" }}>Singer: </span>
        <span style={{ fontStyle : "italic" }}>{singerName}</span>
    </span>
    <span style={{...songTitleStyle, color}}>{songTitle}</span>
    <span style={{...versionStyle, color}}>Version: <br/>{vocalVersion}</span>
</div>
);

}

export const containerStyle : CSSProperties = {
    display : "grid",
    gridTemplateAreas : `
        "songTitle version"
        "singerName version
    `,

    ...smoothBoxStyle,

    padding : "3px",
    paddingLeft : "10px",
    paddingRight : "7px",
};

export const singerNameStyle : CSSProperties = {
    gridArea : "singerName",

    fontSize : "0.75em",

    color : normalTextColor,

    margin : "0px",

    textWrap : "nowrap",
};

export const songTitleStyle : CSSProperties = {
    gridArea : "songTitle",

    margin : "0px",
    fontSize : "1em",
    fontWeight : "bold",

    textWrap : "wrap",
    overflowX : "hidden"
};

export const versionStyle : CSSProperties = {
    gridArea : "version",

    fontSize : "0.65em",

    margin : "0px",

    textAlign : "right"
}