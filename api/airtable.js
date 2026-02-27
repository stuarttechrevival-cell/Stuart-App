const https = require('https');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { table, base, offset } = req.query;
  const token = process.env.AIRTABLE_TOKEN;

  if (!token) {
    res.status(500).json({ error: 'AIRTABLE_TOKEN not set' });
    return;
  }
  if (!table || !base) {
    res.status(400).json({ error: 'Missing base or table param' });
    return;
  }

  try {
    let url = `https://api.airtable.com/v0/${base}/${encodeURIComponent(table)}?pageSize=100`;
    if (offset) url += `&offset=${offset}`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
