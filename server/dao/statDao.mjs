import fetch from "node-fetch";
import HttpsProxyAgent from "https-proxy-agent";
import {statModel} from "../model/statModel.mjs";

const url = "https://serpapi.com/search.json?engine=google_trends&data_type=TIMESERIES&cat=22&date=today%201-m&tz=60"
const apiKey = "&api_key=32" // b38f44324e616859286793b81a886039c76186119d3c93c2ab86690a90388b87
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