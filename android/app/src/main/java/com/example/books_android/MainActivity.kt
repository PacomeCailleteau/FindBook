package com.example.books_android

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageButton

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val btnParam = findViewById<ImageButton>(R.id.btnParametre)
        val btnConnexion = findViewById<ImageButton>(R.id.btnConnexion)


        btnConnexion.setOnClickListener {
            val connexion = Intent(this@MainActivity, ConnexionActivity::class.java)
            startActivity(connexion)
        }


        val apiDao = ApiDao(this)
        apiDao.connectWithLoginPassword("test", "test")
    }
}