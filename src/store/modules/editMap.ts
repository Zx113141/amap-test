// import { * asecharts } from 'echarts/core';
import { defineStore } from 'pinia';
import { store } from '/@/store';

interface EditMap {

  // material: any,
  service: any[]
  struct: any
}

export const useEditMap = defineStore({
  id: 'map-edit',
  state: (): EditMap => ({
    // info
    service: [],
    struct: {
      name: 'map'
    }
  }),
  getters: {
    // getCanvasOrMaterial(): Nullable<EditMap> {
    //   return this.material || null
    // },
  },
  actions: {
    pushService(service) {
      this.service = service
    },
    setCurrentService(name: string) {
      this.struct = this.service.find(server => server.name === name)
      console.log(this.service);
    },
    setCurrentStruct(options) {
      this.struct.options = options
    },
    getEvents(e) {
      if (this.struct) {
        this.struct.setEvents(e)
      }
    }
    // // 保存当前构造函数和map实例
    // saveMapContructorAndMapInstane(AMap, map) {
    //   this.AMap = AMap
    //   this.mapInstance = map
    // },
    // // 初始化构件信息
    // initConstruct() {
    //   this.marker = new Markers(this.AMap)
    //   this.polygon = new Polygon(this.AMap)
    // },
    // // 物料选择
    // chooseMaterial(material) {
    //   this.material = material
    //   // implemnt right slide menu options
    // },
    // // 切换地图模式 
    // chooseToMap() {
    //   this.material = {
    //     name: 'map',
    //     options: {},
    //   }
    // },
    // 初始化地图事件
    // beforeMapClick(e) {
    //   if (!this.material) return
    //   const construct = this[this.material.name].create(this.mapInstance, e, this.material.options,)
    //   construct.on('click', this.handleConstruct)
    // },
    // // 获取options传递
    // setOptions(options) {
    //   // 直接赋值给不上，后续
    //   // TODO:

    //   this.material = {
    //     name: this.material.name,
    //     options
    //   }
    // },
    // // 初始化构件点击
    // handleConstruct(e) {
    //   this.material = {
    //     name: this.material.name,
    //     options: {
    //       ...e.target.De,
    //     }
    //   }
    //   const { name } = this.material

    //   // this.chooseToMap()
    //   if (this[name].structs.length > 2) {
    //     // console.log(this[name].structs)
    //     let deleteItem = this[name].structs.find((struct) => (struct.getExtData().id === e.target.getExtData().id))
    //     this[name].structs = this[name].structs.filter((struct) => (struct.getExtData().id !== e.target.getExtData().id))
    //     deleteItem.setMap(null)
    //     deleteItem = null
    //   }
    // },
    // // 移除构件当前构件
    // handleRemoveConstruct() {

    // }
  },
});

// Need to be used outside the setup
export function useEditMapWithOut() {
  return useEditMap(store);
}
