package com.example.books_android

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.ImageButton
import android.widget.TextView
import android.widget.Toast
import com.example.books_android.dao.ApiDao
import com.example.books_android.models.TokenUserModel
import com.example.books_android.models.UserModel
import com.nfeld.jsonpathkt.JsonPath
import com.nfeld.jsonpathkt.extension.read
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json

class AccountActivity : AppCompatActivity() {
    private lateinit var apiDao: ApiDao
    private lateinit var tokenManager: TokenManager

    private lateinit var userLogin: String

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
            this.apiDao.connectWithToken(tokenManager.getToken(),
                { response ->
                    // L'utilisateur est connecté
                    // On affiche la page mon compte
                    setContentView(R.layout.activity_moncompte)
                    println(response)
                    this.userLogin = JsonPath.parse(response)?.read<String>("$.login")!!
                    println("User: ${this.userLogin}")
                    this.init()
                }, { error ->
                    // L'utilisateur n'est pas connecté
                    this.tokenManager.setToken("")
                    redirectToConnexion()
                }
            )
        }
    }

    fun init() {

        // -- éléments de la page -- //
        // navigation
        val btnHome = findViewById<ImageButton>(R.id.btnHome)
        val btnFavoris = findViewById<ImageButton>(R.id.btnFavoris)
        val btnLogo = findViewById<ImageButton>(R.id.btnLogo)

        // login
        val editTextLogin = findViewById<TextView>(R.id.editTextLogin)
        val btnChangerPseudo = findViewById<Button>(R.id.btnChangerPseudo)

        // mot de passe
        val editTextTextMdpNew = findViewById<TextView>(R.id.editTextTextMdpNew)
        val editTextTextMdpNewConfirm = findViewById<TextView>(R.id.editTextTextMdpNewConfirm)
        val btnChangerMdp = findViewById<Button>(R.id.btnChangerMdp)

        // autres boutons
        val btnSeDeconnecter = findViewById<Button>(R.id.btnSeDeconnecter)
        val btnSupprimerCompte = findViewById<Button>(R.id.btnSupprimerCompte)
        // -----

        // Remplissage du champ login
        editTextLogin.hint = this.userLogin


        // -- Redirection vers les autres activités -- //
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
        // -----

        // -- Gestion des boutons -- //
        // changer le login
        btnChangerPseudo.setOnClickListener {
            val newLogin = editTextLogin.text.toString()
            this.apiDao.changeLogin(this.tokenManager.getToken(), newLogin,
                { response ->
                    Toast.makeText(this, "Login changé", Toast.LENGTH_SHORT).show()
                }, { error ->
                    Toast.makeText(this, "Erreur: ${error.message}", Toast.LENGTH_SHORT).show()
                }
            )
        }

        // changer le mot de passe
        btnChangerMdp.setOnClickListener {
            val newPassword = editTextTextMdpNew.text.toString()
            val newPasswordConfirm = editTextTextMdpNewConfirm.text.toString()

            if (newPassword != newPasswordConfirm) {
                Toast.makeText(this, "Les mots de passe ne correspondent pas", Toast.LENGTH_SHORT).show()
            } else if (newPassword.length < 8) {
                Toast.makeText(this, "Le mot de passe doit contenir au moins 8 caractères", Toast.LENGTH_SHORT).show()
            } else {
                this.apiDao.changePassword(this.tokenManager.getToken(), newPassword,
                    { response ->
                        val token = JsonPath.parse(response)?.read<String>("$.token")!!
                        this.tokenManager.setToken(token)
                        Toast.makeText(this, "Mot de passe changé", Toast.LENGTH_SHORT).show()

                        editTextTextMdpNew.text = ""
                        editTextTextMdpNewConfirm.text = ""
                    }, { error ->
                        Toast.makeText(this, "Erreur: ${error.message}", Toast.LENGTH_SHORT).show()
                    }
                )
            }
        }

        // se déconnecter
        btnSeDeconnecter.setOnClickListener {
            this.tokenManager.setToken("")
            val connexion = Intent(this@AccountActivity, ConnexionActivity::class.java)
            finish()
            startActivity(connexion)
        }

        // supprimer le compte
        btnSupprimerCompte.setOnClickListener {
            this.apiDao.deleteAccount(this.tokenManager.getToken(),
                { response ->
                    Toast.makeText(this, "Compte supprimé", Toast.LENGTH_SHORT).show()
                    this.tokenManager.setToken("")
                    val connexion = Intent(this@AccountActivity, ConnexionActivity::class.java)
                    finish()
                    startActivity(connexion)
                }, { error ->
                    Toast.makeText(this, "Erreur: ${error.message}", Toast.LENGTH_SHORT).show()
                }
            )
        }
    }
}
