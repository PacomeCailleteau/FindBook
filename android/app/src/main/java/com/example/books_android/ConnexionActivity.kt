package com.example.books_android

import android.content.Intent
import android.graphics.Paint
import android.os.Bundle
import android.widget.EditText
import android.widget.ImageButton
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.books_android.dao.ApiDao
import com.nfeld.jsonpathkt.JsonPath
import com.nfeld.jsonpathkt.extension.read

class ConnexionActivity : AppCompatActivity() {
    private lateinit var apiDao: ApiDao
    private lateinit var tokenManager: TokenManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connexion)

        // -- Initialisation des classes -- //
        this.apiDao = ApiDao(this)
        this.tokenManager = TokenManager(this)

        // -- éléments de la page -- //
        val btnHome = findViewById<ImageButton>(R.id.btnHome)
        val btnLogo = findViewById<ImageButton>(R.id.btnLogo)
        val btnFavoris = findViewById<ImageButton>(R.id.btnFavoris)
        val btnMonCompte = findViewById<ImageButton>(R.id.btnMoncompte)
        val btnInscription = findViewById<TextView>(R.id.textCreerCompteLink)
        btnInscription.paintFlags = btnInscription.paintFlags or Paint.UNDERLINE_TEXT_FLAG

        val editTextEmail = findViewById<EditText>(R.id.editTextEmail)
        val editTextPassword = findViewById<EditText>(R.id.editTextPassword)
        val btnLogin = findViewById<TextView>(R.id.btnLogin)
        // ---

        // -- Bouton de navigation -- //
        btnLogo.setOnClickListener {
            val logo = Intent(this@ConnexionActivity,MainActivity::class.java)
            startActivity(logo)
            finish()
        }

        btnHome.setOnClickListener {
            val home = Intent(this@ConnexionActivity,MainActivity::class.java)
            startActivity(home)
        }

        btnFavoris.setOnClickListener {
            val favoris = Intent(this@ConnexionActivity,FavorisActivity::class.java)
            startActivity(favoris)
        }

        btnMonCompte.setOnClickListener {
            RedirectAccount.redirect(this@ConnexionActivity)
        }

        btnInscription.setOnClickListener {
            val inscription = Intent(this@ConnexionActivity,InscriptionActivity::class.java)
            startActivity(inscription)
        }

        btnHome.setOnClickListener {
            val home = Intent(this@ConnexionActivity,MainActivity::class.java)
            startActivity(home)
        }
        // ----- //

        // -- Formulaire -- //
        btnLogin.setOnClickListener {
            val login = editTextEmail.text.toString()
            val password = editTextPassword.text.toString()

            // Vérification des champs
            if (login.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Veuillez remplir tous les champs", Toast.LENGTH_LONG).show()
                return@setOnClickListener
            }

            // lance la requête pour ce connecter
            this.apiDao.connectWithLoginPassword(login, password,
                { response ->
                    // récupère le token et le stocke
                    val token = JsonPath.parse(response)?.read<String>("$.token")!!
                    this.tokenManager.setToken(token)

                    val home = Intent(this@ConnexionActivity, MainActivity::class.java)
                    startActivity(home)
                }, { error ->
                    Toast.makeText(this, error.message, Toast.LENGTH_LONG).show()
                    editTextPassword.setText("")
                }
            )
        }
    }
}
