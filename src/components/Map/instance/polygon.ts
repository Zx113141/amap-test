class Polygon {
    mapInstance: any = null
    AMap: any = null
    constructor(mapInstance, AMap) {
        this.mapInstance = mapInstance
        this.AMap = AMap
    }
    addPolygon(data) {
        let polygon = new this.AMap.Polygon({
            path: data,
            fillColor: '#ccebc5',
            strokeOpacity: 1,
            fillOpacity: 0.5,
            strokeColor: '#2b8cbe',
            strokeWeight: 1,
            strokeStyle: 'dashed',
            strokeDasharray: [5, 5],
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
        this.mapInstance.add(polygon);
    }

    pushPolygonToMap(areas) {
        areas.forEach((area) => {
            this.addPolygon(area)
        })
    }
}

export default Polygon