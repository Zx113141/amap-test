import EmbedService from "./embedService"

class MapService {
    name: string = 'MapService'
    cate: string = 'base'
    // map array
    embedService: EmbedService
    struct: any = null
    options: any = {

    }

    constructor(domId, AMap, mapOptions, ctx) {
        this.struct = new AMap.Map(domId, {
            ...mapOptions
        })
        this.options = mapOptions
        this.embedService = ctx
        this.injectMapEvents()
    }
    injectEmbedService(server, mapInstance, cb) {
        // this.service = new EmbedServie(this.AMap, this.Loca, mapInstance, server, this)
        // cb(this.service)
    }
    injectMapEvents() {
        this.struct.on('click', this.handleMapClick.bind(this));
    }
    handleMapClick(e) {
        this.embedService.handleClick(e)
    }
    getEvents(e) {
        // this.service?.getEventsFromEngine(e)
    }
    destroyEvents(key, fn) {
        this.struct.off('click', this.handleMapClick);
    }

}

export default MapService