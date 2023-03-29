package com.example.books_android

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageButton
import android.widget.SearchView
import androidx.appcompat.app.AppCompatActivity
import com.example.books_android.dao.ApiDao

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val btnParam = findViewById<ImageButton>(R.id.btnParametre)
        val btnConnexion = findViewById<ImageButton>(R.id.btnConnexion)
        val btnFavoris = findViewById<ImageButton>(R.id.btnFavoris)
        val searchBar = findViewById<SearchView>(R.id.SearchBar)

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

        val queryTextListener: SearchView.OnQueryTextListener =
            object : SearchView.OnQueryTextListener {
                override fun onQueryTextChange(newText: String): Boolean {
                    // Do something
                    return true
                }

                override fun onQueryTextSubmit(query: String): Boolean {
                    val search = Intent(this@MainActivity,SearchActivity::class.java)
                    startActivity(search)
                    finish()
                    return true
                }
            }

        searchBar.setOnQueryTextListener(queryTextListener)

        val apiDao = ApiDao.getInstance(this)
        apiDao.connectWithLoginPassword("berd", "chauved",
            { response ->
                println("success ! $response")
            },
            { error ->
                println(error.message)
            }
        )
    }
}
