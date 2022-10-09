import axios from "axios";
import {buildHeader, buildParam, buildResponse, buildUrl} from "../base/index.js";

export class Setting{
    appId
    config
    user
    data
    constructor(user, config) {
        this.appId = config.appId
        this.config = config
        this.user = user
        this.data = {}
    }

    put(key, val){
        this.data[key] = val
        return this
    }

    remove(key){
        delete this.data[key]
        return this
    }

    get(key){
        return this.data[key]
    }

    store(type){
        const p = [
            this.appId,
            this.user,
            type,
            `j:` + JSON.stringify(this.data)
        ]
        return new Promise((resolve, reject) => {
            axios.post(
                buildUrl(this.config, "setting-service", "SettingService", "store"),
                buildParam(p),
                {
                    headers : buildHeader(this.config)
                }
            ).then(response => {
                resolve(buildResponse(response))
            }).catch((error) => {
                reject(error)
            }).finally(() => {})
        })
    }

    load(type){
        const p = [
            this.appId,
            this.user,
            type
        ]
        return new Promise((resolve, reject) => {
            axios.post(
                buildUrl(this.config, "setting-service", "SettingService", "load"),
                buildParam(p),
                {
                    headers : buildHeader(this.config)
                }
            ).then(response => {
                try {
                    const r = response.data
                    this.data = r.record
                }
                catch (e){
                    console.error(e)
                }
                finally {
                    resolve(this)
                }
            }).catch((error) => {
                reject(error)
            }).finally(() => {})
        })
    }
}
