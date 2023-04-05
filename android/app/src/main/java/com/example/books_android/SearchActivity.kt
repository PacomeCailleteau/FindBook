package com.example.books_android

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.inputmethod.InputMethodManager
import android.widget.*
import com.example.books_android.dao.ApiDao
import com.example.books_android.models.BookModel
import com.nfeld.jsonpathkt.JsonPath
import com.nfeld.jsonpathkt.extension.read
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

class SearchActivity : AppCompatActivity() {
    private lateinit var searchBar: SearchView
    private lateinit var listView: ListView
    private lateinit var tv_nb_recherche: TextView

    private lateinit var apiDao: ApiDao
    private lateinit var books: List<BookModel>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_search)
        val btnHome = findViewById<ImageButton>(R.id.btnHome)
        val btnLogo = findViewById<ImageButton>(R.id.btnLogo)
        val btnFavoris = findViewById<ImageButton>(R.id.btnFavoris)
        val btnMonCompte = findViewById<ImageButton>(R.id.btnMoncompte)
        this.searchBar = findViewById<SearchView>(R.id.SearchBar)
        this.listView = findViewById<ListView>(R.id.list_view)
        tv_nb_recherche = findViewById<TextView>(R.id.tv_nb_recherche)

        this.books = mutableListOf()

        val adapter = ArrayAdapterSearch(this, this.books)
        this.listView.adapter = adapter

        this.apiDao = ApiDao.getInstance(this)

        searchBar.setQuery(intent.getStringExtra("textBar"),true)

        searchBooks()

        this.listView.setOnItemClickListener { _, _, index, _ ->
            val book = this.books[index]
            val intent = Intent(this, BookActivity::class.java)
                .putExtra("book", Json.encodeToString<BookModel>(book))
            startActivity(intent)
        }


        btnHome.setOnClickListener {
            val home = Intent(this@SearchActivity, MainActivity::class.java)
            startActivity(home)
        }

        btnLogo.setOnClickListener {
            val logo = Intent(this@SearchActivity, MainActivity::class.java)
            startActivity(logo)
        }

        btnMonCompte.setOnClickListener {
            RedirectAccount.redirect(this@SearchActivity)
        }

        btnFavoris.setOnClickListener {
            val favoris = Intent(this@SearchActivity, FavorisActivity::class.java)
            startActivity(favoris)
        }

        val queryTextListener: SearchView.OnQueryTextListener =
            object : SearchView.OnQueryTextListener {
                override fun onQueryTextChange(newText: String): Boolean {

                    return true
                }

                override fun onQueryTextSubmit(query: String): Boolean {
                    this@SearchActivity.searchBooks()
                    return true
                }
            }

        searchBar.setOnQueryTextListener(queryTextListener)
    }


    private fun searchBooks() {
        val searchTerm = this.searchBar.query.toString()

        this.apiDao.findBooksBySearchTerm(searchTerm,
            { books ->
                this.books = Json.decodeFromString<List<BookModel>>(books)
                val adapter = ArrayAdapterSearch(this, this.books)
                this.listView.adapter = adapter

                // enleve le clavier
                val inputMethodManager = this.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
                inputMethodManager.hideSoftInputFromWindow(this.currentFocus?.windowToken, 0)

                this.apiDao.stat(searchTerm,
                    { stat ->
                        val nb_recherche = JsonPath.parse(stat)?.read<Int>("$.nb_results")
                        tv_nb_recherche.text = nb_recherche.toString()
                    }, { error ->
                        Toast.makeText(this, error.message, Toast.LENGTH_LONG).show()
                    })

            }, {})
    }
}
