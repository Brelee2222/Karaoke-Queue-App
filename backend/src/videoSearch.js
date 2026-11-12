import { google } from 'googleapis';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
});

async function querySearchVideos(query) {
    return (await youtube.search.list({
        part: 'snippet', // Required to get titles, descriptions, and thumbnails
        q: query,        // Your search terms
        type: 'video',   // Restrict results to videos (options: channel, playlist)
        maxResults: 15    // Number of results to return (max 50)
    })).data.items;
}

export async function searchVideos(search) {
    let videos = await querySearchVideos(search);

    videos = videos.filter(result => result.id.videoId);

    return {
        videos
    };
}