import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res. setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const filePath = path.join(process.cwd(), 'data', 'pending. json');
      
      try {
        const data = await fs.readFile(filePath, 'utf8');
        const promos = JSON.parse(data);
        console.log(`✅ ${promos.length} promos chargées`);
        return res.status(200).json(promos);
      } catch (e) {
        console.warn('⚠️ File not found');
        return res.status(200).json([]);
      }
    } catch (error) {
      console.error('❌ Erreur:', error. message);
      return res.status(200).json([]);
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
