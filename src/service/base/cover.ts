import EmbedService from "../embedService"
class Cover {
    AMap: any = null
    mapInstance: any = null
    embedService: EmbedService
    constructor(AMap, mapInstance, embedService) {
        this.embedService = embedService
        this.mapInstance = mapInstance
        this.AMap = AMap
    }
    notify(type: string, ctx, ...args: any) {
        (this.embedService as EmbedService).subscribeEmbed(type, ctx, args)
    }
    create(name, options,) {
        const struct = new this.AMap[name]({
            ...options,
            map: this.mapInstance,
            extData: {
                id: window.btoa('' + new Date().getTime()),
                name: options.name,
            },
        })

        this.mapInstance.setFitView([struct])
        struct.on('click', (e) => {
            this.notify('click', this, e)
        })
        struct.on('rightclick', (e) => this.remove(struct.getExtData().name, e))
        return struct

    }
    remove(ctx, e) {
        (this.embedService as EmbedService).handleRemove(ctx, e)
    }
    calcuBoundsLng(x, y) {

        const pixel = new this.AMap.Pixel(x, y);
        const lnglat = this.mapInstance.containerToLngLat(pixel);

        return lnglat
    }

    editStruct(name, ctx, e) {
        this.embedService.getCoverByPluginEdit(name, ctx, e)
        // TODO: to do this we need plugin
        // const rectangleEditor = new this.AMap[name](this.mapInstance, e.target)
        // console.log(rectangleEditor)
    }
}

export default Cover