package com.example.books_android

import android.app.Activity
import android.content.Context

class TokenManager(activity: Activity) {
    private val sharedPref = activity.getPreferences(Context.MODE_PRIVATE)

    fun setToken(token: String) {
        with(sharedPref.edit()) {
            putString("token", token)
            apply()
        }
    }

    fun getToken(): String {
        return sharedPref.getString("token", "")!!
    }

    fun tokenExists(): Boolean {
        return this.getToken() != ""
    }
}
