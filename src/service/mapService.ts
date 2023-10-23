

class MapService {
    name: string = 'MapService'
    cate: string = 'base'
    // map array
    struct: any = null
    options: any = {

    }

    constructor(domId, AMap, mapOptions) {
        this.struct = new AMap.Map(domId, {
            ...mapOptions
        })
        this.options = mapOptions
    }
    initMapService(AMap, Loca, mapInstance) {
        // this.AMap = AMap
        // this.mapInstance = mapInstance
        // this.Loca = Loca
    }

    injectEmbedService(server, mapInstance, cb) {
        // this.service = new EmbedServie(this.AMap, this.Loca, mapInstance, server, this)
        // cb(this.service)
    }
    injectMapEvents(key, fn) {
        // this.mapInstance.on(key, fn);
    }
    getEvents(e) {
        // this.service?.getEventsFromEngine(e)
    }
    destroyEvents(key, fn) {
        // this.mapInstance.off(key, fn);
    }

    // map 事件对象处理
    handleMapClick(e) {
        // do somethings
    }
}

export default MapService