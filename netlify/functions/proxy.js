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
    res.send(html); // Send the page HTML directly
  } catch (error) {
    console.error('Error fetching the webpage:', error.message);
    res.status(500).send('Error fetching the webpage.');
  }
});

api.use('/api/', router);

export const handler = serverless(api);
