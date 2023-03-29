
const baseURL = 'http://localhost:3001/books/'

const bookDAO = {
    /**
     * Récupère tous les livres que nous renvoie la recherche
     * @param search
     * @returns {Promise<any>}
     */
    async findMany (search) {
        const suffix = `search/${search}`
        console.log(suffix)
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        return data
    },

    /**
     * Récupère l'unique livre correspondant à l'isbn en param
     * @param isbn
     * @returns {Promise<any>}
     */
    async findByISBN (isbn) {
        const suffix = `isbn/${isbn}`
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        return data
    },
}

export default bookDAO


