# 🎮 GIGAPRICE - Guide Technique

## 📊 Comment ça doit marcher

```
RAWG + CheapShark → BOT DISCORD → API VERCEL → pending.json → ADMIN VALIDE → published.json → DISCORD + SITE
```

---

## 🔄 Flux simplifié

```
1. Bot récupère les promos (APIs)
         ↓
2. Bot envoie à Vercel (/api/receive.js)
         ↓
3. Promos stockées dans pending.json
         ↓
4. Admin valide sur admin.html
         ↓
5. Promos publiées → Discord + Site
```

---

## ❌ Problèmes actuels

| # | Problème | Qui doit fix |
|---|----------|--------------|
| 1 | `pendig.json` au lieu de `pending.json` (typo) | Pote |
| 2 | `/api/receive.js` n'existe pas | Pote |
| 3 | Bot erreur 404 quand il envoie à Vercel | Pote (créer l'API) |
| 4 | URLs cassées dans le bot (PC/Xbox/Switch) | Toi |

---

## ✅ À faire

### Pote (Vercel/Site)
- [ ] Renommer `data/pendig.json` → `data/pending.json`
- [ ] Créer `api/receive.js` (endpoint pour recevoir les promos)
- [ ] Vérifier que `admin.html` lit `pending.json`

### Toi (Bot Discord)
- [ ] Corriger les erreurs d'URL
- [ ] Tester `!update` quand l'API sera prête

---

## 📁 Structure

```
BOT (Sparkedhost)          VERCEL (GitHub)
├── bot.js                 ├── api/receive.js ← À CRÉER
├── config.json            ├── data/pending.json ← TYPO
└── data/stats.json        ├── admin.html
                           └── promo.html
```

---

## 🔗 Liens
- Site: https://giga-pricexyz.vercel.app
- GitHub: https://github.com/MKR-2TL/GigaPrice
- Discord: https://discord.gg/kSFqRNyn
