// api/proxy.js
import fetch from 'node-fetch';
export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('Missing "url" query parameter.');
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=59');

    res.status(200).send(html);
  } catch (error) {
    console.error('Error fetching the webpage:', error.message);
    res.status(500).send('Error fetching the webpage.');
  }
}
