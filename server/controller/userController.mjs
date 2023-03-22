import { userDao } from '../dao/userDao.mjs';

export const userController = {
    async findAll() {
        try {
            return await userDao.getAllUsers();
        } catch(e) {
            return Promise.reject(e);
        }
    },

    async findById(id) {
        try {
            return await userDao.getUserById(id);
        } catch(e) {
            return Promise.reject(e);
        }
    },

    async createUser(login, hahedPassword) {
        try {
            return await userDao.createUser(login, hahedPassword);
        } catch(e) {
            return Promise.reject(e);
        }
    },

    async getUserByToken(token) {
        // try {
            return await userDao.getUserByToken(token);
        // } catch(e) {
        //     return Promise.reject(e);
        // }
    }
}
