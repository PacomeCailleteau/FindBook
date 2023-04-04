package com.example.books_android

import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.TextView
import com.example.books_android.models.BookModel
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json

class BookActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_book)
        val btnHome = findViewById<ImageButton>(R.id.btnHome)
        val btnFavoris = findViewById<ImageButton>(R.id.btnFavoris)
        val btnLogo = findViewById<ImageButton>(R.id.btnLogo)
        val btnParam = findViewById<ImageButton>(R.id.btnMoncompte)

        val titreBookBook = findViewById<TextView>(R.id.titreBookBook)
        val auteurBookBook = findViewById<TextView>(R.id.auteurBookBook)
        val dateBookBook = findViewById<TextView>(R.id.dateBookBook)
        val isbnBookBook = findViewById<TextView>(R.id.isbnBookBook)
        val descriptionBookBook = findViewById<TextView>(R.id.descriptionBookBook)
        val imageBook = findViewById<ImageView>(R.id.imageBook)

        val book = Json.decodeFromString<BookModel>(intent.getStringExtra("book")!!)

        // - Insertion des données dans les TextView -
        titreBookBook.text = book.title
        if (book.authors != null) {
            val authorsString = book.authors.joinToString(", ")
            auteurBookBook.text = authorsString
        }
        val dateString = book.publishedDate
        println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> $dateString")
        dateBookBook.text = dateString
        isbnBookBook.text = book.isbn
        descriptionBookBook.text = book.description

        if (book.cover != null) {
            val uri = Uri.parse(book.cover)
            imageBook.setImageURI(uri)
        } else {
            imageBook.setImageResource(R.drawable.not_found)
        }


        // -- Redirection vers les autres activités -- //
        btnLogo.setOnClickListener {
            val logo = Intent(this@BookActivity,MainActivity::class.java)
            startActivity(logo)
            finish()
        }

        btnHome.setOnClickListener {
            val home = Intent(this@BookActivity,MainActivity::class.java)
            startActivity(home)
            finish()
        }

        btnFavoris.setOnClickListener {
            val favoris = Intent(this@BookActivity,FavorisActivity::class.java)
            startActivity(favoris)
            finish()
        }

        btnParam.setOnClickListener {
            val parametre = Intent(this@BookActivity,FavorisActivity::class.java)
            startActivity(parametre)
            finish()
        }
        // -----

    }
}