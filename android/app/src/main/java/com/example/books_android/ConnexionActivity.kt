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
        val btnInscription = findViewById<TextView>(R.id.textCreerCompteLink)
        btnInscription.paintFlags = btnInscription.paintFlags or Paint.UNDERLINE_TEXT_FLAG

        btnInscription.setOnClickListener {
            val inscription = Intent(this@ConnexionActivity,InscriptionActivity::class.java)
            startActivity(inscription)
        }

        btnHome.setOnClickListener {
            finish()
        }
    }
}