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
        btnConnexion.paintFlags = btnConnexion.paintFlags or Paint.UNDERLINE_TEXT_FLAG
        btnConnexion.setOnClickListener {
            finish()
        }

        btnHome.setOnClickListener {
            val home = Intent(this@InscriptionActivity,MainActivity::class.java)
            startActivity(home)
        }
    }
}