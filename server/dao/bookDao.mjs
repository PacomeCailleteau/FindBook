import fetch from "node-fetch";
import HttpsProxyAgent from "https-proxy-agent";

import { bookModel } from "../model/bookModel.mjs";

const apiUrlSearch = "https://www.googleapis.com/books/v1/volumes?q="
const apiUrlIsbn = apiUrlSearch + "isbn:"

const proxy = process.env.https_proxy

let agent = null
if (proxy !== undefined) {
    agent =  new HttpsProxyAgent(proxy);
} else {
    // pour pouvoir consulter un site avec un certificat invalide
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
        const response = agent != null ? await fetch(apiUrlSearch + search, {agent: agent}): await fetch(apiUrlSearch + search)
        const data = await response.json()
        return data.items.map((item) => new bookModel(item.volumeInfo))
    }
}
