import EmbedServie from "./embedService"
class Cover {
    AMap: any = null
    mapInstance: any = null
    private embedService: Nullable<EmbedServie> = null
    constructor(AMap, mapInstance, embedService) {
        this.embedService = embedService
        this.mapInstance = mapInstance
        this.AMap = AMap
    }
    notify(type: string, ...args: any) {
        (this.embedService as EmbedServie).subscribeEmbed(type, this, args)
    }
    create(name, options) {
        const struct = new this.AMap[name]({
            ...options
        })
        return struct
    }
    remove(ctx) {
        ctx.setMap(null)
        this.notify('remove', ctx)
    }

    update() {

    }


}

export default Cover