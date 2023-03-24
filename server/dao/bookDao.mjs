import fetch from "node-fetch";

const apiUrlSearch = "https://www.googleapis.com/books/v1/volumes?q="
const apiUrlIsbn = apiUrlSearch + "isbn:"

const proxy = process.env.https_proxy



export const bookDao = {
    async getBookInformation(isbn) {
        const response = await fetch("https://randomuser.me/api/")
        const data = await response.json()
        return data
    }
}

const res = await bookDao.getBookInformation("9782871292661")
console.log(res)
