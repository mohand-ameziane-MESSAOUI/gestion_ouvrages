# lyman-app

``` bash

*******************************Installation*******************************************


# 1) Installer les dépendances du Backend.
    $ cd BackEnd
    $ npm install / npm i

# 2) Installer les dépendances du Frontend.
    $ cd FrontEnd
    $ npm install / npm i


******************************Lancement en mode Prod**********************************

# BACKEND
# 1) Aller dans le fichiers ".env" et mettez les bonnes configurations dans lesquelles vous voulez travailler.
# 2) Lancez la commande  : 
    $ npm start

# FRONTEND
# 1) Lancez la commande  : 
    $ npm run build

# 2) Lancez la commande  : 
    $ npm start


******************************Lancement en mode Dev***********************************


# 1) Aller dans le fichiers "nodemon.json" et mettez les bonnes configurations dans lesquelles vous voulez travailler.
  # Exemple de configuration 
    ```JavaScript   
     {"env": {
        "MONGODB_USER": "yourName",
        "MONGODB_PASSWORD": "password",
        "MONGODB_PROTOCOL" : "mongodb+srv",
        "MONGODB_HOST": "cluster0-hlbkz.mongodb.net",
        "MONGODB_PORT": "",
        "MONGODB_DATA": "dbname?retryWrites=true&w=majority",
        "JWT_KEY": "KEY",
        "PORT": "3000"}
}```
# 2) Lancez la commande  :
    $ npm run dev


*******************************Autre méthode*******************************************

# En utilisant le fichier MakeFile, vous trouverez également les étapes à suivres.
# L'execution de la commande 
    $ make -j2 run-app
# devrait installer et lancer l'application. =D =D 

******************************Version***********************************
#  en cas de problems de version mettez a jour la version de node
    $ v13.3.0

```