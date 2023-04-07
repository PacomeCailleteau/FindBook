
# Findbook - serveur

## Installation 


Installer le projet :

```bash
  git clone https://gitlab.univ-nantes.fr/pub/but/but2/sae4-real-01/eq_init_02_01_cailleteau-pacome_chusseau-nicolas_marthy-mathieu_tranchet-leo_vandemeulebroucke-bertin-nolan.git
```
Se rendre dans le répertoire du serveur:
```bash
  cd server
```

Lancer le serveur la première fois :  
```bash
  npm run init
```

Relancer le serveur
```bash
  npm start
```

Le serveur s'ouvre dans votre [navigateur](http://localhost:3001).
</br>
</br>
    
Lancer les tests : 
```bash
  npm run test
```

Pour relancer le serveur après les tests : 
```bash
  rm ./prisma/books-sae-test.db
  npm run prisma
  npm start
```


Il se peut que certains tests ou certaines fonctionnalités liés au nombre de recherches (google trends) ne fonctionnent plus. C'est lié au fait que notre nombre de requêtes vers cette api est limité et que nous avons atteint le maximum. Si vous voulez avoir accès à cette api, il faut se [créer un compte](https://serpapi.com/users/sign_in) puis récupérer la clé d'api.
Ensuite il faut ouvrir le fichier /server/dao/statDao.mjs
À présent, il faut copier coller votre clé à la ligne 7 après 
```js 
&api_key=
```

Normalement cette clé est valide : 21681526c563e630603f40e72ebdfd98145bf451e73137229482e6bce28b2b7a


