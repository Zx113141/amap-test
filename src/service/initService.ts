import Polygon from './base/polygon'
import Marker from './base/marker'
import PointerLayer from './pro/pointLayer'
import MapService from './service/mapService'
// import MouseTool from './base/mouseTool'
import IndexCluster from './base/cluster'
import Rectangle from './base/rectangle'
import RectangleEditor from './plugin/utils/rectangleEditor'
import Circle from './base/circle'
import CircleEditor from './plugin/utils/circleEditor'
import Camera from './pro/camera'

import { defineAsyncComponent } from 'vue'

export type Embed = Marker | Polygon | Rectangle | PointerLayer | IndexCluster | Circle | MapService
export type Plugin = RectangleEditor | CircleEditor


export enum SERVER_CONSTRUCT {
    COVER = 'cover',
    LOCA = 'loca',
    PLUGIN = 'plugin'
}

export enum STRUCT_NAME {
    MAP_SERVICE = 'MapService',
    POLYGON = 'Polygon',
    MARKER = 'Marker',
    // MOUSE_TOOL = 'MouseTool'
    INDEX_CLUSTER = 'IndexCluster',
    RECTANGLE = 'Rectangle'
}

class InitService {
    // base struct
    Marker: any = Marker
    Polygon: any = Polygon
    Rectangle: any = Rectangle
    Circle: any = Circle
    // plugin utils
    RectangleEditor: any = RectangleEditor
    CircleEditor: any = CircleEditor
    // MouseTool: any = MouseTool
    // loca struct
    PointerLayer: any = PointerLayer
    Camera: any = Camera
    IndexCluster: any = IndexCluster
    /**
     * @author {zhangxu}
     * @description map instance and map domId
     * **/
    // mapInstance
    MapService: Nullable<MapService> = null
    // domID
    domId: string = ''
    // panel Vnode
    panelVNode: any = null
    // current render menu item
    embedMenu: any[] = []
    constructor(domId, embedList) {
        this.embedMenu = embedList
        this.domId = domId
    }
    // 初始化Embed 
    initAllStruct(AMap, Loca, mapOptions,) {
        const embedList: Embed[] = []
        const pluginList: Plugin[] = []
        this.initMapService(this.domId, AMap, mapOptions)
        const mepInstance = (this.MapService as MapService).getInstance('0')
        Object.keys(this.embedMenu).forEach((key) => {
            this.embedMenu[key].forEach((serve) => {
                if (this[serve]) {
                    let embed

                    switch (key) {
                        case SERVER_CONSTRUCT.COVER:
                            embed = new this[serve](AMap, mepInstance, this);
                            break;
                        case SERVER_CONSTRUCT.PLUGIN:
                            const plugin = new this[serve](AMap, mepInstance, this);
                            pluginList.push(plugin)
                            break;
                        case SERVER_CONSTRUCT.LOCA:
                            embed = new this[serve](Loca, mepInstance, this);
                            break;
                    }
                    if (embed) {
                        embedList.push(embed)
                    }
                }
            })
        })
        embedList.push((this.MapService as MapService))
        return {
            embedList,
            pluginList
        }
    }
    // 实例化mapService
    initMapService(domId, AMap, mapOptions) {
        this.MapService = new MapService(domId, AMap, mapOptions, this)
    }


    // 实例化Panel
    echoStructPanel(key) {
        return defineAsyncComponent(() => import(`/@/components/Panel-Components/${key}.vue`))
    }

}

export default InitService