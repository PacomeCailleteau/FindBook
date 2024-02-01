
# Findbook-Android


## Installation

Installer le projet :

```bash
  git clone https://github.com/PacomeCailleteau/FindBook.git
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



