class Markers {
    mapInstance: any = null
    AMap: any = null

    // marker array
    markers: any[] = []
    constructor(mapInstance, AMap) {
        this.mapInstance = mapInstance
        this.AMap = AMap
        this.markers
    }

    createMarker(position) {
        const marker = new this.AMap.Marker({
            map: this.mapInstance,
            position,
            icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
            offset: 0
        });
        this.pushMarkerToMap(marker)
    }
    pushMarkerToMap(marker) {
        this.markers.push(marker);
    }
}

export default Markers