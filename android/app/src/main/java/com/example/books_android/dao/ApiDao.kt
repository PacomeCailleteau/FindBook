package com.example.books_android.dao

import android.app.Activity
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.books_android.models.ErrorMessageModel
import java.security.MessageDigest

class ApiDao(context: Activity) {
    private val apiUrl = "http://10.0.2.2:3001"
    private val requestQueue = Volley.newRequestQueue(context)


    private fun request(method: Int, url: String, callbackSuccess: Response.Listener<String>, callbackError: (ErrorMessageModel) -> Unit) {
        // Request a string response from the provided URL.
        println(url)
        val stringRequest = StringRequest(
            method, url,
            callbackSuccess
        ) { error ->
            val networkResponse = error.networkResponse
            val statusCode = networkResponse?.statusCode ?: 0
            val errorMessage = ErrorMessageModel("error", statusCode)

            if (networkResponse?.data != null) {
                errorMessage.message = String(networkResponse.data)
            }

            callbackError(errorMessage)
        }

        // Add the request to the RequestQueue.
        this.requestQueue.add(stringRequest)
    }


    /**
     * Connect with login and password
     * @param login
     * @param password
     * @param callbackSuccess (String) -> Unit
     * @param callbackError (String) -> Unit
     */
    fun connectWithLoginPassword(login: String, password: String, callbackSuccess: (String) -> Unit, callbackError: (ErrorMessageModel) -> Unit) {

        val msgDigest = MessageDigest.getInstance("SHA-256")
        val hash = msgDigest.digest(password.toByteArray()).joinToString("") { "%02x".format(it) }
        val url = "$apiUrl/users/login/$login/$hash"

        this.request(Request.Method.GET, url, callbackSuccess, callbackError)
    }


    /**
     * Connect with token
     * @param token
     * @param callbackSuccess (String) -> Unit
     * @param callbackError (String) -> Unit
     * @return UserModel
     */
    fun connectWithToken(token: String, callbackSuccess: (String) -> Unit, callbackError: (ErrorMessageModel) -> Unit) {
        val url = "$apiUrl/users/$token"

        this.request(Request.Method.GET, url, callbackSuccess, callbackError)
    }


    /**
     * Create a new user
     * @param login (String)
     * @param password (String)
     * @param callbackSuccess (String) -> Unit
     * @param callbackError (String) -> Unit
     * @return UserModel
     */
    fun createUser(login: String, password: String, callbackSuccess: (String) -> Unit, callbackError: (ErrorMessageModel) -> Unit) {

        // hash password with sha256
        val msgDigest = MessageDigest.getInstance("SHA-256")
        val hash = msgDigest.digest(password.toByteArray()).joinToString("") { "%02x".format(it) }

        val url = "$apiUrl/users/create/$login/$hash"
        this.request(Request.Method.POST, url, callbackSuccess, callbackError)
    }


    /**
     * Get all books
     * @param isbn String
     * @param callbackSuccess (String) -> Unit
     * @param callbackError (String) -> Unit
     */
    fun findBookByIsbn(isbn: String, callbackSuccess: (String) -> Unit, callbackError: (ErrorMessageModel) -> Unit) {
        val url = "$apiUrl/books/isbn/$isbn"
        this.request(Request.Method.GET, url, callbackSuccess, callbackError)
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
