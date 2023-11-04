import EmbedService from "./embedService"

class MapService {
    name: string = 'MapService'
    cate: string = 'base'
    // map array
    // embedService: EmbedService
    structs: any[]
    options: any = {

    }

    constructor(domId, AMap, mapOptions) {
        this.structs = []
        this.structs.push(new AMap.Map(domId, {
            ...mapOptions,

        }))
        this.options = mapOptions
        // this.embedService = ctx
        this.injectMapEvents()
    }
    injectMapEvents() {
        this.structs[0].on('click', this.handleMapClick.bind(this));
    }
    handleMapClick(e) {
        window.embedService.handleClick(e)
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

}

export default MapService