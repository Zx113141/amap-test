import Polygon from './polygon'
import Marker from './marker'

type Embed = Marker | Polygon

class EmbedServie {
    Marker: any = Marker
    Polygon: any = Polygon
    embedList: Embed[] = []
    // material: any = null
    constructor(AMap, mapInstance, server) {
        this.embedList = this.initAllStruct(AMap, mapInstance, server)

    }
    initAllStruct(AMap, mapInstance, server) {
        const embedList: any = []
        Object.keys(server).forEach((key) => {
            server[key].forEach((serve) => {
                if (this[serve]) {
                    // 当前实例化的插件embed
                    const embed = new this[serve](AMap, mapInstance)
                    embedList.push(embed)
                }
            })
        })
        return embedList
    }
    // // 订阅已经实例化的构件
    subscribeEmbed(topic, callback) {
        this.embedList.forEach((embed: Embed) => {

        })
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