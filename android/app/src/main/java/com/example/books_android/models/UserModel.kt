package com.example.books_android.models

data class UserModel(
    private val id: String,
    private val login: String,
    private val books: Array<BookModel>
)
