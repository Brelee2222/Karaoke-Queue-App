import { KaraokeEntry } from "@/utils/types";

type KaraokeSignUpsUpdate = {
    newSignups : KaraokeEntry[],
    updatedSignups : KaraokeEntry[]
};

let lastQueryTime = new Date().toISOString();

export default async function getKaraokeSignups() : Promise<KaraokeSignUpsUpdate> {
    const data = await fetch(`http://${window.location.hostname}:8080/entries?time=${lastQueryTime}`);

    lastQueryTime = new Date().toISOString();
    
    return await data.json();
}