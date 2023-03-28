package com.example.books_android

import android.app.Activity
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.books_android.models.UserModel

class ApiDao(private val context: Activity) {
    private val apiUrl = "http://localhost:3000"

    /**
     * Connect with login and password
     * @param login
     * @param password
     * @return Pair<String, UserModel> (token, user)
     */
    fun connectWithLoginPassword(login: String, password: String): Pair<String, UserModel> {
        val url = "$apiUrl/login/$login/$password"

        val queue = Volley.newRequestQueue(context)

        // Request a string response from the provided URL.
        val stringRequest = StringRequest(
            Request.Method.GET, url,
            { response ->
                println(response)
            },
            { println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Error") })

        // Add the request to the RequestQueue.
        queue.add(stringRequest)
        return Pair("", UserModel("", "", arrayOf()))
    }
}
