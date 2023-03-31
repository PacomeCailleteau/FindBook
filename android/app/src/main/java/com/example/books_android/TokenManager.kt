package com.example.books_android

import android.app.Activity
import android.content.Context
import android.provider.Settings.System.getString

class TokenManager(activity: Activity) {
    private val sharedPref = activity.getSharedPreferences("token", Context.MODE_PRIVATE)

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
