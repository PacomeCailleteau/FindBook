package com.example.books_android.models

import kotlinx.serialization.Serializable

@Serializable
data class ErrorMessageModel(
    var message: String,
    val statusCode: Int
)
