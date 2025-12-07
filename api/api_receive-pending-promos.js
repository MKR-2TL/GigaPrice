import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res. setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { promos } = req.body;
    
    if (!Array.isArray(promos)) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    console.log(`📥 Reçu ${promos.length} promos du bot`);

    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });
    
    const filePath = path.join(dataDir, 'pending. json');
    await fs.writeFile(filePath, JSON.stringify(promos, null, 2));
    
    console.log(`✅ Sauvegardé: ${filePath}`);

    return res.status(200). json({
      success: true,
      message: `${promos.length} promos reçues`,
      count: promos.length
    });

  } catch (error) {
    console.error('❌ Erreur:', error. message);
    return res.status(500).json({ error: error.message });
  }
}
