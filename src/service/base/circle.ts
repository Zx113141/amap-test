import Cover from "./cover"


export interface ICircle {
    fillColor: string,
    strokeOpacity: number,
    fillOpacity: number,
    strokeColor: string,
    strokeWeight: number,
    strokeStyle: 'dashed' | 'solid',
    strokeDasharray: number[],
    path: [],
}


class Circle extends Cover {

    name: string = 'Circle'
    cate: string = 'base'
    // marker array
    structs: any[] = []
    editable: boolean = false
    options: any = {}
    constructor(AMap, mapInstance, server) {
        super(AMap, mapInstance, server)
    }
    createStruct(e) {
        const center = [e.lnglat.lng, e.lnglat.lat]
        console.log(center);
        const radius = 5000
        const config = {
            // radius: 1000, //半径
            borderWeight: 3,
            strokeColor: "#FF33FF",
            strokeOpacity: 1,
            strokeWeight: 6,

            fillOpacity: 1,
            strokeStyle: 'dashed',
            strokeDasharray: [10, 10],
            // 线样式还支持 'dashed'
            fillColor: '#1791fc',

        }
        const configs = {
            map: this.mapInstance,
            radius,
            center,
            ...config,
            // ...this.options,

        }

        const circle = this.create(this.name, configs)
        // console.log(rectangle)
        circle.on('click', (e) => {
            this.notify('click', this, e)
        })
        circle.on('rightclick', (e) => this.editStruct('CircleEditor', this, e))
        this.structs.push(circle)
    }
    removeMarker(e) {
        this.remove(this, e)
    }

    updateMarkerOptions(options) {

    }


}

export default Circle