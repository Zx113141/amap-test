import EmbedServie from "./embedService"

class EngineService {
    mapInstance: any  // 高德地图实例
    Loca: any
    AMap: any         // 高德地图构造函数 
    service: Nullable<EmbedServie> = null
    initEngine(AMap, Loca, mapInstance) {
        this.AMap = AMap
        this.mapInstance = mapInstance
        this.Loca = Loca
    }

    injectEmbedService(server, mapInstance, cb) {
        this.service = new EmbedServie(this.AMap, this.Loca, mapInstance, server, this)
        cb(this.service)
    }
    injectMapEvents(key, fn) {
        this.mapInstance.on(key, fn);
    }
    getEvents(e) {
        this.service?.getEventsFromEngine(e)
    }
    destroyEvents(key, fn) {
        this.mapInstance.off(key, fn);
    }

    // map 事件对象处理
    handleMapClick(e) {
        // do somethings
    }
}

export default EngineService