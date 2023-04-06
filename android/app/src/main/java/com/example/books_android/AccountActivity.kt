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

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_moncompte)

        this.apiDao = ApiDao.getInstance(this)
        this.tokenManager = TokenManager(this)

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
        val userLogin = intent.getStringExtra("userLogin")
        editTextLogin.hint = userLogin


        // -- Redirection vers les autres activités -- //
        btnLogo.setOnClickListener {
            val logo = Intent(this@AccountActivity,MainActivity::class.java)
            startActivity(logo)
        }

        btnHome.setOnClickListener {
            val home = Intent(this@AccountActivity,MainActivity::class.java)
            startActivity(home)
        }

        btnFavoris.setOnClickListener {
            val favoris = Intent(this@AccountActivity,FavorisActivity::class.java)
            startActivity(favoris)
        }
        // -----

        // -- Gestion des boutons -- //
        // changer le login
        btnChangerPseudo.setOnClickListener {
            val newLogin = editTextLogin.text.toString()
            editTextLogin.hint = newLogin
            editTextLogin.text = ""

            // lance la requête pour changer le login
            this.apiDao.changeLogin(this.tokenManager.getToken(), newLogin,
                {
                    Toast.makeText(this, "Login changé", Toast.LENGTH_SHORT).show()
                }, { error ->
                    // en cas d'erreur affiche le message d'erreur du serveur
                    Toast.makeText(this, "Erreur: ${error.message}", Toast.LENGTH_SHORT).show()
                }
            )
        }

        // changer le mot de passe
        btnChangerMdp.setOnClickListener {
            val newPassword = editTextTextMdpNew.text.toString()
            val newPasswordConfirm = editTextTextMdpNewConfirm.text.toString()

            // vérification de la conformité des mots de passe
            if (newPassword != newPasswordConfirm) {
                Toast.makeText(this, "Les mots de passe ne correspondent pas", Toast.LENGTH_SHORT).show()
            } else if (newPassword.length < 8) {
                Toast.makeText(this, "Le mot de passe doit contenir au moins 8 caractères", Toast.LENGTH_SHORT).show()
            } else {
                // lance la requête pour changer le mot de passe
                this.apiDao.changePassword(this.tokenManager.getToken(), newPassword,
                    { response ->
                        // récupère le nouveau token et le stocke
                        val token = JsonPath.parse(response)?.read<String>("$.token")!!
                        this.tokenManager.setToken(token)
                        Toast.makeText(this, "Mot de passe changé", Toast.LENGTH_SHORT).show()

                        // réinitialisation des champs
                        editTextTextMdpNew.text = ""
                        editTextTextMdpNewConfirm.text = ""
                    }, { error ->
                        // en cas d'erreur affiche le message d'erreur du serveur
                        Toast.makeText(this, "Erreur: ${error.message}", Toast.LENGTH_SHORT).show()
                    }
                )
            }
        }

        // se déconnecter
        btnSeDeconnecter.setOnClickListener {
            // pour se déconnecter il suffit de supprimer le token
            this.tokenManager.setToken("")
            val connexion = Intent(this@AccountActivity, ConnexionActivity::class.java)
            finishAffinity()
            startActivity(connexion)
        }

        // supprimer le compte
        btnSupprimerCompte.setOnClickListener {
            // lance la requête pour supprimer le compte
            this.apiDao.deleteAccount(this.tokenManager.getToken(),
                {
                    Toast.makeText(this, "Compte supprimé", Toast.LENGTH_SHORT).show()
                    // supprime le token pour se déconnecter
                    this.tokenManager.setToken("")
                    val connexion = Intent(this@AccountActivity, ConnexionActivity::class.java)
                    finishAffinity()
                    startActivity(connexion)
                }, { error ->
                    Toast.makeText(this, "Erreur: ${error.message}", Toast.LENGTH_SHORT).show()
                }
            )
        }
    }
}
