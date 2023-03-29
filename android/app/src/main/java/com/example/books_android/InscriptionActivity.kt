package com.example.books_android

import android.content.Intent
import android.graphics.Paint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageButton
import android.widget.TextView

class InscriptionActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_inscription)

        val btnHome = findViewById<ImageButton>(R.id.btnHome)
        val btnConnexion = findViewById<TextView>(R.id.textCreerCompteLink)
        val btnLogo = findViewById<ImageButton>(R.id.btnLogo)
        val btnFavoris = findViewById<ImageButton>(R.id.btnFavoris)
        val btnParam = findViewById<ImageButton>(R.id.btnParametre)
        btnConnexion.paintFlags = btnConnexion.paintFlags or Paint.UNDERLINE_TEXT_FLAG
        btnConnexion.setOnClickListener {
            val connexion = Intent(this@InscriptionActivity,ConnexionActivity::class.java)
            startActivity(connexion)
            finish()
        }

        btnLogo.setOnClickListener {
            val logo = Intent(this@InscriptionActivity,MainActivity::class.java)
            startActivity(logo)
            finish()
        }

        btnHome.setOnClickListener {
            val home = Intent(this@InscriptionActivity,MainActivity::class.java)
            startActivity(home)
            finish()
        }

        btnFavoris.setOnClickListener {
            val favoris = Intent(this@InscriptionActivity,FavorisActivity::class.java)
            startActivity(favoris)
            finish()
        }

        btnParam.setOnClickListener {
            val parametre = Intent(this@InscriptionActivity,ParamActivity::class.java)
            startActivity(parametre)
            finish()
        }
    }
}