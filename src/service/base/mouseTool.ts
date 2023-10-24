import Cover from "./cover"


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
    cate: string = 'base'
    // marker array
    structs: any[] = []
    rect:any = null
    options: any = {}
    constructor(AMap, mapInstance, server) {
        super(AMap, mapInstance, server)
    }
    createStruct(e) {
        if (!this.rect) {
            this.rect = this.create(this.name, this.mapInstance, true)
        }
        const res = this.rect[this.options.type]({
            ...this.options,
            extData: {
                id: new Date().getTime()
            },
        })

     
        // switch (this.options.type) {
        //     case MOUSE_TOOL_TYPE.POLYGON:
        //         this.drawPolygon(rect);
        //         break;
        //     case MOUSE_TOOL_TYPE.POLYLINE:
        //         this.drawPolyline(rect);
        //         break;
        //     case MOUSE_TOOL_TYPE.RECT_ANGLE:
        //         this.drawRectAngle(rect);
        //         break;
        //     case MOUSE_TOOL_TYPE.CIRCLE:
        //         this.drawCircle(rect);
        //         break;
        // }



        rect.on('click', (e) => {
            this.notify('click', this, e)
        })
        rect.on('rightclick', (e) => this.removeMarker(e))
        this.structs.push(rect)
    }

    removeMarker(e) {
        this.remove(this, e)
    }

}

export default MouseTool