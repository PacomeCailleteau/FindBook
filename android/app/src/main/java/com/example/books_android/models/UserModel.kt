package com.example.books_android.models

import kotlinx.serialization.Serializable

@Serializable
data class UserModel(
    val id: Int,
    val login: String,
    val books: List<BookModel>
)
