package com.example.books_android

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageButton
import com.example.books_android.dao.ApiDao

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val btnParam = findViewById<ImageButton>(R.id.btnParametre)
        val btnConnexion = findViewById<ImageButton>(R.id.btnConnexion)
        val btnFavoris = findViewById<ImageButton>(R.id.btnFavoris)

        btnParam.setOnClickListener {
            val param = Intent(this@MainActivity,ParamActivity::class.java)
            startActivity(param)
        }

        btnFavoris.setOnClickListener {
            val favoris = Intent(this@MainActivity, FavorisActivity::class.java)
            startActivity(favoris)
        }

        btnConnexion.setOnClickListener {
            val connexion = Intent(this@MainActivity, ConnexionActivity::class.java)
            startActivity(connexion)
        }


        val apiDao = ApiDao.getInstance(this)
        apiDao.findBookByIsbn("9782266292948") { response ->
            println("siuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu: $response")
        }
    }
}
