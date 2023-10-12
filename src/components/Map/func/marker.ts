
class Markers {
    mapInstance: any = null
    AMap: any = null

    // marker array
    markers: any[] = []
    constructor(mapInstance, AMap) {
        this.mapInstance = mapInstance
        this.AMap = AMap

    }

    createMarker(position) {
        console.log(this.AMap);
        const marker = new this.AMap.Marker({
            map: this.mapInstance,
            position,
            width: '15px',
            height: '15px',
            icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
            // offset: new this.AMap.Pixel(-13, -30)
            cursor: 'move',
            offset: new this.AMap.Pixel(-13, -30),
            // 设置是否可以拖拽
            draggable: true,
        });
        this.pushMarkerToMap(marker)
    }
    pushMarkerToMap(marker) {
        this.markers.push(marker);
    }
}

export default Markers