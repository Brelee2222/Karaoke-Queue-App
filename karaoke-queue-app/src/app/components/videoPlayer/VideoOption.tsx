import { headerTextColor, normalTextColor, smoothBoxStyle } from "@/constants/styles.constants";
import { decodeXML } from "@/utils/decode";
import { VideoSearchResult } from "@/utils/types";
import { CSSProperties } from "react";

type OnVideoSelected = (videoId : string) => void;

export default function VideoOption(
    props : VideoSearchResult & {onVideoSelected : OnVideoSelected} 
) {


//#### Script ####//
const 
videoId = props.id.videoId,
thumbnail = props.snippet.thumbnails.default.url,
songTitle = decodeXML(props.snippet.title),
channelTitle = decodeXML(props.snippet.channelTitle);




//#### HTML Element ####//
return (
    <div style={containerStyle}
        onClick={selectVideo}
    >
        <img style={thumbnailStyle} src={thumbnail}></img>
        <span style={titleStyle}>{songTitle}</span>
        <pre style={channelTitleStyle}>{channelTitle}</pre>
    </div>
);




//#### Functions ####//
function selectVideo() {
    props.onVideoSelected(videoId);
}

}


// #### Styles #### //
const containerStyle : CSSProperties = {
    display : "grid",
    gridTemplateAreas : `
        "thumbnail title"
        "thumbnail channelTitle"
    `,
    gridTemplateColumns : "auto 1fr",
    
    columnGap : "1em",

    ...smoothBoxStyle,

    overflow : "hidden"
};

const titleStyle : CSSProperties = {
    gridArea : "title",

    color : headerTextColor,

    fontSize : "1.25em",
    textWrap : "nowrap",

    overflowX : "hidden"
};

const channelTitleStyle : CSSProperties = {
    gridArea : "channelTitle",
    
    color : headerTextColor,
};

const thumbnailStyle : CSSProperties = {
    gridArea : "thumbnail"
};