package com.example.books_android.dao

import android.app.Activity
import com.android.volley.*
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.books_android.models.ErrorMessageModel
import com.nfeld.jsonpathkt.JsonPath
import com.nfeld.jsonpathkt.extension.read
import org.json.JSONObject
import java.nio.charset.Charset
import java.security.MessageDigest


class ApiDao private constructor(private val context: Activity) {
    private val apiUrl = "http://10.0.2.2:3001"
    private val requestQueue = Volley.newRequestQueue(context)

    private fun hashPassword(password: String): String {
        val msgDigest = MessageDigest.getInstance("SHA-256")
        return msgDigest.digest(password.toByteArray()).joinToString("") { "%02x".format(it) }
    }

    private fun request(
        method: Int,
        url: String,
        payload: JSONObject?,
        callbackSuccess: Response.Listener<String>,
        callbackError: (ErrorMessageModel) -> Unit
    ) {
        // Request a string response from the provided URL.
        val stringReq: StringRequest =
            object : StringRequest(method, url,
                callbackSuccess,
                { error ->
                    val networkResponse = error.networkResponse
                    val statusCode = networkResponse?.statusCode ?: 0
                    val errorMessage = ErrorMessageModel("error $statusCode", statusCode)

                    if (networkResponse?.data != null) {
                        val message = JsonPath.parse(String(networkResponse.data))
                            ?.read<String>("$.message")!!
                        errorMessage.message = message
                    }

                    callbackError(errorMessage)
                }
            ) {
                override fun getHeaders(): MutableMap<String, String> {
                    val headers = HashMap<String, String>()
                    headers["Content-Type"] = "application/json"
                    return headers
                }

                override fun getBodyContentType(): String {
                    return "application/json; charset=utf-8"
                }

                override fun getBody(): ByteArray {
                    return payload?.toString()?.toByteArray(Charset.forName("utf-8")) ?: super.getBody()
                }
            }

        // Add the request to the RequestQueue.
        this.requestQueue.add(stringReq)
    }


    /**
     * Connect with login and password
     * @param login
     * @param password
     * @param callbackSuccess (String) -> Unit
     * @param callbackError (ErrorMessageModel) -> Unit
     */
    fun connectWithLoginPassword(
        login: String,
        password: String,
        callbackSuccess: (String) -> Unit,
        callbackError: (ErrorMessageModel) -> Unit
    ) {
        val hash = this.hashPassword(password)
        val url = "$apiUrl/users/login/$login/$hash"
        this.request(Request.Method.GET, url, null, callbackSuccess, callbackError)
    }


    /**
     * Connect with token
     * @param token
     * @param callbackSuccess (String) -> Unit
     * @param callbackError (ErrorMessageModel) -> Unit
     * @return UserModel
     */
    fun connectWithToken(
        token: String,
        callbackSuccess: (String) -> Unit,
        callbackError: (ErrorMessageModel) -> Unit
    ) {
        val url = "$apiUrl/users/$token"
        this.request(Request.Method.GET, url, null, callbackSuccess, callbackError)
    }


    /**
     * Create a new user
     * @param login (String)
     * @param password (String)
     * @param callbackSuccess (String) -> Unit
     * @param callbackError (ErrorMessageModel) -> Unit
     * @return UserModel
     */
    fun createAccount(
        login: String,
        password: String,
        callbackSuccess: (String) -> Unit,
        callbackError: (ErrorMessageModel) -> Unit
    ) {

        val hashedPassword = this.hashPassword(password)

        val url = "$apiUrl/users/create"
        val payload = JSONObject()
        payload.put("login", login)
        payload.put("password", hashedPassword)

        this.request(Request.Method.POST, url, payload, callbackSuccess, callbackError)
    }


    /**
     * Get all books
     * @param isbn String
     * @param callbackSuccess (String) -> Unit
     * @param callbackError (ErrorMessageModel) -> Unit
     */
    fun findBookByIsbn(isbn: String, callbackSuccess: (String) -> Unit, callbackError: (ErrorMessageModel) -> Unit) {
        val url = "$apiUrl/books/isbn/$isbn"
        this.request(Request.Method.GET, url, null, callbackSuccess, callbackError)
    }


    /**
     * Get all books
     * @param searchTerm String
     * @param callbackSuccess (String) -> Unit
     * @param callbackError (ErrorMessageModel) -> Unit
     */
    fun findBooksBySearchTerm(searchTerm: String, callbackSuccess: (String) -> Unit, callbackError: (ErrorMessageModel) -> Unit) {
        val url = "$apiUrl/books/search/$searchTerm"
        this.request(Request.Method.GET, url, null, callbackSuccess, callbackError)
    }


    /**
     * Add book to user
     * @param token String
     * @param isbn String
     * @param callbackSuccess (String) -> Unit
     * @param callbackError (ErrorMessageModel) -> Unit
     */
    fun addBookToUser(token: String, isbn: String, callbackSuccess: (String) -> Unit, callbackError: (ErrorMessageModel) -> Unit) {
        val url = "$apiUrl/users/addBook/$token"
        val payload = JSONObject()
        payload.put("isbn", isbn)

        this.request(Request.Method.POST, url, payload, callbackSuccess, callbackError)
    }


    /**
     * Remove book from user
     * @param token String
     * @param isbn String
     * @param callbackSuccess (String) -> Unit
     * @param callbackError (ErrorMessageModel) -> Unit
     */
    fun removeBookFromUser(token: String, isbn: String, callbackSuccess: (String) -> Unit, callbackError: (ErrorMessageModel) -> Unit) {
        val url = "$apiUrl/users/removeBook/$token/$isbn"
        this.request(Request.Method.DELETE, url, null, callbackSuccess, callbackError)
    }


    /**
     * Delete user
     * @param token String
     * @param callbackSuccess (String) -> Unit
     * @param callbackError (ErrorMessageModel) -> Unit
     */
    fun deleteAccount(token: String, callbackSuccess: (String) -> Unit, callbackError: (ErrorMessageModel) -> Unit) {
        val url = "$apiUrl/users/delete/$token"
        this.request(Request.Method.DELETE, url, null, callbackSuccess, callbackError)
    }


    /**
     * Change password
     * @param token String
     * @param newPassword String
     * @param callbackSuccess (String) -> Unit
     * @param callbackError (ErrorMessageModel) -> Unit
     */
    fun changePassword(token: String, newPassword: String, callbackSuccess: (String) -> Unit, callbackError: (ErrorMessageModel) -> Unit) {

        val hasedPassword = this.hashPassword(newPassword)
        val url = "$apiUrl/users/update/password/$token"
        val payload = JSONObject()
        payload.put("password", hasedPassword)

        this.request(Request.Method.PUT, url, payload, callbackSuccess, callbackError)
    }


    /**
     * Change login
     * @param token String
     * @param newLogin String
     * @param callbackSuccess (String) -> Unit
     * @param callbackError (ErrorMessageModel) -> Unit
     */
    fun changeLogin(token: String, newLogin: String, callbackSuccess: (String) -> Unit, callbackError: (ErrorMessageModel) -> Unit) {
        val url = "$apiUrl/users/update/login/$token"
        val payload = JSONObject()
        payload.put("login", newLogin)

        this.request(Request.Method.PUT, url, payload, callbackSuccess, callbackError)
    }

    fun stat(searchTerm: String, callbackSuccess: (String) -> Unit, callbackError: (ErrorMessageModel) -> Unit) {
        val url = "$apiUrl/stat/$searchTerm"
        this.request(Request.Method.GET, url, null, callbackSuccess, callbackError)
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
