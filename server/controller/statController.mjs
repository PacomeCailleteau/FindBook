
import { statDao } from '../dao/statDao.mjs'

export const statController = {

    async getStatInformation(search) {
        try {
            return await statDao.getStatInformation(search)
        } catch(e) {
            return Promise.reject(e)
        }
    }

}












