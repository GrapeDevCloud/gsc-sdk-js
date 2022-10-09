import {Setting} from "./src/setting";
import {buildInitConfig} from "./src/base";

export class GscSdk{
    config
    constructor(config) {
        this.config = buildInitConfig(config)
    }
    getSetting(user){
        return new Setting(user, this.config)
    }
}
