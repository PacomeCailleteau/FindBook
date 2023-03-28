package com.example.books_android.models

import kotlinx.serialization.Serializable

@Serializable
data class TokenUserModel(
    val token: String,
    val user: UserModel
)
