import Polygon from './polygon'
import Markers from './marker'


class EmbedServie {
    Markers: any = Markers
    Polygon: any = Polygon
    instance: any = null
    // material: any = null
    constructor(AMap, mapInstance, server) {
        if (this[server]) {
            this.instance = new this[server](AMap, mapInstance)
        }

    }
    geInstance() {
        return this.instance
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
        // this.material = {
        //     name: this.material.name,
        //     options: {
        //         ...e.target.De,
        //     }
        // }
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