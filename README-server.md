
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









