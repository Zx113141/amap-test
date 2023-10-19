import Cover from "./cover"


export interface IMarker {
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
    // marker array
    structs: any[] = []

    options: any = {}
    constructor(AMap, mapInstance, server) {
        super(AMap, mapInstance, server)
    }
    createStruct(e) {

        const position = [e.lnglat.lng, e.lnglat.lat]
        const configs = {
            map: this.mapInstance,
            position,
            offset: this.calculatePixelOffset(),

            ...this.options,
            icon: this.calculateIconSize(),
            extData: {
                id: new Date().getTime()
            },
        }
        const marker = this.create(this.name, configs)

        marker.on('click', (e) => {
            this.notify('click', e)
        })
    }
    calculateIconSize() {
        const width = this.options.width || 10
        const height = this.options.height || 10
        return new this.AMap.Icon({
            imageSize: new this.AMap.Size(width, height),
            size: new this.AMap.Size(width, height),
        })
    }
    calculatePixelOffset() {
        const width = this.options.width || 10
        const height = this.options.height || 10
        return new this.AMap.Pixel(-width / 2, -height)
    }
    removeMarker() {
        this.remove(this)
        // this.markers.find(marker => marker)
    }
    updateMarkerOptions(options) {

    }
}

export default Marker