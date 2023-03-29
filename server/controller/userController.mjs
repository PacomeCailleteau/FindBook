import { userDao } from "../dao/userDao.mjs";

export const userController = {
    async findAll() {
        try {
            return await userDao.getAllUsers();
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


    async loginUser(login, hahedPassword) {
        try {
            return await userDao.loginUser(login, hahedPassword);
        } catch(e) {
            return Promise.reject(e);
        }
    },


    async deleteUser(token) {
        try {
            return await userDao.deleteUser(token);
        } catch(e) {
            return Promise.reject(e);
        }
    },


    async updateUserPassword(token, newPassword) {
        try {
            return await userDao.updateUserPassword(token, newPassword);
        } catch(e) {
            return Promise.reject(e);
        }
    },


    async getUserByLogin(login) {
        try {
            return await userDao.getUserByLogin(login);
        } catch(e) {
            return Promise.reject(e);
        }
    },


    async getUserByToken(token) {
        try {
            return await userDao.getUserByToken(token);
        } catch(e) {
            return Promise.reject(e);
        }
    },


    async addBookFromUser(token, isbn) {
        try {
            return await userDao.addBookFromUser(token, isbn)
        } catch(e) {
            return Promise.reject(e)
        }
    },


    async removeBookFromUser(token, isbn) {
        try {
            return await userDao.removeBookFromUser(token, isbn)
        } catch(e) {
            return Promise.reject(e)
        }
    },

    async updateLogin(token, login) {
        try {
            return await userDao.updateLogin(token, login)
        } catch(e) {
            return Promise.reject(e)
        }
    }
}
