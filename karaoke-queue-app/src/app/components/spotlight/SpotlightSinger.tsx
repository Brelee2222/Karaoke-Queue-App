import { smoothBoxStyle } from "@/constants/styles.constants";
import { KaraokeSpot } from "@/utils/types";
import { CSSProperties } from "react";

export default function SpotlightSinger( props : KaraokeSpot ) {

const {
    singerName,
    songTitle,
    vocalVersion
} = props;

return (

<div style={containerStyle}>
    <span style={currentSongStyle}>Current Song</span>
    <div>
        <span style={detailNameStyle}>{songTitle}</span>
        <br/>
        <span>{vocalVersion} Version</span>
        <hr/>
        <span style={detailNameStyle}>Singer: </span>
        <span style={detailValueStyle}>{singerName}</span>
    </div>
</div>

);

}

const containerStyle : CSSProperties = {
    display : "grid",
    gridTemplateRows : "auto 1fr",

    ...smoothBoxStyle,

    color : "#cb85e0",

    padding : "0.5em",
    overflow : "hidden"
}

const currentSongStyle : CSSProperties = {
    fontSize : "2em",
    fontWeight : "bolder",
    color : "white"
};

const detailNameStyle : CSSProperties = {
    fontSize : "2.5em",
    fontWeight : "bold"
}

const detailValueStyle : CSSProperties = {
    fontSize : "2em"
}