

cat > /mnt/user-data/outputs/vercel-deploy/api/airtable.js << 'EOF'
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { table, base, offset } = req.query;
  const token = process.env.AIRTABLE_TOKEN;

  // Debug info
  if (!token) { 
    res.status(500).json({ error: 'AIRTABLE_TOKEN environment variable is not set' }); 
    return; 
  }
  if (!table || !base) { 
    res.status(400).json({ error: `Missing params - base: ${base}, table: ${table}` }); 
    return; 
  }

  try {
    let url = `https://api.airtable.com/v0/${base}/${encodeURIComponent(table)}?pageSize=100`;
    if (offset) url += `&offset=${offset}`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const text = await response.text();
    
    let data;
    try {
      data = JSON.parse(text);
    } catch(e) {
      res.status(500).json({ error: `Non-JSON response: ${text.substring(0, 200)}` });
      return;
    }

    res.status(response.status).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message, stack: e.stack });
  }
}
EOF
cat /mnt/user-data/outputs/vercel-deploy/api/airtable.js
Output

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { table, base, offset } = req.query;
  const token = process.env.AIRTABLE_TOKEN;

  // Debug info
  if (!token) { 
    res.status(500).json({ error: 'AIRTABLE_TOKEN environment variable is not set' }); 
    return; 
  }
  if (!table || !base) { 
    res.status(400).json({ error: `Missing params - base: ${base}, table: ${table}` }); 
    return; 
  }

  try {
    let url = `https://api.airtable.com/v0/${base}/${encodeURIComponent(table)}?pageSize=100`;
    if (offset) url += `&offset=${offset}`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const text = await response.text();
    
    let data;
    try {
      data = JSON.parse(text);
    } catch(e) {
      res.status(500).json({ error: `Non-JSON response: ${text.substring(0, 200)}` });
      return;
    }

    res.status(response.status).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message, stack: e.stack });
  }
}
