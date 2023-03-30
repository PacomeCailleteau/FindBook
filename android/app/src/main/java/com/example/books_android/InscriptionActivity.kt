package com.example.books_android

import android.content.Intent
import android.graphics.Paint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageButton
import android.widget.TextView
import android.widget.Toast
import com.example.books_android.dao.ApiDao
import com.nfeld.jsonpathkt.JsonPath
import com.nfeld.jsonpathkt.extension.read

class InscriptionActivity : AppCompatActivity() {
    private lateinit var apiDao: ApiDao
    private lateinit var tokenManager: TokenManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_inscription)

        this.apiDao = ApiDao(this)
        this.tokenManager = TokenManager(this)

        // -- éléments de la page -- //
        // nagivation
        val btnHome = findViewById<ImageButton>(R.id.btnHome)
        val btnConnexion = findViewById<TextView>(R.id.textCreerCompteLink)
        val btnLogo = findViewById<ImageButton>(R.id.btnLogo)
        val btnFavoris = findViewById<ImageButton>(R.id.btnFavoris)
        val btnParam = findViewById<ImageButton>(R.id.btnMoncompte)
        btnConnexion.paintFlags = btnConnexion.paintFlags or Paint.UNDERLINE_TEXT_FLAG


        // formulaire
        val editTextLogin = findViewById<TextView>(R.id.editTextPrenom)
        val editTextPasswordInscription = findViewById<TextView>(R.id.editTextPasswordInscription)
        val editTextPasswordConfirmInscription = findViewById<TextView>(R.id.editTextPasswordConfirmInscription)
        val btnCreerCompte = findViewById<TextView>(R.id.btnCreerCompte)
        // -----

        // -- Redirection vers les autres activités -- //
        btnConnexion.setOnClickListener {
            val connexion = Intent(this@InscriptionActivity,ConnexionActivity::class.java)
            startActivity(connexion)
            finish()
        }

        btnLogo.setOnClickListener {
            val logo = Intent(this@InscriptionActivity,MainActivity::class.java)
            startActivity(logo)
            finish()
        }

        btnHome.setOnClickListener {
            val home = Intent(this@InscriptionActivity,MainActivity::class.java)
            startActivity(home)
            finish()
        }

        btnFavoris.setOnClickListener {
            val favoris = Intent(this@InscriptionActivity,FavorisActivity::class.java)
            startActivity(favoris)
            finish()
        }

        btnParam.setOnClickListener {
            val parametre = Intent(this@InscriptionActivity,AccountActivity::class.java)
            startActivity(parametre)
            finish()
        }
        // -----


        btnCreerCompte.setOnClickListener {
            val login = editTextLogin.text.toString()
            val password = editTextPasswordInscription.text.toString()
            val passwordConfirm = editTextPasswordConfirmInscription.text.toString()

            if (login.isEmpty() || password.isEmpty() || passwordConfirm.isEmpty()) {
                Toast.makeText(this, "Veuillez remplir tous les champs", Toast.LENGTH_SHORT).show()
            } else if (password != passwordConfirm) {
                Toast.makeText(this, "Les mots de passe ne correspondent pas", Toast.LENGTH_SHORT).show()
            } else if (password.length < 8) {
                Toast.makeText(this, "Le mot de passe doit contenir au moins 8 caractères", Toast.LENGTH_SHORT).show()
            } else {
                this.apiDao.createAccount(login, password,
                    { response ->
                        val token = JsonPath.parse(response)?.read<String>("$.token")!!
                        this.tokenManager.setToken(token)

                        Toast.makeText(this, "Inscription réussie", Toast.LENGTH_SHORT).show()
                        val home = Intent(this@InscriptionActivity, MainActivity::class.java)
                        startActivity(home)
                        finish()
                    }, {
                        error ->
                        Toast.makeText(this, error.message, Toast.LENGTH_SHORT).show()
                    }
                )
            }
        }
    }
}
