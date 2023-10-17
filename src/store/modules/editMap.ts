// import { * asecharts } from 'echarts/core';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { useMarkerWithOut } from './marker'
import { ResInfoList } from '/@/api/home/model';
import Markers from '/@/service/marker';
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
    },
    // 物料选择
    chooseMaterial(material) {
      this.material = material
      // implemnt right slide menu options

    },
    // 初始化地图事件
    beforeMapClick(e) {
      if (!this.material) return
      switch (this.material.name) {
        case 'marker':
          this.createMarker(e);
          break;

      }
    },
    // 获取options传递
    setOptions(options) {
      this.material = {
        name: this.material.name,
        options
      }
    },
    // 初始化构件点击
    handleConstruct(e) {
      this.material.options = e.target.De
    },
    // 创建marker
    createMarker(e) {
      const positon = [e.lnglat.lng, e.lnglat.lat]
      const marker = this.marker.createMarker(this.mapInstance, positon, this.material.options)
      marker.on('click', this.handleConstruct)
      // marker.pushToMarkers(marker)
    },




  },
});

// Need to be used outside the setup
export function useEditMapWithOut() {
  return useEditMap(store);
}
