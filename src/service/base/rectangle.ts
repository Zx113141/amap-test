import Cover from "./cover"


export interface IRectangle {
    name: string,
    fillColor: string,
    strokeOpacity: number,
    fillOpacity: number,
    strokeColor: string,
    strokeWeight: number,
    strokeStyle: 'dashed' | 'solid',
    strokeDasharray: number[],
    path: [],
}


class Rectangle extends Cover {

    name: string = 'Rectangle'
    cate: string = 'base'
    // marker array
    structs: any[] = []
    editable: boolean = false
    options: any = {}
    constructor(AMap, mapInstance,) {
        super(AMap, mapInstance,)
    }
    createStruct(e) {
        const width = 40
        const height = 40
        const southWest = this.calcuBoundsLng(e.pixel.x - width, e.pixel.y - height)
        const northEast = this.calcuBoundsLng(e.pixel.x + width, e.pixel.y + height)

        // var southWest = new this.AMap.LngLat(116.356449, 39.859008)


        const bounds = new this.AMap.Bounds(southWest, northEast)
        const position = [e.lnglat.lng, e.lnglat.lat]
        const configs = {

            bounds,
            position,
            ...this.options,


        }

        const rectangle = this.create(this.name, configs)
        // console.log(rectangle)
        // rectangle.on('click', (e) => {

        // })
        // rectangle.on('rightclick', (e) => this.editStruct('RectangleEditor', this, e))
        this.structs.push(rectangle)
    }
    removeMarker(e) {
        this.remove(this, e)
    }



}

export default Rectangle