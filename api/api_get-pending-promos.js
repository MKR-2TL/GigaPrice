import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      // Essayer d'abord le dossier public/data
      let filePath = path.join(process. cwd(), 'public', 'data', 'pending.json');
      
      try {
        const data = await fs.readFile(filePath, 'utf8');
        const promos = JSON.parse(data);
        console.log(`✅ API: ${promos.length} promos chargées (public/data)`);
        return res.status(200).json(promos);
      } catch (e) {
        // Si pas trouvé, essayer la racine
        filePath = path. join(process.cwd(), 'data', 'pending.json');
        try {
          const data = await fs.readFile(filePath, 'utf8');
          const promos = JSON. parse(data);
          console. log(`✅ API: ${promos.length} promos chargées (data)`);
          return res. status(200).json(promos);
        } catch (e2) {
          console.warn('⚠️ Fichier pending.json non trouvé');
          return res.status(200).json([]);
        }
      }
    } catch (error) {
      console.error('❌ Erreur API:', error. message);
      return res.status(200).json([]);
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
