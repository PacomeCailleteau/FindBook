package com.example.books_android

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageButton
import android.widget.ListView
import android.widget.Toast
import com.example.books_android.dao.ApiDao
import com.example.books_android.models.BookModel
import com.example.books_android.models.UserModel
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

class FavorisActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_favoris)

        // - éléments de la page -
        val btnHome = findViewById<ImageButton>(R.id.btnHome)
        val btnMonCompte = findViewById<ImageButton>(R.id.btnMoncompte)
        val btnLogo = findViewById<ImageButton>(R.id.btnLogo)
        val lv_books = findViewById<ListView>(R.id.lv_books)
        // ---

        // - Initialisation des classes - //
        val apiDao = ApiDao.getInstance(this)
        val token = TokenManager(this).getToken()


        // - Vérifie sur le token est vide - //
        if (token == "") {
            Toast.makeText(this, "Vous devez être connecté pour voir vos favoris", Toast.LENGTH_LONG).show()
        } else {
            // - Récupère les livres favoris de l'utilisateur - //
            apiDao.connectWithToken(token,
                // si l'utilisateur est connecté
                { response ->
                    // on créer l'adapter pour afficher les livres
                    val user = Json.decodeFromString<UserModel>(response)
                    val adapter = ArrayAdapterSearch(this, user.books)
                    lv_books.adapter = adapter

                    // on ajoute le onClickListener pour chaque livre
                    // quand on appuie sur un livre, on va sur la page du livre
                    lv_books.setOnItemClickListener { _, _, index, _ ->
                        val book = user.books[index]

                        // permet de récupérer les infos du livre
                        apiDao.findBookByIsbn(book.isbn, { response ->
                            val bookModel = Json.decodeFromString<BookModel>(response)
                            val intent = Intent(this, BookActivity::class.java)
                                .putExtra("book", Json.encodeToString<BookModel>(bookModel))
                            startActivity(intent)
                        }, {
                            Toast.makeText(this, "Erreur lors de la connexion", Toast.LENGTH_LONG)
                                .show()
                        })
                    }
                }, {
                    Toast.makeText(this, "Erreur lors de la connexion", Toast.LENGTH_LONG).show()
                })
        }

        // -- Redirection vers les autres activités -- //
        btnHome.setOnClickListener {
            val home = Intent(this@FavorisActivity,MainActivity::class.java)
            startActivity(home)
        }

        btnMonCompte.setOnClickListener {
            RedirectAccount.redirect(this@FavorisActivity)
        }

        btnLogo.setOnClickListener {
            val logo = Intent(this@FavorisActivity,MainActivity::class.java)
            startActivity(logo)
        }
        // -----


    }
}