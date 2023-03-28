import { bookDao } from '../dao/bookDao.mjs'

export const bookController = {
    async getBookInformation(isbn) {
        try {
            return await bookDao.getBookInformation(isbn)
        } catch(e) {
            Promise.reject(e)
        }
    },


    async searchBookInformation(search) {
        // try {
            return await bookDao.searchBookInformation(search)
        // } catch(e) {
        //     Promise.reject(e)
        // }
    }
}
