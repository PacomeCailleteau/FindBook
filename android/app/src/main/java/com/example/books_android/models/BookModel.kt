package com.example.books_android.models
import kotlinx.serialization.Serializable

@Serializable
data class BookModel(
    val isbn: String,
    val title: String,
    val cover: String? = null,
    val authors: List<String>? = null,
    val publishedDate: String? = null,
    val description: String? = null
)
