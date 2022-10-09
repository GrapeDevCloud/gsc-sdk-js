import {GscSdk} from "../index.js";

describe('云配置测试', () => {
    const sdk = new GscSdk({
        url: "http://127.0.0.1",
        services: {
            "setting-service": 5002,
        },
        debug: true,
        appId: "6332cc1eaf988b1adbc6f0d8"
    })
    const setting = sdk.getSetting("putao520")

    test("储存配置测试", async () => {
        setting.put("test1", "test_val")
        const r = await setting.store("testType")
        expect(r.errorcode).toBe(0)
    })

    test("读取配置测试", async () => {
        await setting.load("testType")
        const j = setting.get("test1")
        expect(j).toBe("test_val")
    })
})
