package com.example.books_android

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageButton

class AccountActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_moncompte)

        var btnHome = findViewById<ImageButton>(R.id.btnHome)
        var btnFavoris = findViewById<ImageButton>(R.id.btnFavoris)
        var btnLogo = findViewById<ImageButton>(R.id.btnLogo)

        btnLogo.setOnClickListener {
            val logo = Intent(this@AccountActivity,MainActivity::class.java)
            startActivity(logo)
            finish()
        }

        btnHome.setOnClickListener {
            val home = Intent(this@AccountActivity,MainActivity::class.java)
            startActivity(home)
            finish()
        }

        btnFavoris.setOnClickListener {
            val favoris = Intent(this@AccountActivity,FavorisActivity::class.java)
            startActivity(favoris)
            finish()
        }
    }
}