import Polygon from './base/polygon'
import Marker from './base/marker'
import PointerLayer from './pro/pointLayer'
import MapService from './mapService'


export type Embed = Marker | Polygon
export enum EVENTS_MAP {
    CLICK = 'click'
}

export enum ServerConstruct {
    COVER = 'cover',
    LOCA = 'loca'
}

class EmbedServie {
    Marker: any = Marker
    Polygon: any = Polygon
    PointerLayer: any = PointerLayer
    currentStruct: Nullable<Embed> = null
    embedList: Embed[] = []
    mapServiceInstance: Nullable<MapService> = null
    // material: any = null
    constructor(AMap, Loca, mapInstance, server, mapServiceInstance) {
        this.mapServiceInstance = mapServiceInstance
        this.embedList = this.initAllStruct(AMap, Loca, mapInstance, server)

    }
    // 观察者模式 
    initAllStruct(AMap, Loca, mapInstance, server) {
        const embedList: any = []
        Object.keys(server).forEach((key) => {
            server[key].forEach((serve) => {
                if (this[serve]) {
                    // 创建观察者embed
                    let embed
                    switch (key) {
                        case ServerConstruct.COVER:
                            embed = new this[serve](AMap, mapInstance, this);
                            break;
                        case ServerConstruct.LOCA:
                            embed = new this[serve](Loca, mapInstance, this);
                            break;
                    }
                    embedList.push(embed)
                }
            })
        })
        return embedList
    }
    // // 订阅已经实例化的构件点击事件
    subscribeEmbed(type, ctx, ...params: any) {
        this.handleStructEvents(type, ctx, params)
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
            this.mapServiceInstance?.handleMapClick(e)
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

    // 处理构件事务
    handleStructEvents(type, ctx, params) {
        switch (type) {
            case EVENTS_MAP.CLICK:
            // this.execeptClick(ctx, params)
        }
    }
    execeptClick() {

    }
}

export default EmbedServie