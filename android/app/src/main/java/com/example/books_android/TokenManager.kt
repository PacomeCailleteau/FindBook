package com.example.books_android

import android.app.Activity
import android.content.Context
import android.provider.Settings.System.getString

class TokenManager(activity: Activity) {
    private val sharedPref = activity.getSharedPreferences("token", Context.MODE_PRIVATE)

    /**
     * Enregistre le token dans les préférences
     * @param token le token à enregistrer
     */
    fun setToken(token: String) {
        with(sharedPref.edit()) {
            putString("token", token)
            apply()
        }
    }

    /**
     * Récupère le token enregistré
     * @return le token enregistré
     */
    fun getToken(): String {
        return sharedPref.getString("token", "")!!
    }

    /**
     * Vérifie si un token existe
     * @return true si un token existe, false sinon
     */
    fun tokenExists(): Boolean {
        return this.getToken() != ""
    }
}
