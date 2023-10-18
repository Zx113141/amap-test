

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


class Markers {
    AMap: any = null
    name: string = 'Markers'
    // marker array
    structs: any[] = []
    mapInstance: any = null
    options: any = {}
    constructor(AMap, mapInstance) {
        this.AMap = AMap
        this.mapInstance = mapInstance
    }
    create(e) {
        const position = [e.lnglat.lng, e.lnglat.lat]
        // const marker = this.marker.createMarker(this.mapInstance, positon, this.material.options)
        // const store = useMarkerWithOut()
        const marker = new this.AMap.Marker({
            map: this.mapInstance,
            position,
            offset: new this.AMap.Pixel(-30, -60),
            ...this.options,
            extData: {
                id: new Date().getTime()
            },
        });
        // marker.on()
        this.structs.push(marker)
        return marker
    }
    setEvents(e) {
        this.create(e)
    }
    removeMarker(item) {
        console.log(1);
        // this.markers.find(marker => marker)
    }
    updateMarkerOptions(options) {

    }
}

export default Markers