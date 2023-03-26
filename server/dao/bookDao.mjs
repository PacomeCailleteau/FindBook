import fetch from "node-fetch";

import { bookModel } from "../model/bookModel.mjs";

const apiUrlSearch = "https://www.googleapis.com/books/v1/volumes?q="
const apiUrlIsbn = apiUrlSearch + "isbn:"

export const bookDao = {
    async getBookInformation(isbn) {
        const response = await fetch(apiUrlIsbn + isbn)
        const data = await response.json()
        if (data.totalItems === 0) {
            return null
        }
        return new bookModel(data.items[0].volumeInfo);
    },


    async searchBookInformation(search) {
        const response = await fetch(apiUrlSearch + search)
        const data = await response.json()
        return data.items.map((item) => new bookModel(item.volumeInfo))
    }
}
