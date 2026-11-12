export type KaraokeSpot = {
    readonly singerName : string,
    readonly songTitle : string,
    readonly vocalVersion : string,
};

export type KaraokeEntry = KaraokeSpot & {
    readonly entryID : string,
    readonly submitTime : number
};

export type KaraokeFullQueue = {
    nextSingers : KaraokeEntry[],
    pastSingers : KaraokeEntry[]
};

export type VideoSearchResult = {
    id : { videoId : string },
    snippet : {
        title : string,
        channelTitle : string,
        thumbnails : { default : {
            url : string,
            width : number,
            height : number
        }}
    }
}