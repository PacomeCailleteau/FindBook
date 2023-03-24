import { userDao } from '../dao/userDao.mjs';

export const userController = {
    async findAll() {
        // try {
            return await userDao.getAllUsers();
        // } catch(e) {
        //     return Promise.reject(e);
        // }
    },


    async createUser(login, hahedPassword) {
        try {
            return await userDao.createUser(login, hahedPassword);
        } catch(e) {
            return Promise.reject(e);
        }
    },

    async getUserByLogin(login) {
        // try {
            return await userDao.getUserByLogin(login);
        // } catch(e) {
        //     return Promise.reject(e);
        // }
    }
}
