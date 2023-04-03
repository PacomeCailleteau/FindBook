import {sha256} from "js-sha256";

const baseURL = 'http://localhost:3001/users/'

const userDAO = {
    /**
     * Création d'un User dans la bd avec les login et pass en param
     * POST
     * @param login, pass, pass_confirmation
     * @returns {Promise<any>}
     */
    async createUser(login, pass, pass_confirmation) {
        //vérification que les passes sont égaux
        if(pass ===  pass_confirmation){
            const cryptedPass = sha256(pass)
            const suffix = "create"
            const res = await fetch(baseURL + suffix, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: login,
                    password: cryptedPass
                })
            })
            const data = await res.json()
            return data
        }else{
            return "Les mots de passe ne correspondent pas"
        }
    },

    async changeLogin (token, login) {
        //on envoie la requête
        const suffix = `update/login/${token}`
        const res = await fetch(baseURL + suffix, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: login
            })
        });
        const data = await res.json()
        return data
    },

    async changePass (login, token, former_pass, pass, pass_confirmation) {
        //on récupère le user en simulant une connexion
        const user = await this.login(login, former_pass)
        //on vérifie que le mot de passe actuel est le bon
        if(user.token === token){
            //on vérifie que les deux nouveaux passes sont identiques
            if(pass === pass_confirmation){
                //on chiffre le nouveau pass
                const cryptedPass = sha256(pass)
                //on envoie la requête
                const suffix = `update/password/${token}`
                const res = await fetch(baseURL + suffix, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        password: cryptedPass
                    })
                });
                return await res.json()
            }
        }
        return {error: "error"}
    },

    /**
     * Récupère l'unique user correspondant au login en param
     * GET
     * @param login
     * @returns {Promise<any>}
     */
    async login (login, pass) {
        const cryptedPass = sha256(pass)
        const suffix = `login/${login}/${cryptedPass}`
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        return data
    },

    /**
     * ajoute un livre à la liste de livre d'un user
     * POST
     * @param token
     * @param isbn
     * @returns {Promise<any>}
     */
    async addBook (token, isbn) {
        const suffix = `addBook/${token}`
        const res = await fetch(baseURL + suffix, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isbn: isbn
            })
        })
        const data = await res.json()
        return data
    },

    /**
     * Récupère l'unique user correspondant au token en param
     * GET
     * @param token
     * @returns {Promise<any>}
     */
    async getUserByToken (token) {
        const suffix = `${token}`
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        return data
    },

    /**
     * Supprime un utilisateur de la bd
     * @param token
     * @returns {Promise<any>}
     */
    async deleteUser (token) {
        const suffix = `delete/${token}`
        const res = await fetch(baseURL + suffix, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json()
        return data
    },

    /**
     * Supprime un livre de la liste de livre d'un user
     * @param token
     * @param isbn
     * @returns {Promise<any>}
     */
    async deleteBook (token, isbn) {
        const suffix = `removeBook/${token}/${isbn}`
        const res = await fetch(baseURL + suffix, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json()
        return data
    },





}

export default userDAO


