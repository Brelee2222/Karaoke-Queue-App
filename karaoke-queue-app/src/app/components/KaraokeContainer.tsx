import VideoPlayer from "./videoPlayer/VideoPlayer";
import { CSSProperties, useState } from "react";
import KaraokeQueue from "./karaokeQueue/KaraokeQueue";
import screenfull from 'screenfull';
import { KaraokeFullQueue } from "@/utils/types";
import { headerTextColor } from "@/constants/styles.constants";
import QRCode from "react-qr-code";

// #### Properties #### //
export default function KaraokeContainer( props : {
    gridArea : string,
    currentVideoSearchTerm : string | null,
    karaokeQueue : KaraokeFullQueue,
    doAdvanceSinger : () => void
}) {




// #### Script #### //
const {
    gridArea,
    currentVideoSearchTerm,
    karaokeQueue,
    doAdvanceSinger
} = props;

let [qrURL, setQrURL] = useState("");


// #### HTML Element #### //
return (

<div id="thingToFullscreen" style={{gridArea, ...containerStyle}}>
    <KaraokeQueue
        gridArea="upcoming"
        title="Upcoming Songs"
        karaokeQueue={karaokeQueue.nextSingers}
        color={headerTextColor}
    />
    <KaraokeQueue
        gridArea="past"
        title="Past Songs"
        karaokeQueue={karaokeQueue.pastSingers}
        color="gray"
    />
    <div style={{gridArea : "qr"}}>
        <QRCode value={qrURL}/>
        <textarea 
            value={qrURL}
            onChange={onQrURLChange}
        />
    </div>

    <VideoPlayer 
        videoSearchTerm={currentVideoSearchTerm ?? ""} 
        onPause={exitFullscreen} 
        onEnd={endSong}
        onPlay={enterFullscreen}
    />
</div> 

);




// #### Functions #### //
function enterFullscreen() {
    const element = document.getElementById("thingToFullscreen");

    if(!screenfull.isEnabled || !element)
        return;
    
    screenfull.request(element);
}

function exitFullscreen() {
    if(!screenfull.isEnabled)
        return;

    screenfull.exit();
}

function endSong() {
    exitFullscreen();
    doAdvanceSinger();
}

function onQrURLChange(e : any) {
    setQrURL(e.target.value);
}

}


// #### Styles #### //
export const containerStyle : CSSProperties = {
    // Grid
    display : "grid",
    gridTemplateAreas : `
        "videoPlayer upcoming"
        "videoPlayer past"
        "videoPlayer qr"
    `,
    gridTemplateColumns : "3fr 1fr",
    gridTemplateRows : "1fr 1fr",

    overflow : "hidden"
};