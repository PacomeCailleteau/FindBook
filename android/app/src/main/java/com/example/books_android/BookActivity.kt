package com.example.books_android

import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.*
import com.example.books_android.dao.ApiDao
import com.example.books_android.models.BookModel
import com.nfeld.jsonpathkt.JsonPath
import com.nfeld.jsonpathkt.extension.read
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json

class BookActivity : AppCompatActivity() {
    private var bookIsFav = false
    private lateinit var btnAjoutFavori: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_book)

        // - éléments de la page -
        val btnHome = findViewById<ImageButton>(R.id.btnHome)
        val btnFavoris = findViewById<ImageButton>(R.id.btnFavoris)
        val btnLogo = findViewById<ImageButton>(R.id.btnLogo)
        val btnMonCompte = findViewById<ImageButton>(R.id.btnMoncompte)

        val titreBookBook = findViewById<TextView>(R.id.titreBookBook)
        val auteurBookBook = findViewById<TextView>(R.id.auteurBookBook)
        val dateBookBook = findViewById<TextView>(R.id.dateBookBook)
        val isbnBookBook = findViewById<TextView>(R.id.isbnBookBook)
        val descriptionBookBook = findViewById<TextView>(R.id.descriptionBookBook)
        val imageBook = findViewById<ImageView>(R.id.imageBook)
        this.btnAjoutFavori = findViewById<Button>(R.id.btnAjoutFavori)
        // ---

        // Récupération du livre envoyé par l'activité précédente
        val book = Json.decodeFromString<BookModel>(intent.getStringExtra("book")!!)

        // - Initialisation de l'état du bouton favoris -
        val apiDao = ApiDao.getInstance(this)
        val token = TokenManager(this).getToken()

        // Si l'utilisateur possède un token,
        if (token != "") {
            // Fait un appel à l'API pour savoir si l'utilisateur à déjà ajouter aux favoris le livre
            apiDao.connectWithToken(token,
                { response ->
                    // Récupération de la liste des favoris de l'utilisateur
                    val favoris = JsonPath.parse(response)?.read<List<BookModel>>("$.books")

                    // vérification si le livre est dans la liste des favoris
                    if (favoris != null) {
                        this.bookIsFav = favoris.contains(book)
                    }

                    // Mise à jour du bouton
                    this.updateFavButton()

                    // - Ajout d'un listener sur le bouton -
                    this.btnAjoutFavori.setOnClickListener {
                        // Si le livre est déjà dans les favoris, on le retire
                        if (this.bookIsFav) {
                            apiDao.removeBookFromUser(token,
                                book.isbn,
                                {
                                    this.bookIsFav = false
                                    this.updateFavButton()
                                },
                                {
                                    Toast.makeText(this, "Erreur lors de la suppression du favoris", Toast.LENGTH_SHORT).show()
                                })
                        } else {
                            // Sinon on l'ajoute
                            apiDao.addBookToUser(token,
                                book.isbn,
                                {
                                    this.bookIsFav = true
                                    this.updateFavButton()
                                },
                                {
                                    Toast.makeText(this, "Erreur lors de l'ajout du favoris", Toast.LENGTH_SHORT).show()
                                })
                        }
                    }

                }, {})
        }

        // Si l'utilisateur n'est pas connecté, on affiche un message d'erreur
        this.btnAjoutFavori.setOnClickListener {
            Toast.makeText(this, "Vous devez être connecté pour ajouter aux favoris", Toast.LENGTH_SHORT).show()
        }



        // - Insertion des données dans les TextView -
        titreBookBook.text = book.title
        if (book.authors != null) {
            val authorsString = book.authors.joinToString(", ")
            auteurBookBook.text = authorsString
        }
        val dateString = book.publishedDate
        dateBookBook.text = dateString
        isbnBookBook.text = book.isbn
        descriptionBookBook.text = book.description

        if (book.cover != null) {
            val uri = Uri.parse(book.cover)
            imageBook.setImageURI(uri)
        } else {
            imageBook.setImageResource(R.drawable.not_found)
        }
        // ---


        // -- Redirection vers les autres activités -- //
        btnLogo.setOnClickListener {
            val logo = Intent(this@BookActivity,MainActivity::class.java)
            startActivity(logo)
        }

        btnHome.setOnClickListener {
            val home = Intent(this@BookActivity,MainActivity::class.java)
            startActivity(home)
        }

        btnFavoris.setOnClickListener {
            val favoris = Intent(this@BookActivity,FavorisActivity::class.java)
            startActivity(favoris)
        }

        btnMonCompte.setOnClickListener {
            RedirectAccount.redirect(this@BookActivity)
        }
        // -----
    }

    /**
     * Met à jour le texte du bouton d'ajout aux favoris
     * en fonction de l'état du livre (favoris ou non)
     */
    private fun updateFavButton() {
        if (this.bookIsFav) {
            btnAjoutFavori.text = "Retirer des favoris"
        } else {
            btnAjoutFavori.text = "Ajouter aux favoris"
        }
    }
}
