package com.example.books_android

import android.content.Intent
import android.graphics.Paint
import android.os.Bundle
import android.widget.ImageButton
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class ConnexionActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connexion)

        val btnHome = findViewById<ImageButton>(R.id.btnHome)
        val btnLogo = findViewById<ImageButton>(R.id.btnLogo)
        val btnFavoris = findViewById<ImageButton>(R.id.btnFavoris)
        val btnParam = findViewById<ImageButton>(R.id.btnParametre)
        val btnInscription = findViewById<TextView>(R.id.textCreerCompteLink)
        btnInscription.paintFlags = btnInscription.paintFlags or Paint.UNDERLINE_TEXT_FLAG

        btnLogo.setOnClickListener {
            val logo = Intent(this@ConnexionActivity,MainActivity::class.java)
            startActivity(logo)
            finish()
        }

        btnHome.setOnClickListener {
            val home = Intent(this@ConnexionActivity,MainActivity::class.java)
            startActivity(home)
            finish()
        }

        btnFavoris.setOnClickListener {
            val favoris = Intent(this@ConnexionActivity,FavorisActivity::class.java)
            startActivity(favoris)
            finish()
        }

        btnParam.setOnClickListener {
            val parametre = Intent(this@ConnexionActivity,ParamActivity::class.java)
            startActivity(parametre)
            finish()
        }

        btnInscription.setOnClickListener {
            finish()
            val inscription = Intent(this@ConnexionActivity,InscriptionActivity::class.java)
            startActivity(inscription)
        }

        btnHome.setOnClickListener {
            finish()
            val home = Intent(this@ConnexionActivity,MainActivity::class.java)
            startActivity(home)
        }
    }
}