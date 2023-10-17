class Polygon {
    AMap: any = null

    markers: any[] = []
    constructor(AMap) {
        this.AMap = AMap
    }

    createPolygon(mapInstance, path, options) {
        // console.log(mapInstance, path, options)
        let polygon = new this.AMap.Polygon({
            path,
            ...options
        });
        polygon.on('mouseover', () => {
            polygon.setOptions({
                fillOpacity: 0.7,
                fillColor: '#7bccc4'
            })
        })
        polygon.on('mouseout', () => {
            polygon.setOptions({
                fillOpacity: 0.5,
                fillColor: '#ccebc5'

            })
        })
        polygon.on('click', (e) => {
            console.log(e);
        })
        mapInstance.add(polygon);
    }

    // pushPolygonToMap(areas) {
    //     areas.forEach((area) => {
    //         this.addPolygon(area)
    //     })
    // }
}

export default Polygon