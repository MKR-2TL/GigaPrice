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

    if (promos.length === 0) {
      return res.status(400).json({ error: 'No promos provided' });
    }

    console.log(`📥 Reçu ${promos.length} promos`);

    // Trier par plateforme
    const byPlatform = {
      pc: [],
      ps5: [],
      xbox: [],
      switch: []
    };

    for (const promo of promos) {
      const platform = promo.plateforme || 'pc';
      if (byPlatform[platform]) {
        byPlatform[platform].push(promo);
      }
    }

    // Déterminer le chemin
    let dataDir = path.join(process.cwd(), 'public', 'data');
    try {
      await fs.access(dataDir);
    } catch {
      dataDir = path.join(process.cwd(), 'data');
    }

    await fs.mkdir(dataDir, { recursive: true });

    // Sauvegarder les fichiers
    const files = {
      'promo_pc.json': byPlatform.pc,
      'promo_ps5.json': byPlatform. ps5,
      'promo_xbox.json': byPlatform.xbox,
      'promo_switch.json': byPlatform.switch
    };

    for (const [filename, data] of Object.entries(files)) {
      const filePath = path.join(dataDir, filename);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      console.log(`✅ ${filename}: ${data.length} promos`);
    }

    // Vider pending
    const pendingPath = path.join(dataDir, 'pending.json');
    await fs.writeFile(pendingPath, JSON.stringify([], null, 2));

    return res.status(200).json({
      success: true,
      message: `${promos.length} promos publiées`,
      details: {
        pc: byPlatform.pc. length,
        ps5: byPlatform.ps5.length,
        xbox: byPlatform.xbox.length,
        switch: byPlatform.switch.length
      }
    });

  } catch (error) {
    console.error('❌ Erreur:', error. message);
    return res.status(500).json({ error: error.message });
  }
}
