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
    methodUper(str: string) {
        return 'set' + str.slice(0, 1).toUpperCase() + str.slice(1)
    }
    setOptions(options) {

        Object.keys(options).forEach((key) => {

            if (key === 'mapStyle') {
                this.struct[this.methodUper(key)]('amap://styles/' + options[key])
            }
        })
        // amap://styles/normal

    }

}

export default MapService