import Cover from "./cover"


export interface IMarker {
    name: string,
    width: number,
    height: number,
    topWhenClick: boolean,
    draggable: boolean,
    cursor?: string,
    visible: boolean,
    zIndex: number,
    angle: number,
    animation: "AMAP_ANIMATION_NONE" | 'AMAP_ANIMATION_DROP' | 'AMAP_ANIMATION_BOUNCE',
    title: string,
    clickable?: boolean,
    extData?: any,

    offset?: number[],
    customContent?: boolean

    icon: string
    label?: {
        content?: string,
        direction?: 'top' | 'right' | 'bottom' | 'left' | 'center',
    }
}


class Marker extends Cover {

    name: string = 'Marker'
    cate: string = 'base'
    // marker array
    structs: any[] = []

    options: any = {}
    constructor(AMap, mapInstance, server) {
        super(AMap, mapInstance, server)
    }
    createStruct(e) {

        const position = [e.lnglat.lng, e.lnglat.lat]
        const configs = {

            position,
            offset: this.calculatePixelOffset(),

            ...this.options,
            icon: this.calculateIconSize(),

        }
        const marker = this.create(this.name, configs)


        this.structs.push(marker)
        // console.log(this.embedService);
    }
    calculateIconSize() {
        const width = this.options.width || 36
        const height = this.options.height || 36
        const imgSrc = this.options.icon || '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png'
        return new this.AMap.Icon({
            image: imgSrc,
            imageSize: new this.AMap.Size(width, height),
            size: new this.AMap.Size(width, height),
        })
    }
    calculatePixelOffset() {
        const width = this.options.width || 36
        const height = this.options.height || 36
        return new this.AMap.Pixel(-width / 2, -height)
    }
    removeMarker(e) {
        this.remove(this, e)
    }
    updateMarkerOptions(options) {

    }
}

export default Marker