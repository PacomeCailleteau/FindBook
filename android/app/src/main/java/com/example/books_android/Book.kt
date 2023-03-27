package com.example.books_android

data class Book (
    var title: String,
    var image: String,
    var isbn: String,
    var auteurs: Array<String>,
    var date: String,
    var categorie: String,
    var description: String
) : Comparable<Book> {

    override fun toString(): String {
        return super.toString()
    }

    override fun compareTo(other: Book): Int {
        return this.title.compareTo(other.title)
    }

}