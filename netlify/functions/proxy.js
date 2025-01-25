import express, { Router } from 'express';
import serverless from 'serverless-http';

const api = express();

const router = Router();

router.get('/proxy', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('Missing "url" query parameter.');
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    res.setHeader('Cache-Control', 'maxage=600, stale-while-revalidate=59');
    res.send(html); // Send the page HTML directly
  } catch (error) {
    console.error('Error fetching the webpage:', error.message);
    res.status(500).send('Error fetching the webpage.');
  }
});

api.use('/', router);

export const handler = serverless(api);
