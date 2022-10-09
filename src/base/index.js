import {isString} from "lodash";

function getServicePort(config, service){
    const services = config.services
    return services.hasOwnProperty(service) ? services[service] : 80
}

export function buildUrl(config, service, worker, action){
    let url = `${config.url}:${getServicePort(config, service)}`;
    url += config.debug ? "" : "/api"
    const _url = `${url}/${service}/${worker}/${action}`
    return _url
}

export function buildParam(array){
    let p = "gsc-post:"
    for(let key of array){
        p += (key + ":,")
    }
    if( p.endsWith(":,") ){
        p = p.substring(0, p.length -2)
    }
    return p
}

export function buildHeader(config){
    return {
        appID: config._appId
    }
}

export function buildInitConfig(config){
    if( !config.hasOwnProperty("_appId") ){
        config["_appId"] = "O7ir9f29OkqSVJFPOT4cCWj396zssr5xsdwzLuOqoBEil"
    }
    return config
}

export function buildResponse(response){
    if( response.status !== 200 ){
        return {
            errorcode: 5,
            message: "服务器异常"
        }
    }
    try{
        return isString(response.data) ? JSON.parse(response.data) : response.data
    } catch (e){
        return {
            errorcode: 4,
            message: "返回数据异常"
        }
    }
}
