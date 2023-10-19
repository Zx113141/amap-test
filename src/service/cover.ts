class Cover {
    AMap: any = null
    mapInstance: any = null
    constructor(AMap, mapInstance) {
        this.mapInstance = mapInstance
        this.AMap = AMap
    }
    create(name, options) {
        const struct = new this.AMap[name]({
            ...options
        })
        return struct
    }
}

export default Cover