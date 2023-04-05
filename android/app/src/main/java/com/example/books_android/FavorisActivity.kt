package com.example.books_android

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageButton
import android.widget.SearchView

class FavorisActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_favoris)

        val btnHome = findViewById<ImageButton>(R.id.btnHome)
        val btnMonCompte = findViewById<ImageButton>(R.id.btnMoncompte)
        val btnLogo = findViewById<ImageButton>(R.id.btnLogo)
        val searchBar = findViewById<SearchView>(R.id.SearchBar)

        btnHome.setOnClickListener {
            val home = Intent(this@FavorisActivity,MainActivity::class.java)
            startActivity(home)
        }

        btnMonCompte.setOnClickListener {
            RedirectAccount.redirect(this@FavorisActivity)
        }

        btnLogo.setOnClickListener {
            val logo = Intent(this@FavorisActivity,MainActivity::class.java)
            startActivity(logo)
        }
    }
}