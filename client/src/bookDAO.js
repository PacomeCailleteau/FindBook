
const baseURL = 'https://www.googleapis.com/books/v1/volumes'

const bookDAO = {

    /**
     * Récupère tous les livres que nous renvoie la recherche
     * @param search
     * @returns {Promise<any>}
     */
    findMany : async (search) =>
    {
        const suffix = `?q=${search}`
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        return data
    },

    /**
     * Récupère l'unique livre correspondant à l'isbn en param
     * @param isbn
     * @returns {Promise<any>}
     */
    findByISBN : async (isbn) =>
    {
        const suffix = `?q=isbn:${isbn}`
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        return data
    },
}

export default bookDAO


