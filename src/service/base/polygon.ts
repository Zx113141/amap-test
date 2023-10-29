import Cover from "./cover"
export interface IPoly {
    fillColor?: string,
    strokeOpacity?: number,
    fillOpacity?: number,
    strokeColor?: string,
    strokeWeight?: number,
    strokeStyle?: 'dashed' | 'solid',
    strokeDasharray?: number[],
    path: [],
}


class Polygon extends Cover {
    name: string = 'Polygon'
    // marker array
    structs: any[] = []
    cate: string = 'base'
    options: any = {}
    constructor(AMap, mapInstance, server) {
        super(AMap, mapInstance, server)
    }

    createStruct(e) {
        // const position = [e.lnglat.lng, e.lnglat.lat]
        const configs = {

            offset: new this.AMap.Pixel(-30, -60),
            ...this.options,

        }
        const polygon = this.create(this.name, configs)

        polygon.on('click', (e) => {
            this.notify('click', e)
        })
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
        // mapInstance.add(polygon);
        // this.structs.push(polygon)
    }

    // pushPolygonToMap(areas) {
    //     areas.forEach((area) => {
    //         this.addPolygon(area)
    //     })
    // }
}

export default Polygon