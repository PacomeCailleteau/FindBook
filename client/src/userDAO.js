import {sha256} from "js-sha256";

const baseURL = 'http://localhost:3001/users/'

//TODO : chiffrer le mot de passe
//TODO : mettre token dans userModel dans la partie serveur
// (voir userModel.mjs et userDAO.mjs ligne 100)

const userDAO = {
    /**
     * Création d'un User dans la bd avec les login et pass en param
     * POST
     * @param login, pass, pass_confirmation
     * @returns {Promise<any>}
     */
    createUser : async (login, pass, pass_confirmation) =>
    {
        //vérification que les passes sont égaux
        if(pass ==  pass_confirmation){
            const suffix = "create/"+login+"/"+pass
            //ne pas enlever le print sinon ça marche plus
            console.log(baseURL+suffix)
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
    login : async (login, pass) =>
    {
        const suffix = `users/login/${login}/${pass}`
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
    addBook : async (token, isbn) => {
        const suffix = `users/addBook/${token}/${isbn}`
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
        const suffix = `users/token/${token}`
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        return data
    },



}

export default userDAO


