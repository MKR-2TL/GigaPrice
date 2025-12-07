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
      // Lire le fichier pending.json depuis le dossier public/data
      const filePath = path.join(process. cwd(), 'public', 'data', 'pending. json');
      
      try {
        const data = await fs.readFile(filePath, 'utf8');
        const promos = JSON.parse(data);
        
        console.log(`✅ API: Chargé ${promos.length} promos pending`);
        return res.status(200).json(promos);
      } catch (readError) {
        // Si le fichier n'existe pas ou est vide, retourner un tableau vide
        console.warn('⚠️ API: Fichier pending.json non trouvé ou vide');
        return res. status(200).json([]);
      }
    } catch (error) {
      console.error('❌ API get-pending-promos:', error. message);
      return res.status(200).json([]); // Retourner tableau vide en cas d'erreur
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}