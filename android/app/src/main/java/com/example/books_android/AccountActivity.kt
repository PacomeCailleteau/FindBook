package com.example.books_android

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageButton
import com.example.books_android.dao.ApiDao

class AccountActivity : AppCompatActivity() {
    private lateinit var apiDao: ApiDao
    private lateinit var tokenManager: TokenManager
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        this.tokenManager = TokenManager(this)

        val redirectToConnexion = {
            val connexion = Intent(this, ConnexionActivity::class.java)
            startActivity(connexion)
        }

        if (!tokenManager.tokenExists()) {
            redirectToConnexion()
        } else {
            this.apiDao = ApiDao(this)
            println(">>>>>>>>>>>>>>>>>>>>>>> ${tokenManager.getToken()}")
            this.apiDao.connectWithToken(tokenManager.getToken(),
                { response ->
                    // L'utilisateur est connecté
                    // On affiche la page mon compte
                    setContentView(R.layout.activity_moncompte)
                    this.init()
                }, { error ->
                    // L'utilisateur n'est pas connecté
                    redirectToConnexion()
                }
            )
        }
    }

    fun init() {
        val btnHome = findViewById<ImageButton>(R.id.btnHome)
        val btnFavoris = findViewById<ImageButton>(R.id.btnFavoris)
        val btnLogo = findViewById<ImageButton>(R.id.btnLogo)

        btnLogo.setOnClickListener {
            val logo = Intent(this@AccountActivity,MainActivity::class.java)
            finish()
            startActivity(logo)
        }

        btnHome.setOnClickListener {
            val home = Intent(this@AccountActivity,MainActivity::class.java)
            finish()
            startActivity(home)
        }

        btnFavoris.setOnClickListener {
            val favoris = Intent(this@AccountActivity,FavorisActivity::class.java)
            finish()
            startActivity(favoris)
        }
    }
}