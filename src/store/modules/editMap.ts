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
    // 初始化地图事件
    beforeMapClick(e) {
      if (!this.material) return
      switch (this.material.name) {
        case 'marker':
          this.createMarker(e);
          break;
        case 'polygon':
          this.createPolygon(e);
          break;
      }
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
      //e.target.setIcon('//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png')
      // console.log(this.material);
    },
    // 创建marker
    createMarker(e) {
      const positon = [e.lnglat.lng, e.lnglat.lat]
      const marker = this.marker.createMarker(this.mapInstance, positon, this.material.options)
      // console.log(marker);
      marker.on('click', this.handleConstruct)
    },
    // 创建polygon
    createPolygon(e, data) {
      const options = {
        fillColor: '#ccebc5',
        strokeOpacity: 1,
        fillOpacity: 0.5,
        strokeColor: '#2b8cbe',
        strokeWeight: 1,
        strokeStyle: 'dashed',
        strokeDasharray: [5, 5],
      }
      this.polygon.createPolygon(this.mapInstance, shanghai, options)
    }


  },
});

// Need to be used outside the setup
export function useEditMapWithOut() {
  return useEditMap(store);
}
