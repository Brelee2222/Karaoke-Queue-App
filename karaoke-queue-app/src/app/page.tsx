'use client'

// Types
import { KaraokeFullQueue, KaraokeSpot } from "@/utils/types";

// Helpers
import { CSSProperties, useEffect, useState } from "react";
import { 
  advanceKaraokeQ, rewindKaraokeQ,        // Queue Manipulators
  updateKaraokeEntries, addToKaraokeQ ,
  getCurrentKaraokeEntry, getKaraokeQInfo // Queue Getters
} from "./scripts/queueActions";

// Services
import getKaraokeSignups from "@/services/karaokeSignups";

// Components
import SingerContainer from "./components/SingerContainer";
import KaraokeContainer from "./components/KaraokeContainer";

export default function Home() {


//#### Script ####//
const RESPONSE_CHECK_INTERVAL = 60 * 1000;

let 
qrURL = "",
[karaokeQueue, setKaraokeQueue] = useState<KaraokeFullQueue>({ nextSingers: [], pastSingers: [] }),
[currentEntry, setCurrentEntry] = useState<KaraokeSpot | null>(null),
[currentVideoSearchTerm, setCurrentVideoSearchTerm] = useState<string | null>(null);

useEffect(() => {
  const repeat = setInterval(async () => {
    await checkNewSignups();

    refreshQueue();
  }, RESPONSE_CHECK_INTERVAL);

  return () => clearTimeout(repeat);
}, []);



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

// Moves to the next signup entry in the queue
async function advanceSinger() {
  await checkNewSignups(); // Update the queue list before getting the next singer

  advanceKaraokeQ();

  refreshCurrentSignup();
  refreshQueue();
}

// Goes back to the previous entry in the queue
async function rewindSinger() {
  await checkNewSignups();

  rewindKaraokeQ();

  refreshCurrentSignup();
  refreshQueue();
}

// Checks for any new or udpated signups
async function checkNewSignups() {
  const signups = await getKaraokeSignups();

  updateKaraokeEntries(signups.updatedSignups); // Update edited signups
  signups.newSignups // Add new signups
    .sort((a, b) => a.submitTime - b.submitTime) // Sort signups
    .forEach(addToKaraokeQ);
}

// Re-renders the queue
function refreshQueue() {
  setKaraokeQueue(getKaraokeQInfo());
}

// Refreshes the current selected song
async function refreshCurrentSignup() {
  // Update the current Signup
  const currentEntry = getCurrentKaraokeEntry();
  setCurrentEntry(currentEntry);

  // Get the song title to search up 
  const songTitle = currentEntry?.songTitle ?? "rick roll"; 

  setCurrentVideoSearchTerm(
    currentEntry?.vocalVersion == "Karaoke" ? // Add 'karaoke' to the search if the song version is karaoke
      songTitle + " karaoke" :
      songTitle
  );
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