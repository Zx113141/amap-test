import Polygon from './base/polygon'
import Marker from './base/marker'
import PointerLayer from './pro/pointLayer'
import MapService from './mapService'
import MouseTool from './base/mouseTool'
import IndexCluster from './base/cluster'

/**
 * in order to manage struct such as [map, marker, polygon, and all of Amap instance]
 * when we need to init map, init this constructor
 * **/
export type Embed = Marker | Polygon | MouseTool | PointerLayer | IndexCluster
export enum EVENTS_MAP {
    CLICK = 'click'
}

export enum SERVER_CONSTRUCT {
    COVER = 'cover',
    LOCA = 'loca'
}

export enum STRUCT_NAME {
    MAP_SERVICE = 'MapService',
    POLYGON = 'Polygon',
    MARKER = 'Marker',
    MOUSE_TOOL = 'MouseTool'
}

export enum MENU_CATE {
    BASE = 'base',
    LOCA = 'loca'
}

class EmbedService {
    // base struct
    Marker: any = Marker
    Polygon: any = Polygon
    MouseTool: any = MouseTool
    // loca struct
    PointerLayer: any = PointerLayer
    IndexCluster: any = IndexCluster
    /**
     * @author {zhangxu}
     * @description map instance and map domId
     * **/
    // mapInstance
    MapService: Nullable<MapService> = null
    // domID
    domId: string = ''

    /**
     * @author {zhangxu}
     * @description struct list manage
     * **/
    // special struct for amp instance list
    currentStruct: Nullable<Embed> = null
    embedList: Embed[] = []

    // current render menu item
    embedMenu: any[] = []
    constructor(domId, embedList) {
        this.embedMenu = embedList
        this.domId = domId
    }
    // 实例化mapService
    initMapService(domId, AMap, mapOptions) {
        this.MapService = new MapService(domId, AMap, mapOptions, this)
    }
    initAllStruct(AMap, Loca, mapOptions) {
        this.initMapService(this.domId, AMap, mapOptions)
        const mepInstance = (this.MapService as MapService).struct
        Object.keys(this.embedMenu).forEach((key) => {
            this.embedMenu[key].forEach((serve) => {
                if (this[serve]) {
                    let embed
                    switch (key) {
                        case SERVER_CONSTRUCT.COVER:
                            embed = new this[serve](AMap, mepInstance, this);
                            break;
                        case SERVER_CONSTRUCT.LOCA:
                            embed = new this[serve](Loca, mepInstance, this);
                            break;
                    }
                    this.embedList.push(embed)
                }
            })
        })
        this.embedList.push(this.MapService)
    }

    // init events for struct 

    // // 订阅已经实例化的构件点击事件
    subscribeEmbed(type: string, ctx: Embed, ...params: any) {
        console.log();
        // this.handleStructEvents(type, ctx, params)
    }
    getCurrent(currentStruct) {
        this.currentStruct = currentStruct
    }
    // // 
    // getEventsFromEngine(e) {
    //     const { type } = e
    //     switch (type) {
    //         case EVENTS_MAP.CLICK:
    //             this.handleClick(e);
    //             break
    //         default:
    //             return;
    //     }

    // }
    // 处理地图点击事件，判断是否添加构件
    handleClick(e) {
        if (this.currentStruct) {
            this.currentStruct?.createStruct(e)
        } else {
            this.MapService?.handleMapClick(e)
        }
    }
    // 移除当前构件
    handleRemove(ctx, e) {
        const id = e.target.getExtData().id
        const name = ctx.name
        e.target.setMap(null)
        e.target = null
        const embed = this.embedList.find((embed) => embed.name === name) as Embed
        embed.structs = embed.structs.filter((struct) => struct.getExtData().id !== id)
    }

    // 销毁事件
    destory(key) {

    }

    notify(name, functionType, ...args) {
        if (this[name][functionType]) {
            const res = this[name][functionType](...args)
        } else {
            const embed = this.embedList.find(embed => embed.name === name)
            if (embed) {
                embed[functionType](...args)
            }
        }

    }
    // // 处理构件事务
    // handleStructEvents(type, ctx, params) {
    //     switch (type) {
    //         case EVENTS_MAP.CLICK:
    //         // this.execeptClick(ctx, params)
    //     }
    // }
    // execeptClick() {

    // }
}

export default EmbedService