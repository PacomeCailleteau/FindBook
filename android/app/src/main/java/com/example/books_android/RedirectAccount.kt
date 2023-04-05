package com.example.books_android

import android.app.Activity
import android.content.Intent
import com.example.books_android.dao.ApiDao
import com.nfeld.jsonpathkt.JsonPath
import com.nfeld.jsonpathkt.extension.read

class RedirectAccount {
    companion object {
        /**
         * Redirige vers la page de connexion si l'utilisateur n'est pas connecté
         * Redirige vers la page mon compte si l'utilisateur est connecté
         */
        fun redirect(activity: Activity) {
            // - Initialisation des classes -
            val tokenManager = TokenManager(activity)
            val apiDao = ApiDao.getInstance(activity)

            // si le token n'existe pas, on redirige vers la page de connexion
            if (!tokenManager.tokenExists()) {
                val connexion = Intent(activity, ConnexionActivity::class.java)
                activity.startActivity(connexion)
            } else {
                // si le token existe, on vérifie que le token soit bien associé à un utilisateur
                // vérification de la connexion
                apiDao.connectWithToken(tokenManager.getToken(),
                    { response ->
                        // L'utilisateur est connecté
                        // On affiche la page mon compte
                        val userLogin = JsonPath.parse(response)?.read<String>("$.login")!!

                        val account = Intent(activity, AccountActivity::class.java)
                            .putExtra("userLogin", userLogin)
                        activity.startActivity(account)

                    }, {
                        // L'utilisateur n'est pas connecté
                        // on supprime le token invalide
                        tokenManager.setToken("")
                        val connexion = Intent(activity, ConnexionActivity::class.java)
                        activity.startActivity(connexion)
                    }
                )
            }
        }
    }
}
