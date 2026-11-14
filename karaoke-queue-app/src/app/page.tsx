'use client'

// Types
import { KaraokeFullQueue, KaraokeSpot } from "@/utils/types";

// Helpers
import { CSSProperties, useEffect, useState } from "react";
import { 
  advanceKaraokeQ, rewindKaraokeQ,        // Queue Manipulators
  updateKaraokeEntries, addToKaraokeQ ,
  getCurrentKaraokeEntry, getKaraokeQInfo, // Queue Getters
  useQueueType
} from "./scripts/queueActions";

// Services
import fetchKaraokeSignups from "@/services/karaokeSignups";

// Components
import SingerContainer from "./components/SingerContainer";
import KaraokeContainer from "./components/KaraokeContainer";

export default function Home() {


//#### Script ####//
const RESPONSE_CHECK_INTERVAL = 60 * 1000;

let 
[karaokeQueue, setKaraokeQueue] = useState<KaraokeFullQueue>({ nextSingers: [], pastSingers: [] }),
[currentEntry, setCurrentEntry] = useState<KaraokeSpot | null>(null),
[currentVideoSearchTerm, setCurrentVideoSearchTerm] = useState<string | null>(null);

useEffect(initialize, []);



//#### HTML Structure ####//
return (
<body style={bodyStyle}>
  <div style={sidesContainerStyle}>
    <KaraokeContainer
      gridArea="left"
      
      currentVideoSearchTerm={currentVideoSearchTerm}
      karaokeQueue={karaokeQueue}

      doAdvanceSinger={advanceSinger}
    />  
    <SingerContainer
      gridArea="right"

      spotlightSinger={currentEntry}

      doAdvanceSinger={advanceSinger}
      doRewindSinger={rewindSinger}
    />  
  </div>
</body>
);



//#### Functions ####/

// Dispatch the queue to be re-rendered
function updateQueue() {
  setKaraokeQueue(getKaraokeQInfo());
}

async function refreshQueue() {
  await checkNewSignups();
  updateQueue();
}

// Updates the queue and move to the next singer
async function advanceSinger() {
  await checkNewSignups();

  advanceKaraokeQ();

  updateCurrentSignup();
  updateQueue();
}

// Updates the queue and rewinds to the previous singer
async function rewindSinger() {
  await checkNewSignups();

  rewindKaraokeQ();

  // Refresh queue
  updateCurrentSignup();
  updateQueue();
}

// Checks for any new or udpated signups
async function checkNewSignups() {
  const signups = await fetchKaraokeSignups();

  // Update any edited signups and add new ones
  updateKaraokeEntries(signups.updatedSignups);
  signups.newSignups // Add new signups
    .sort((a, b) => a.submitTime - b.submitTime) // Sort signups based on created time
    .forEach(addToKaraokeQ);
}

// Refreshes the current selected song
async function updateCurrentSignup() {
  // Get the current singer and dispatch an update
  const currentEntry = getCurrentKaraokeEntry();
  setCurrentEntry(currentEntry);

  // Set the new search term
  const songTitle = currentEntry?.songTitle ?? "rick roll"; 
  setCurrentVideoSearchTerm(
    currentEntry?.vocalVersion == "Karaoke" ? // Add 'karaoke' to the search if the song version is karaoke
      songTitle + " karaoke" :
      songTitle
  );
}

// On Initialize
function initialize() {
  const queueUpdate = setInterval(refreshQueue, RESPONSE_CHECK_INTERVAL);

  useQueueType(new URLSearchParams(window.location.search).get("queue-type") ?? "");

  return () => {
    clearTimeout(queueUpdate);
  }
}

}

// #### Styles #### //
const bodyStyle : CSSProperties = {
  margin : "0px",
  backgroundColor : "#1d1a25",
  fontFamily : "Inter Roboto Arial"
};

const sidesContainerStyle : CSSProperties = {
  display : "grid",
  gridTemplateAreas : `
    "left right"
  `,
  gridTemplateColumns : "4fr 1fr",
  
  height : "100vh",
  width : "100vw",

  boxSizing : "border-box",
};