# 📋 RÉSUMÉ COMPLET - GIGAPRICE
**Date : 08/12/2025 | Utilisateur : MKR-2TL**

---

## 🎮 LE PROJET

**GigaPrice** = Comparateur de prix de jeux vidéo
- **Bot Discord** (hébergé sur Sparkedhost/Pterodactyl)
- **Site Web** (hébergé sur Vercel, code sur GitHub)
- **Panel Admin** (Web Manager pour valider les promos)

---

## 🔄 COMMENT ÇA DOIT MARCHER

```
1. Bot récupère les promos (RAWG + CheapShark APIs)
         ↓
2. Bot envoie à Vercel (/api/receive-pending-promos.js)
         ↓
3. Promos stockées dans pending.json
         ↓
4. Admin valide sur admin.html
         ↓
5. Promos publiées → Discord + Site
```

---

## 📁 STRUCTURE GITHUB (MKR-2TL/GigaPrice)

```
├── index.html              ✅ OK
├── promo.html              ✅ OK
├── resultats.html          ✅ OK
├── admin.html              ✅ OK
├── alertes.html            ❌ N'EXISTE PAS (404)
├── historique.html         ❌ CASSÉ
├── SCHEMA.md               ✅ Créé pendant cette conversation
├── api/
│   ├── discord-auth.js           ✅ Existe
│   ├── get-pending-promos.js     ✅ Existe
│   ├── publish-promos.js         ✅ Existe
│   └── receive-pending-promos.js ✅ Existe
└── data/
    ├── pendig.json         ❌ TYPO (devrait être "pending.json")
    ├── history.json        ✅ Existe (vide)
    ├── published.json      ✅ Existe (vide)
    ├── promo_pc.json       ⚠️ Vide
    ├── promo_ps5.json      ⚠️ Vide
    ├── promo_xbox.json     ⚠️ Vide
    └── promo_switch.json   ⚠️ Vide
```

---

## ❌ PROBLÈMES ACTUELS

| # | Problème | Qui fix | Priorité |
|---|----------|---------|----------|
| 1 | `pendig.json` au lieu de `pending.json` (typo) | Pote | 🔴 |
| 2 | Bot erreur 404 quand il envoie à Vercel | Toi (vérifier URL) | 🔴 |
| 3 | Fichiers JSON tous vides | Bot doit les remplir | 🔴 |
| 4 | URLs cassées dans le bot (PC/Xbox/Switch) | Toi | 🔴 |
| 5 | `alertes.html` n'existe pas | Pote | 🟡 |
| 6 | `historique.html` cassé | Pote | 🟡 |

---

## 🔑 INFOS TECHNIQUES

### APIs utilisées
| API | Usage | Clé |
|-----|-------|-----|
| RAWG | Infos jeux | `ed6c45e2264a4c6aac17c4f3525362d9` |
| CheapShark | Prix PC (gratuit) | Pas de clé |
| Discord OAuth | Connexion users | Client ID: `1446882468077768850` |

### Charte graphique
| Élément | Valeur |
|---------|--------|
| Couleur principale | `#8a10db` (violet) |
| Couleur accent | `#4338ca` (violet foncé) |
| Couleur promo | `#ff003c` (rouge) |
| Background | `#0a0a0f` (noir) |
| Police | Inter (Google Fonts) |

### Couleurs plateformes
- PC : `#8a10db` (violet)
- PS5 : `#0070cc` (bleu)
- Xbox : `#107c10` (vert)
- Switch : `#e60012` (rouge)

---

## 🔗 LIENS

| Ressource | URL |
|-----------|-----|
| Site | https://giga-pricexyz.vercel.app |
| GitHub | https://github.com/MKR-2TL/GigaPrice |
| Discord | https://discord.gg/kSFqRNyn |
| Drive (code pote) | https://drive.google.com/drive/folders/1_-mDlu5P_iDXYNSuimODQUb1VxE4qF4c |

---

## 📊 MODE DE FONCTIONNEMENT CHOISI

**Pour l'instant : 100% Automatique**
- Le bot publie direct sans validation
- Plus simple tant que le bot n'est pas stable

**Plus tard : Hybride**
- Bot envoie en attente → Admin valide → Publication
- Quand le site sera fini et communauté plus grande

---

## ✅ À FAIRE EN PRIORITÉ

### Toi (Bot Discord)
1. Corriger les erreurs d'URL dans bot.js
2. Vérifier que le bot envoie vers : `https://giga-pricexyz.vercel.app/api/receive-pending-promos`
3. Tester `!update`

### Ton pote (Site/Vercel)
1. Renommer `data/pendig.json` → `data/pending.json`
2. Créer `alertes.html` (placeholder)
3. Réparer `historique.html`
4. Mettre son nouveau code (Drive) sur GitHub

---

## 💡 NOTES IMPORTANTES

1. **Prix PC** = vrais prix (CheapShark API)
2. **Prix PS5/Xbox/Switch** = "Voir les offres" (pas d'API gratuite pour les vrais prix)
3. **Fichiers JSON vides** = normal, c'est le bot qui doit les remplir
4. **Affiliation** = reportée (site pas fini, serveur trop petit)
5. **Ton pote a refait le site en CSS/HTML** sur le Drive, pas encore push sur GitHub

---

## 📄 FICHIERS CRÉÉS PENDANT CETTE CONVERSATION

- `SCHEMA.md` - Schéma technique simplifié
- `final.md` - Ce fichier (résumé complet)

---

**Dernière mise à jour : 08/12/2025**