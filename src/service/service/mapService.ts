import EmbedService from "./embedService"

class MapService {
    name: string = 'MapService'
    cate: string = 'base'
    // map array

    structs: any[] = []
    options: any = {

    }

    constructor(domId, AMap, mapOptions, ctx) {
        const struct = new AMap.Map(domId, {
            ...mapOptions
        })
        this.structs.push(struct)
        this.options = mapOptions

        this.injectMapEvents()
    }
    injectMapEvents() {
        this.structs[0].on('click', this.handleMapClick.bind(this));
    }
    handleMapClick(e) {
        // this.embedService.handleEvents(this.name, 'click', e)
    }
    destroyEvents() {
        this.structs[0].off('click', this.handleMapClick);
    }
    methodUper(str: string) {
        return 'set' + str.slice(0, 1).toUpperCase() + str.slice(1)
    }
    setOptions(options) {

        Object.keys(options).forEach((key) => {

            if (key === 'mapStyle') {

                this.structs[0][this.methodUper(key)](options[key])
            }
        })
        // amap://styles/normal

    }
    getInstance(key) {
        return this.structs[key]
    }

}

export default MapService