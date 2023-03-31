package com.example.books_android.models
import kotlinx.serialization.Serializable

@Serializable
data class BookModel(
    private val isbn: String,
    private val title: String,
    private val cover: String?,
    private val authors: String?,
    private val publishedDate: String?,
    private val description: String?
)
