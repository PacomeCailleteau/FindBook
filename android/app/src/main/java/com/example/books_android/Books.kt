package com.example.books_android

class Books {
    companion object {

        val COMPARATOR = Comparator<Book> { t0, t1 -> t0.compareTo(t1) }
        val COMPARATOR_ALPHABETICAL = Comparator<Book> { t0, t1 -> t0.title.compareTo(t1.title) }

        fun initBookslist(): MutableList<Book> {
            return mutableListOf<Book>(
                Book("Le chat","monimage.png","ab0123456789", arrayOf("moi"),"10/12/2022","Fantastique","Le chat marche et tombe"),
                Book("Le chien","monimage.png","ab0123456798", arrayOf("moi","pas toi"),"11/12/2022","Fantastique","Le chien marche et tombe"),
                Book("Le renard","monimage.png","ab0123452587", arrayOf("moi", "pasnous"),"12/12/2022","Fantastique","Le renard marche et tombe")
                )
        }
    }
}