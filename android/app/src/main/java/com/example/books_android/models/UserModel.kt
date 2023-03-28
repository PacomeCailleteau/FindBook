package com.example.books_android.models

import kotlinx.serialization.Serializable

@Serializable
data class UserModel(
    val id: String,
    val login: String,
    val books: Array<BookModel>
)
