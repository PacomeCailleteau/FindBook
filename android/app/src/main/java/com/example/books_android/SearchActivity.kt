package com.example.books_android

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageButton
import android.widget.SearchView

class SearchActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_search)
        val btnHome = findViewById<ImageButton>(R.id.btnHome)
        val btnLogo = findViewById<ImageButton>(R.id.btnLogo)
        val btnFavoris = findViewById<ImageButton>(R.id.btnFavoris)
        val btnParam = findViewById<ImageButton>(R.id.btnParametre)
        val searchBar = findViewById<SearchView>(R.id.SearchBar)

        val recherche = intent.getStringExtra("textBar")
        println("aa " + recherche)
        searchBar.setQuery(intent.getStringExtra("textBar"),true)
        println(searchBar.queryHint)


        btnHome.setOnClickListener {
            finish()
            val home = Intent(this@SearchActivity,MainActivity::class.java)
            startActivity(home)
        }

        btnLogo.setOnClickListener {
            finish()
            val logo = Intent(this@SearchActivity,MainActivity::class.java)
            startActivity(logo)
        }

        btnParam.setOnClickListener {
            finish()
            val param = Intent(this@SearchActivity,ParamActivity::class.java)
            startActivity(param)
        }

        btnFavoris.setOnClickListener {
            finish()
            val favoris = Intent(this@SearchActivity,FavorisActivity::class.java)
            startActivity(favoris)
        }

        val queryTextListener: SearchView.OnQueryTextListener =
            object : SearchView.OnQueryTextListener {
                override fun onQueryTextChange(newText: String): Boolean {
                    // onUpdate() qui met à jour à chaque charactere dans DAO
                    return true
                }

                override fun onQueryTextSubmit(query: String): Boolean {
                    // onUpdate() qui met à jour à chaque charactere dans DAO
                    return true
                }
            }

        searchBar.setOnQueryTextListener(queryTextListener)
    }
}