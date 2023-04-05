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

        // - Éléments de la page -
        val btnParam = findViewById<ImageButton>(R.id.btnMoncompte)
        val btnConnexion = findViewById<ImageButton>(R.id.btnConnexion)
        val btnMonCompte = findViewById<ImageButton>(R.id.btnMoncompte)
        val btnFavoris = findViewById<ImageButton>(R.id.btnFavoris)
        val searchBar = findViewById<SearchView>(R.id.SearchBar)

        // - Redirection vers les autres activités -
        btnParam.setOnClickListener {
            val param = Intent(this@MainActivity,AccountActivity::class.java)
            startActivity(param)
        }

        btnFavoris.setOnClickListener {
            val favoris = Intent(this@MainActivity, FavorisActivity::class.java)
            startActivity(favoris)
        }

        btnConnexion.setOnClickListener {
            RedirectAccount.redirect(this@MainActivity)
        }

        btnMonCompte.setOnClickListener {
            RedirectAccount.redirect(this@MainActivity)
        }
        // -----

        // - Recherche -
        val queryTextListener: SearchView.OnQueryTextListener =
            object : SearchView.OnQueryTextListener {

                override fun onQueryTextSubmit(query: String): Boolean {
                    // Quand on lance la recherche
                    // lance l'activité de recherche
                    val search = Intent(this@MainActivity, SearchActivity::class.java)
                        .putExtra("textBar", query)
                    startActivity(search)
                    return true
                }

                override fun onQueryTextChange(p0: String?): Boolean {
                    return true
                }
            }

        searchBar.setOnQueryTextListener(queryTextListener)
    }
}
