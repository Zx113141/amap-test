import Cover from "./cover"


export interface IMarker {
    width: string,
    height: string,
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
    content?: string,
    offset?: number[],
    direction?: 'top' | 'right' | 'bottom' | 'left' | 'center',
    icon: string
}


class Marker extends Cover {

    name: string = 'Marker'
    // marker array
    structs: any[] = []

    options: any = {}
    constructor(AMap, mapInstance, server) {
        super(AMap, mapInstance, server)
    }
    setEvents(e) {
        const position = [e.lnglat.lng, e.lnglat.lat]
        const configs = {
            map: this.mapInstance,
            position,
            offset: new this.AMap.Pixel(-30, -60),
            ...this.options,
            extData: {
                id: new Date().getTime()
            },
        }
        const marker = this.create(this.name, configs)

        marker.on('click', (e) => {
            this.notify(e)
        })
    }

    removeMarker(item) {
        console.log(1);
        // this.markers.find(marker => marker)
    }
    updateMarkerOptions(options) {

    }
}

export default Marker