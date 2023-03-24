import { bookDao } from '../dao/bookDao.mjs'

export const bookController = {
    async getBookInformation(isbn) {
        try {
            return await bookDao.getBookInformation(isbn)
        } catch(e) {
            Promise.reject(e)
        }
    }
}