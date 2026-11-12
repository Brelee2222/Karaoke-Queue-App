import { VideoSearchResult } from "@/utils/types";

export default async function searchYoutubeVideos(search : string): Promise<VideoSearchResult[]> {
    const data = await fetch(`http://localhost:8080/videos?search=${encodeURIComponent(search)}`);

    return (await data.json()).videos;
} 