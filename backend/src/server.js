import express from 'express';
import cors from 'cors';
import { getFormResponses, getKaraokeEntries } from './responses.js';
import { searchVideos } from './videoSearch.js';

const app = express();
const port = 8080;

app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/entries', async (req, res) => 
    res.send(await getKaraokeEntries(new Date(req.query.time)))
);

app.get('/videos', async (req, res) =>
    res.send(await searchVideos(req.query.search))
);

app.get('/responses', async (_, res) => 
    res.send(await getFormResponses())
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});