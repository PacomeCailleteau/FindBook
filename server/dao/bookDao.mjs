import fetch from "node-fetch";
import HttpsProxyAgent from "https-proxy-agent";

import { bookModel } from "../model/bookModel.mjs";

const apiUrlSearch = "https://www.googleapis.com/books/v1/volumes?q="
const apiUrlIsbn = apiUrlSearch + "isbn:"
const moreBooks = "&maxResults=40"

const proxy = process.env.https_proxy

let agent = null
if (proxy !== undefined) {
    agent =  new HttpsProxyAgent(proxy);
} else {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export const bookDao = {
    async getBookInformation(isbn) {
        const response = agent != null ? await fetch(apiUrlIsbn + isbn, {agent: agent}): await fetch(apiUrlIsbn + isbn)
        const data = await response.json()

        if (data.totalItems === 0) {
            return null
        }
        return new bookModel(data.items[0].volumeInfo);
    },


    async searchBookInformation(search) {
        const response = agent != null ? await fetch(apiUrlSearch + search + moreBooks, {agent: agent}): await fetch(apiUrlSearch + search + moreBooks)
        const data = await response.json()

        if (data.totalItems === 0) {
            return []
        }

        let books = data.items.map((item) => new bookModel(item.volumeInfo))

        // We filter out books without title or isbn
        books = books.filter(e => e.title && e.isbn)
        return books
    }
}
