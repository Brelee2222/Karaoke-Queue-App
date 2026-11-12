import { CSSProperties, useEffect, useState } from 'react';
import YouTube, { YouTubeEvent } from 'react-youtube';
import searchYoutubeVideos from "@/services/karaokeVideos";
import { VideoSearchResult } from '@/utils/types';
import VideoOption from './VideoOption';

const OPTS = {
    height : "100%",
    width : "100%",
    playerVars: {
    // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 1,
        fs : 0,
        disablekb: 1,
    },
};

export default function VideoPlayer(props : 
    { 
        videoSearchTerm: string, 
        onEnd? : () => void, 
        onPlay? : () => void,
        onPause? : () => void
    }
) {
    

//#### Script ####//
const {
    onEnd,
    onPlay,
    onPause
} = props;

let 
[videoSearchResults, setVideoSearchResults] = useState<VideoSearchResult[]>([]),
[videoId, setVideoId] = useState<string | null>(null);

useEffect(searchVideos, [props.videoSearchTerm]);




//#### HTML Element ####//
return (

<div style={vPlayerStyle}>
    <div style={{...vOptionsStyle, display: !videoId ? "block" : "none" }}>
        {videoSearchResults.map(searchResult =>(
            <VideoOption {...searchResult}
                key={`videoResult-${searchResult.id.videoId}`}
                onVideoSelected={setVideoId}
            />
        ))}
    </div>
    
    <YouTube style={{ display : videoId ? "inline" : "none" }}
        videoId={videoId ?? ""} 
        opts={OPTS}

        onEnd={onEnd}
        onPlay={onPlay}
        onPause={onPause}
    />

</div>

);




//#### Functions ####//
function searchVideos() {
    if(props.videoSearchTerm) 
        searchYoutubeVideos(props.videoSearchTerm)
            .then(setVideoSearchResults)
            .finally(() => setVideoId(null));
}

}

// #### Styles #### //

const vPlayerStyle : CSSProperties = {
    gridArea : "videoPlayer",

    backgroundColor : "black",

    height : "100%"
};

const vOptionsStyle : CSSProperties = {
    overflowY : "scroll",
    scrollbarWidth : "none",

    height : "100%",

    minHeight : "0px"
};