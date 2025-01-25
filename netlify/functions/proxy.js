import fetch from 'node-fetch';

exports.handler = async function (event, context) {
  const { url } = event.queryStringParameters;
  if (!url) {
    return {
      statusCode: 400,
      body: 'Missing "url" query parameter.',
    };
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    return {
      statusCode: 200,
      headers: {
        'Cache-Control': 's-maxage=600, stale-while-revalidate=59',
        'Content-Type': 'text/html; charset=utf-8',
      },
      body: html,
    };
  } catch (error) {
    console.error('Error fetching the webpage:', error.message);
    return {
      statusCode: 500,
      body: 'Error fetching the webpage.',
    };
  }
};
