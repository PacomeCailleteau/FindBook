
# Findbook-Complément-Web
  
## Description de l'application

- Page Home : Permet de rechercher des livres et de les afficher sous forme de card.
- Page Livre : Permet d'afficher les informations d'un livre. Permet également de l'ajouter/retirer des favoris ou encore de l'acheter sur Amazon.  
- Page Favoris : Permet de trouver les livres mis en favoris par l'utilisateur. Si l'utilisateur n'est pas connecté alors on l'en informe et on lui met un lien de redirection vers la page de connection.  
- Page Connexion : Permet de se connecter.  
- Page Inscription : Permet de créer un compte.  
- Page Compte : Permet de pouvoir modifier son pseudo ainsi que son mot de passe. Cette page est accessible seulement si l'utilisateur est connecté.


## Installation

Installer le projet :

```bash
  git clone https://gitlab.univ-nantes.fr/pub/but/but2/sae4-real-01/eq_init_02_01_cailleteau-pacome_chusseau-nicolas_marthy-mathieu_tranchet-leo_vandemeulebroucke-bertin-nolan.git
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
### Partie client-web :

Se rendre dans le répertoire du client depuis la racine du projet:
```bash
  cd client
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

Lancer le client web :
```bash
  npm start
```

Le site s'ouvre dans votre [navigateur](http://localhost:3000).