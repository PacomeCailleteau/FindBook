package com.example.books_android

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageButton
import android.widget.SearchView

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val btnParam = findViewById<ImageButton>(R.id.btnMoncompte)
        val btnConnexion = findViewById<ImageButton>(R.id.btnConnexion)
        val btnFavoris = findViewById<ImageButton>(R.id.btnFavoris)
        val searchBar = findViewById<SearchView>(R.id.SearchBar)

        // -- Redirection vers les autres activités -- //
        btnParam.setOnClickListener {
            val param = Intent(this@MainActivity,AccountActivity::class.java)
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
        // -----

        val queryTextListener: SearchView.OnQueryTextListener =
            object : SearchView.OnQueryTextListener {
                override fun onQueryTextChange(newText: String): Boolean {
                    // Do something
                    return true
                }

                override fun onQueryTextSubmit(query: String): Boolean {
                    val search = Intent(this@MainActivity, SearchActivity::class.java)
                        .putExtra("textBar", query)
                    startActivity(search)


                    return true
                }
            }

        searchBar.setOnQueryTextListener(queryTextListener)
    }
}
