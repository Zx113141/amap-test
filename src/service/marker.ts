

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

    // marker array
    markers: any[] = []
    constructor(AMap) {
        this.AMap = AMap

    }
    createMarker(mapInstance, position, options) {

        const marker = new this.AMap.Marker({
            map: mapInstance,
            position,
            offset: new this.AMap.Pixel(-30, -60),
            ...options,
            extData: {
                id: new Date().getTime()
            },
        });
        return marker
    }
    updateMarkerOptions(options) {

    }
}

export default Markers