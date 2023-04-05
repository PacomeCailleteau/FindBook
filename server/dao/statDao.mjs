import fetch from "node-fetch";
import HttpsProxyAgent from "https-proxy-agent";
import {statModel} from "../model/statModel.mjs";

const url = "https://serpapi.com/search.json?engine=google_trends&data_type=TIMESERIES&cat=22&date=today%201-m&tz=60"
const apiKey = "&api_key=02b61f20be26255add258343e5d727745d6f0bcbac012c6e46b858f6f4406be4"
const apiUrl = url + apiKey + "&q="


const proxy = process.env.https_proxy

let agent = null
if (proxy !== undefined) {
    agent =  new HttpsProxyAgent(proxy);
} else {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export const statDao = {
    async getStatInformation(search) {
        const response = agent != null ? await fetch(apiUrl + search, {agent: agent}): await fetch(apiUrl + search)
        const data = await response.json()
        return new statModel(data)
    }
}