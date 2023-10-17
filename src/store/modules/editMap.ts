// import { * asecharts } from 'echarts/core';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { useMarkerWithOut } from './marker'
import { ResInfoList } from '/@/api/home/model';
import Markers from '/@/service/marker';
import Polygon from '/@/service/polygon';
import { shanghai, suzhou, wuxi } from '/@/config/constant/polygon.area.js';

import { mergeOptions } from '/@/utils/merge';

interface EditMap {
  AMap: any,
  mapInstance: any
  material: any,
  marker: any
}

export const useEditMap = defineStore({
  id: 'map-edit',
  state: (): EditMap => ({
    // info
    AMap: null,
    mapInstance: null,
    marker: null,
    material: {
      name: 'map',
      options: {},
    }
  }),
  getters: {
    getCanvasOrMaterial(): Nullable<EditMap> {
      return this.material || null
    },
  },
  actions: {
    // 保存当前构造函数和map实例
    saveMapContructorAndMapInstane(AMap, map) {
      this.AMap = AMap
      this.mapInstance = map
    },
    // 初始化构件信息
    initConstruct() {
      this.marker = new Markers(this.AMap)
      this.polygon = new Polygon(this.AMap)
    },
    // 物料选择
    chooseMaterial(material) {
      this.material = material
      // implemnt right slide menu options

    },
    // 切换地图模式 
    chooseToMap() {
      this.material = {
        name: 'map',
        options: {},
      }
    },
    // 初始化地图事件
    beforeMapClick(e) {
      if (!this.material) return
      const construct = this[this.material.name].create(this.mapInstance, e, this.material.options)
      construct.on('click', this.handleConstruct)

    },
    // 获取options传递
    setOptions(options) {
      // 直接赋值给不上，后续
      // TODO 
      this.material = {
        name: this.material.name,
        options
      }
    },
    // 初始化构件点击
    handleConstruct(e) {
      this.material = {
        name: this.material.name,
        options: {
          ...e.target.De,
        }
      }
      const { name } = this.material

      // this.chooseToMap()
      if (this[name].structs.length > 2) {
        // console.log(this[name].structs)
        const deleteItem = this[name].structs.find((struct) => (struct.getExtData().id === e.target.getExtData().id))
        this[name].structs = this[name].structs.filter((struct) => (struct.getExtData().id !== e.target.getExtData().id))
        deleteItem.setMap(null)
        deleteItem = null
      }
    },
    // 移除构件当前构件
    handleRemoveConstruct() {

    }
  },
});

// Need to be used outside the setup
export function useEditMapWithOut() {
  return useEditMap(store);
}
