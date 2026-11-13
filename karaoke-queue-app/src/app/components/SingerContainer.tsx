import { KaraokeSpot } from "@/utils/types";
import { CSSProperties } from "react";
import SpotlightSinger from "./spotlight/SpotlightSinger";
import { normalTextColor } from "@/constants/styles.constants";


// #### Properties #### //
export default function SingerContainer( props : {
    gridArea : string,
    spotlightSinger : KaraokeSpot | null,
    doAdvanceSinger : () => void,
    doRewindSinger : () => void,
}) {




// #### Script #### //
const {
    gridArea,
    spotlightSinger,
    doAdvanceSinger,
    doRewindSinger,
} = props;


// #### HTML Element #### //
return (

<div style={{gridArea, ...containerStyle}}>
    <SpotlightSinger 
        {...spotlightSinger ?? { 
            singerName : "No singers yet!", 
            songTitle : "Never Gonna Give You Up (Prolly)",
            vocalVersion : "Vocal"
        }}
    />
    <div style={bottomStyle}>
        <button onClick={doAdvanceSinger}>Next Song</button>
        <button onClick={doRewindSinger}>Rewind Queue</button>
        <span style={instructionsStyle}>
            Once it is your turn to sing, choose the song video you want to sing to, and enjoy!
        </span>
    </div>
</div>

)

}

// #### Styles #### /
const containerStyle : CSSProperties = {
    display : "grid",
    gridTemplateRows : "auto 1fr",

    overflow : "hidden"
};

const bottomStyle : CSSProperties = {
    display: "flex",
    flexDirection : "column"
}

const instructionsStyle : CSSProperties = {
    color : normalTextColor
}