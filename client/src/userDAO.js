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
            const suffix = "create/"+login+"/"+cryptedPass
            const res = await fetch(baseURL + suffix, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            const data = await res.json()
            return data
        }else{
            return "Les mots de passe ne correspondent pas"
        }
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
        const suffix = `addBook/${token}/${isbn}`
        const res = await fetch(baseURL + suffix, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
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


