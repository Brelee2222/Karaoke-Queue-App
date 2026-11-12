import QueueSpot from "@/app/components/karaokeQueue/QueueSpot";
import { CSSProperties } from "react";
import { KaraokeEntry } from "@/utils/types";
import { headerTextColor, smoothBoxStyle } from "@/constants/styles.constants";

export default function KaraokeQueue( props : {
    gridArea : string,
    title : string,
    karaokeQueue : KaraokeEntry[],
    color : string,
}) {


const {
    gridArea,
    title,
    karaokeQueue,
    color
} = props;

return (
<div style={{gridArea, ...containerStyle}}>
    <span style={queueLabelStyle}>{title}</span>
    {karaokeQueue.map(karaokeEntry => 
        <QueueSpot {...karaokeEntry}
            key={`karaoke-entry-${karaokeEntry.entryID}`}
            color={color}
        />
    )}
</div>
)
}

export const containerStyle : CSSProperties = {
  padding : "0.25em",

  ...smoothBoxStyle,
  backgroundColor : "#252323",

  overflowY : "scroll",
  scrollbarWidth: "none"
};

export const queueLabelStyle : CSSProperties = {
  padding : "0px",
  color : headerTextColor,

  fontSize : "1.25em",
  fontWeight : "bolder"
};

export const upcomingEntriesStyle : CSSProperties = {
  color : "#302638",
  backgroundColor : "#938c8c",
};

export const pastEntriesStyle : CSSProperties = {
  color : "white",
  backgroundColor : "#938c8c"
};