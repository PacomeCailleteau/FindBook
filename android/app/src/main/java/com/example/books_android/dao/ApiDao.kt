package com.example.books_android

import android.app.Activity
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.books_android.models.UserModel
import com.example.books_android.models.TokenUserModel
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json

class ApiDao(private val context: Activity) {
    private val apiUrl = "http://10.0.2.2:3001"

    /**
     * Connect with login and password
     * @param login
     * @param password
     * @return Pair<String, UserModel> (token, user)
     */
    fun connectWithLoginPassword(login: String, password: String): Pair<String, UserModel> {
        val url = "$apiUrl/users/login/$login/$password"

        val queue = Volley.newRequestQueue(context)

        // Request a string response from the provided URL.
        val stringRequest = StringRequest(
            Request.Method.GET, url,
            { response ->
                val tokenUserModel = Json.decodeFromString<TokenUserModel>(response)
            },
            { error ->
                println("Error")
                println(error)
            })

        // Add the request to the RequestQueue.
        queue.add(stringRequest)
        return Pair("", UserModel("", "", arrayOf()))
    }
}
