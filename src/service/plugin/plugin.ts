
import EmbedService from "../embedService"

class Plugin {
    AMap: any = null
    mapInstance: any = null
    utils: any[] = []
    others: any = []
    private embedService: Nullable<EmbedService> = null
    constructor(AMap, mapInstance, embedService) {
        this.embedService = embedService
        this.mapInstance = mapInstance
        this.AMap = AMap
    }


}

export default Plugin