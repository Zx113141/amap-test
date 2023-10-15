
class Markers {
    mapInstance: any = null
    AMap: any = null

    // marker array
    markers: any[] = []
    constructor(mapInstance, AMap) {
        this.mapInstance = mapInstance
        this.AMap = AMap

    }

    createMarker(position, options) {
        // console.log(position);
        const marker = new this.AMap.Marker({
            map: this.mapInstance,
            position,
            offset: new this.AMap.Pixel(-30, -60),
            ...options
        });
        this.pushMarkerToMap(marker)
    }
    pushMarkerToMap(marker) {
        this.markers.push(marker);
    }
}

export default Markers