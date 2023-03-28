
const baseURL2 = 'http://localhost:3001'



const userDAO = {

    /**
     * Création d'un User dans la bd avec les login et pass en param
     * @param login, pass, pass_confirmation
     * @returns {Promise<any>}
     */
    createUser : async (login, pass, pass_confirmation) =>
    {
        console.log("zizi");
        if(pass ==  pass_confirmation){
            const suffix = "/user/create/"+login+"/"+pass
            console.log(baseURL2 + suffix)
            console.log("zizi2");
            await fetch(baseURL2 + suffix, {
                method: 'POST',
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log(err))

            /*const data = await res.json()
            console.log(data)
            return data*/
            return ""
        }else{
            return "Les mots de passe ne correspondent pas"
        }
    },

    /**
     * Récupère l'unique user correspondant au login en param
     * @param login
     * @returns {Promise<any>}
     */
    findByLogin : async (login) =>
    {
        const suffix = `?q=isbn:`
        const res = await fetch(baseURL2 + suffix)
        const data = await res.json()
        return data
    },

    /**
     * Récupère l'unique livre correspondant à l'isbn en param
     * @param isbn
     * @returns {Promise<any>}
     */
    findByLogin : async (isbn) =>
    {
        const suffix = `?q=isbn:${isbn}`
        const res = await fetch(baseURL2 + suffix)
        const data = await res.json()
        return data
    },
}

export default userDAO


