
class Pixel {
    mapInstance: any = null
    AMap: any = null

    // marker array
    markers: any[] = []
    constructor(mapInstance, AMap) {
        this.mapInstance = mapInstance
        this.AMap = AMap

    }

    getLngLatByContainer(x: number, y: number) {
        return new this.AMap.Pixel(x, y);
    }

}

export default Pixel