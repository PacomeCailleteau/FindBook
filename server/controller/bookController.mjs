import { bookDao } from '../dao/bookDao.mjs'

export const bookController = {
    async getBookInformation(isbn) {
        try {
            return await bookDao.getBookInformation(isbn)
        } catch(e) {
            return Promise.reject(e)
        }
    },


    async searchBookInformation(search) {
        try {
            // We don't want to search for empty strings
            if (search.trim().length === 0)
                return []
            return await bookDao.searchBookInformation(search)
        } catch(e) {
            return Promise.reject(e)
        }
    }
}
