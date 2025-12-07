// api/discord-auth.js
// ============================================
// API VERCEL POUR L'AUTHENTIFICATION DISCORD
// ============================================

export default async function handler(req, res) {
  // Configuration
  const CLIENT_ID = '1446882468077768850';
  const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET; // Stocké dans Vercel
  const REDIRECT_URI = `${req.headers.origin || 'https://ton-site.vercel.app'}/`;
  const GUILD_ID = '1446582422375370877';
  const WEB_MANAGER_ROLE = '1446582422719303728';

  // Accepter uniquement POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Missing code' });
  }

  try {
    // ============================================
    // ÉTAPE 1 : Échanger le code contre un token
    // ============================================
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
      console.error('Token error:', tokenData);
      return res.status(400).json({ error: 'Invalid code' });
    }

    const accessToken = tokenData.access_token;

    // ============================================
    // ÉTAPE 2 : Récupérer les infos de l'utilisateur
    // ============================================
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = await userResponse.json();

    // ============================================
    // ÉTAPE 3 : Récupérer les infos du membre sur le serveur
    // ============================================
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
      
      // Vérifier si l'utilisateur a le rôle Web Manager
      isWebManager = memberData.roles.includes(WEB_MANAGER_ROLE);
    }

    // ============================================
    // ÉTAPE 4 : Construire la réponse
    // ============================================
    const responseData = {
      user: {
        id: userData.id,
        username: userData.username,
        discriminator: userData.discriminator,
        avatar: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`,
      },
      isWebManager: isWebManager,
      accessToken: accessToken, // Pour les futures requêtes
    };

    return res.status(200).json(responseData);

  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
