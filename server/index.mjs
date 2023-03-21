import { userDao } from "./dao/userDao.mjs";

const users = await userDao.getAllUser();
console.log(users);
