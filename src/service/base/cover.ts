import EmbedService from "../embedService"
class Cover {
    AMap: any = null
    mapInstance: any = null
    private embedService: Nullable<EmbedService> = null
    constructor(AMap, mapInstance, embedService) {
        this.embedService = embedService
        this.mapInstance = mapInstance
        this.AMap = AMap
    }
    notify(type: string, ctx, ...args: any) {
        (this.embedService as EmbedServie).subscribeEmbed(type, ctx, args)
    }
    create(name, options, isPlugin: boolean = false) {
        if (!isPlugin) {
            const struct = new this.AMap[name](options)
            return struct
        } else {
            let struct
            let that = this
            this.AMap.plugin(`AMap.${name}`, function () {//异步加载插件

                struct = new that.AMap[name](options)
            });
            return struct
        }

    }
    remove(ctx, e) {
        (this.embedService as EmbedServie).handleRemove(ctx, e)
    }
    calcuBoundsLng(x, y) {

        const pixel = new this.AMap.Pixel(x, y);
        const lnglat = this.mapInstance.containerToLngLat(pixel);

        return lnglat
    }

    editStruct(name, e) {
        // TODO: to do this we need plugin
        // const rectangleEditor = new this.AMap[name](this.mapInstance, e.target)
        // console.log(rectangleEditor)
    }
}

export default Cover