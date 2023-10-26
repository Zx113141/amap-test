import Cover from "../base/cover"


export interface IMouseTool {
    fillColor?: string,
    strokeOpacity?: number,
    fillOpacity?: number,
    strokeColor?: string,
    strokeWeight?: number,
    strokeStyle?: 'dashed' | 'solid',
}

export enum MOUSE_TOOL_TYPE {
    POLYGON = 'polygon',
    POLYLINE = 'polyline',
    RECT_ANGLE = 'rectangle',
    CIRCLE = 'circle',
}

class MouseTool extends Cover {

    name: string = 'MouseTool'
    cate: string = 'plugin'
    // marker array
    structs: any[] = []
    rect: any = null
    options: any = {}
    constructor(AMap, mapInstance, server) {
        super(AMap, mapInstance, server)
    }
    createStruct(e?: any) {

        if (!this.rect) {
            this.rect = this.create(this.name, this.mapInstance, true)
            let that = this
            this.rect.on('draw', function (event) {
                that.structs.push(event.obj)
            })
        }
    }
    setOptions(options) {

        const config = {
            strokeColor: 'red',
            strokeWeight: 6,
            strokeOpacity: 0.5,
            strokeDasharray: [30, 10],
            // strokeStyle还支持 solid
            strokeStyle: 'dashed',
            fillColor: 'blue',
            fillOpacity: 0.5,
            cursor: 'pointer',
            zIndex: 50,
            // ...this.options,
            extData: {
                id: new Date().getTime()
            },
        }
        this.createStruct()

        switch (options.type) {

            case MOUSE_TOOL_TYPE.POLYGON:
                this.drawPolygon(config);
                break;
            case MOUSE_TOOL_TYPE.POLYLINE:
                this.drawPolyline(config);
                break;
            case MOUSE_TOOL_TYPE.RECT_ANGLE:
                this.drawRectAngle(config);
                break;
            case MOUSE_TOOL_TYPE.CIRCLE:
                this.drawCircle(config);
                break;
        }
    }
    drawPolygon(config) {
        this.rect.polygon(config)
    }
    drawPolyline(config) {

        this.rect.polyline(config)
    }
    drawRectAngle(config) {
        // console.log(this.options.type);
        this.rect.rectangle(config)
    }
    drawCircle(config) {
        // console.log(this.options.type);
        this.rect.circle(config)
    }

    // removeMarker(e) {
    //     this.remove(this, e)
    // }

}

export default MouseTool