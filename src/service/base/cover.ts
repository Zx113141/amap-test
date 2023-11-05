import EmbedService from "../embedService"
import { toRefs } from "vue"

class Cover {
    AMap: any = null
    mapInstance: any = null

    constructor(AMap, mapInstance,) {

        this.mapInstance = mapInstance
        this.AMap = AMap
    }
    notify(type: string, ctx, ...args: any) {
        window.embedService.subscribeEmbed(type, ctx, this, args)
    }
    create(name, options,) {
        const struct = new this.AMap[name]({
            ...options,
            map: this.mapInstance,
            bubble: false,
            extData: {
                id: window.btoa('' + new Date().getTime()),
                name: options.name,
            },
        })

        this.mapInstance.setFitView([struct])
        struct.on('click', (e) => {
            // struct.setOptions({
            //     fillColor: 'blue'
            // })
            this.notify('click', struct, e)
        })
        struct.on('rightclick', (e) => this.remove(struct.getExtData().name, e))
        return struct

    }
    remove(ctx, e) {
        // (this.embedService as EmbedService).handleRemove(ctx, e)
    }
    calcuBoundsLng(x, y) {

        const pixel = new this.AMap.Pixel(x, y);
        const lnglat = this.mapInstance.containerToLngLat(pixel);

        return lnglat
    }
    update(params) {
        const [ctx, options] = params[0]

        ctx.setOptions({ ...options })
    }
    // editStruct(name, ctx, e) {
    //     // this.embedService.getCoverByPluginEdit(name, ctx, e)
    //     // TODO: to do this we need plugin
    //     // const rectangleEditor = new this.AMap[name](this.mapInstance, e.target)
    //     // console.log(rectangleEditor)
    // }
}

export default Cover