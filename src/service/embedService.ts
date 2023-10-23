import Polygon from './base/polygon'
import Marker from './base/marker'
import PointerLayer from './pro/pointLayer'
import MapService from './mapService'

/**
 * in order to manage struct such as [map, marker, polygon, and all of Amap instance]
 * when we need to init map, init this constructor
 * **/
export type Embed = Marker | Polygon
export enum EVENTS_MAP {
    CLICK = 'click'
}

export enum ServerConstruct {
    COVER = 'cover',
    LOCA = 'loca'
}

class EmbedService {
    // base struct
    Marker: any = Marker
    Polygon: any = Polygon
    // loca struct
    PointerLayer: any = PointerLayer

    /**
     * @author {zhangxu}
     * @description map instance and map domId
     * **/
    // mapInstance
    mapInstance: Nullable<MapService> = null
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
        this.mapInstance = new MapService(domId, AMap, mapOptions, this)
    }
    initAllStruct(AMap, Loca, mapOptions) {
        this.initMapService(this.domId, AMap, mapOptions)

        const mepInstance = (this.mapInstance as MapService).struct
        Object.keys(this.embedMenu).forEach((key) => {
            this.embedMenu[key].forEach((serve) => {
                if (this[serve]) {
                    // 创建观察者embed
                    let embed
                    switch (key) {
                        case ServerConstruct.COVER:
                            embed = new this[serve](AMap, mepInstance, this);
                            break;
                        case ServerConstruct.LOCA:
                            embed = new this[serve](Loca, mepInstance, this);
                            break;
                    }
                    this.embedList.push(embed)
                }
            })
        })
        this.embedList.push(this.mapInstance)
    }

    // init events for struct 

    // // 订阅已经实例化的构件点击事件
    subscribeEmbed(type, ctx, ...params: any) {
        // this.handleStructEvents(type, ctx, params)
    }
    getCurrent(currentStruct) {
        this.currentStruct = currentStruct
    }
    // 
    getEventsFromEngine(e) {
        const { type } = e
        switch (type) {
            case EVENTS_MAP.CLICK:
                this.handleClick(e);
                break
            default:
                return;
        }

    }
    // 处理地图点击事件，判断是否添加构件
    handleClick(e) {
        if (this.currentStruct) {
            this.currentStruct?.createStruct(e)
        } else {
            this.mapInstance?.handleMapClick(e)
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