import EmbedServie from "./embedService"

class EngineService {
    mapInstance: any  // 高德地图实例

    AMap: any         // 高德地图构造函数 

    initEngine(AMap, mapInstance) {
        this.AMap = AMap
        this.mapInstance = mapInstance
    }

    injectEmbedService(server, mapInstance, cb) {
        let service: any[] = []
        Object.keys(server).forEach((key) => {
            server[key].forEach((serve) => {
                // console.log();
                const embedService = new EmbedServie(this.AMap, mapInstance, serve).geInstance()
                // embedService.mapInstance = this.mapInstance
                service.push(embedService)
            })
        })
        cb(service)
    }
    injectMapEvents(key, fn) {
        this.mapInstance.on(key, fn);
    }
}

export default EngineService