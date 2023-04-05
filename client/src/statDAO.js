
const baseURL = 'http://localhost:3001/stat/'

const statDAO = {
    /**
     * Récupère le nombre de recherche effectué sur google trends
     * @param search
     * @returns {Promise<any>}
     */
    async getStatInformation (search) {
        const suffix = `${search}`
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        return data
    }
}

export default statDAO




