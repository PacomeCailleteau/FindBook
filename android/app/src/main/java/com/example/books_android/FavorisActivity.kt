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
        val btnParam = findViewById<ImageButton>(R.id.btnMoncompte)
        val btnLogo = findViewById<ImageButton>(R.id.btnLogo)
        val searchBar = findViewById<SearchView>(R.id.SearchBar)

        btnHome.setOnClickListener {
            finish()
            val home = Intent(this@FavorisActivity,MainActivity::class.java)
            startActivity(home)
        }

        btnParam.setOnClickListener {
            finish()
            val param = Intent(this@FavorisActivity,AccountActivity::class.java)
            startActivity(param)
        }

        btnLogo.setOnClickListener {
            finish()
            val logo = Intent(this@FavorisActivity,MainActivity::class.java)
            startActivity(logo)
        }
    }
}