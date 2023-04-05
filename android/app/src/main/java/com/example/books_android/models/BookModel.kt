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
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as BookModel
        return isbn == other.isbn
    }
}
