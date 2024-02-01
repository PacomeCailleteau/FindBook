
# Findbook-Android


## Installation

Installer le projet :

```bash
  git clone [https://gitlab.univ-nantes.fr/pub/but/but2/sae4-real-01/eq_init_02_01_cailleteau-pacome_chusseau-nicolas_marthy-mathieu_tranchet-leo_vandemeulebroucke-bertin-nolan.git](https://github.com/PacomeCailleteau/FindBook.git)
```
    
## Déploiement

Voici les différentes étapes pour déployer le projet :


### Partie serveur :

Se rendre dans le répertoire du serveur:
```bash
  cd server
```

Installer la bonne version de node :
```bash
  npm.sh
  hash -r
```

Installer les modules :
```bash
  npm i
```

Génèrer la base de données :
```bash
  npm run prisma
```

Lancer le serveur :
```bash
  npm start
```

### Partie client-android :

Charger le répertoire `Android` sur Android Studio.

Lancer l'application.



