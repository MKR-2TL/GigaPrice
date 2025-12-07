// api/discord-auth.js
// ============================================
// API VERCEL POUR L'AUTHENTIFICATION DISCORD
// ============================================

export default async function handler(req, res) {
  // CORS - Accepter toutes les origines pour le développement
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Configuration
  const CLIENT_ID = '1446882468077768850';
  const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
  const REDIRECT_URI = `${req.headers.origin || req.headers.referer?.split('?')[0] || 'https://giga-price.vercel.app'}/`;
  const GUILD_ID = '1446582422375370877';
  const WEB_MANAGER_ROLE = '1446582422719303728';

  // LOG pour debug
  console.log('🔍 AUTH REQUEST:', {
    method: req.method,
    origin: req.headers.origin,
    referer: req.headers.referer,
    redirectUri: REDIRECT_URI
  });

  // Accepter uniquement POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.body;

  if (!code) {
    console.error('❌ Missing code in request body');
    return res.status(400).json({ error: 'Missing code' });
  }

  try {
    // ============================================
    // ÉTAPE 1 : Échanger le code contre un token
    // ============================================
    console.log('🔄 Exchanging code for token...');
    
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('❌ Token error:', tokenData);
      return res.status(400).json({ error: 'Invalid code', details: tokenData });
    }

    const accessToken = tokenData.access_token;
    console.log('✅ Token obtained');

    // ============================================
    // ÉTAPE 2 : Récupérer les infos de l'utilisateur
    // ============================================
    console.log('👤 Fetching user data...');
    
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = await userResponse.json();
    console.log('✅ User data:', userData.username);

    // ============================================
    // ÉTAPE 3 : Récupérer les infos du membre sur le serveur
    // ============================================
    console.log('🏰 Fetching guild member data...');
    
    const memberResponse = await fetch(
      `https://discord.com/api/users/@me/guilds/${GUILD_ID}/member`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    let isWebManager = false;

    if (memberResponse.ok) {
      const memberData = await memberResponse.json();
      console.log('📋 Member roles:', memberData.roles);
      
      // Vérifier si l'utilisateur a le rôle Web Manager
      isWebManager = memberData.roles.includes(WEB_MANAGER_ROLE);
      console.log('👑 Is Web Manager:', isWebManager);
    } else {
      console.warn('⚠️ Could not fetch member data:', memberResponse.status);
    }

    // ============================================
    // ÉTAPE 4 : Construire la réponse
    // ============================================
    const responseData = {
      user: {
        id: userData.id,
        username: userData.username,
        discriminator: userData.discriminator,
        avatar: userData.avatar 
          ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
          : `https://cdn.discordapp.com/embed/avatars/${parseInt(userData.discriminator) % 5}.png`,
      },
      isWebManager: isWebManager,
      accessToken: accessToken,
      timestamp: Date.now() // Pour la déconnexion auto
    };

    console.log('✅ Auth successful for:', userData.username);
    return res.status(200).json(responseData);

  } catch (error) {
    console.error('❌ Auth error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
}
