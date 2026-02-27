module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { table, base, offset, fields, filterByFormula } = req.query;
  const token = 'patwWFrjQAyJOJ5PY.c4e8c77d6c085d107074c367d37c313347f2f31a7429d013f15851e1e73c4c67';

  if (!table || !base) { res.status(400).json({ error: 'Missing base or table param' }); return; }

  try {
    let url = `https://api.airtable.com/v0/${base}/${encodeURIComponent(table)}?pageSize=100`;
    if (offset) url += `&offset=${encodeURIComponent(offset)}`;
    if (fields) url += `&${fields}`;
    if (filterByFormula) url += `&filterByFormula=${encodeURIComponent(filterByFormula)}`;

    const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
