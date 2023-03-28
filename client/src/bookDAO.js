
//const baseURL = 'https://www.googleapis.com/books/v1/volumes'
const baseURL = 'http://localhost:3001'

const bookDAO = {
    /**
     * Récupère tous les livres que nous renvoie la recherche
     * @param search
     * @returns {Promise<any>}
     */
    findMany : async (search) =>
    {
        const suffix = `/books/search/${search}`
        console.log(suffix)
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        console.log(data)
        return data
    },

    /**
     * Récupère l'unique livre correspondant à l'isbn en param
     * @param isbn
     * @returns {Promise<any>}
     */
    findByISBN : async (isbn) =>
    {
        const suffix = `/books/isbn/${isbn}`
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        return data
    },
}

export default bookDAO


