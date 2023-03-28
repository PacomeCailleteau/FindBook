package com.example.books_android.dao

import android.app.Activity
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import java.security.MessageDigest

class ApiDao(context: Activity) {
    private val apiUrl = "http://10.0.2.2:3001"
    private val requestQueue = Volley.newRequestQueue(context)


    private fun request(method: Int, url: String, callback: Response.Listener<String>) {
        // Request a string response from the provided URL.
        val stringRequest = StringRequest(
            method, url,
            callback
        ) { error ->
            println("Error")
            println(error)
        }

        // Add the request to the RequestQueue.
        this.requestQueue.add(stringRequest)
    }


    /**
     * Connect with login and password
     * @param login
     * @param password
     * @return Pair<String, UserModel> (token, user)
     */
    fun connectWithLoginPassword(login: String, password: String, callback: (String) -> Unit) {

        val msgDigest = MessageDigest.getInstance("SHA-256")
        val hash = msgDigest.digest(password.toByteArray()).joinToString("") { "%02x".format(it) }
        val url = "$apiUrl/users/login/$login/$hash"

        this.request(Request.Method.GET, url) {
            callback(it)
        }
    }


    /**
     * Connect with token
     * @param token
     * @return UserModel
     */
    fun connectWithToken(token: String, callback: (String) -> Unit) {
        val url = "$apiUrl/users/$token"

        this.request(Request.Method.GET, url) {
            callback(it)
        }
    }


    /**
     * Create a new user
     * @param login
     * @param password
     * @return UserModel
     */
    fun createUser(login: String, password: String, callback: (String) -> Unit) {

        // hash password with sha256
        val msgDigest = MessageDigest.getInstance("SHA-256")
        val hash = msgDigest.digest(password.toByteArray()).joinToString("") { "%02x".format(it) }

        val url = "$apiUrl/users/create/$login/$hash"
        this.request(Request.Method.POST, url) {
            callback(it)
        }
    }


    /**
     * Get all books
     * @param isbn String
     * @param callback (String) -> Unit
     */
    fun findBookByIsbn(isbn: String, callback: (String) -> Unit) {
        val url = "$apiUrl/books/isbn/$isbn"
        this.request(Request.Method.GET, url) {
            callback(it)
        }
    }


    companion object {
        private var instance: ApiDao? = null

        fun getInstance(context: Activity): ApiDao {
            if (instance == null) {
                instance = ApiDao(context)
            }
            return instance!!
        }
    }
}
