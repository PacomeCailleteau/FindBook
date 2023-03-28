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
        // try {
            return await bookDao.searchBookInformation(search)
        // } catch(e) {
        //     return Promise.reject(e)
        // }
    }
}
