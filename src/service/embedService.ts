import Polygon from './polygon'
import Marker from './marker'
import EngineService from './engineService'


export type Embed = Marker | Polygon

class EmbedServie {
    Marker: any = Marker
    Polygon: any = Polygon
    currentStruct: Nullable<Embed> = null
    embedList: Embed[] = []
    engineInstance: Nullable<EngineService> = null
    // material: any = null
    constructor(AMap, mapInstance, server, engineInstance) {
        this.engineInstance = engineInstance
        this.embedList = this.initAllStruct(AMap, mapInstance, server)

    }
    // 观察者模式 
    initAllStruct(AMap, mapInstance, server) {
        const embedList: any = []
        Object.keys(server).forEach((key) => {
            server[key].forEach((serve) => {
                if (this[serve]) {
                    // 创建观察者embed
                    const embed = new this[serve](AMap, mapInstance, this)
                    embedList.push(embed)
                }
            })
        })
        return embedList
    }
    // // 订阅已经实例化的构件点击事件
    subscribeEmbed(type, ctx, ...params: any) {
        this[type](ctx, params)
    }
    getCurrent(currentStruct) {
        this.currentStruct = currentStruct
    }
    // 
    getEventsFromEngine(e) {
        const struct = this.embedList.find((embed: Embed) => embed.name === this.currentStruct?.name)
        struct?.createStruct(e)
    }
    // embed click 事件
    click(ctx, params) {

    }
    // 初始化地图事件
    // beforeMapClick(e) {
    //     if (!this.material) return
    //     console.log(this.material);
    //     const construct = this[this.material.type].create(this.mapInstance, e, this.material.options)
    //     construct.on('click', this.handleConstruct)
    // }
    // 初始化构件点击
    handleConstruct(e) {

    }
    // // 移除构件,当前构件
    // handleRemoveConstruct() {
    //     const { name } = this.material
    //     if (this[name].structs.length > 2) {
    //         let deleteItem = this[name].structs.find((struct) => (struct.getExtData().id === e.target.getExtData().id))
    //         this[name].structs = this[name].structs.filter((struct) => (struct.getExtData().id !== e.target.getExtData().id))
    //         deleteItem.setMap(null)
    //         deleteItem = null
    //     }
    // }
    handleClick() {

    }
    handleRemove() {

    }
    handleAdd() {

    }
}

export default EmbedServie