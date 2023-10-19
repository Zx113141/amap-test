import EmbedServie from "./embedService"
class Cover {
    AMap: any = null
    mapInstance: any = null
    embedService: Nullable<EmbedServie> = null
    constructor(AMap, mapInstance, embedService) {
        this.embedService = embedService
        this.mapInstance = mapInstance
        this.AMap = AMap
    }
    notify(e: any) {
        (this.embedService as EmbedServie).subscribeEmbedClick(this, e)
    }
    create(name, options) {
        const struct = new this.AMap[name]({
            ...options
        })
        return struct
    }

    update() {

    }


}

export default Cover