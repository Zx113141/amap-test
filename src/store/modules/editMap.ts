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
  materialOptions: any
}

export const useEditMap = defineStore({
  id: 'map-edit',
  state: (): EditMap => ({
    // info
    AMap: null,
    mapInstance: null,
    // markers: [],
    // plugins: [],
    // polygons: [],
    material: 1,
    materialOptions: null
  }),
  getters: {
    getCanvasOrMaterial(): Nullable<EditMap> {
      return this.material || null
    },
  },
  actions: {
    saveMapContructorAndMapInstane(AMap, map) {
      this.AMap = AMap
      this.mapInstance = map
    },
    createMarker(e) {
      const markerStore = useMarkerWithOut()
      const positon = [e.lnglat.lng, e.lnglat.lat]
      console.log(this.material.options);
      const marker = (new Markers(this.AMap)).createMarker(this.mapInstance, positon, mergeOptions(this.material.options))
      markerStore.pushToMarkers(marker)
    },
    chooseMaterial(material) {
      this.material = material
      // implemnt right slide menu options
      this.renderMenuSlide(material.options)
    },
    beforeMapClick(e) {
      if (!this.material) return
      switch (this.material.name) {
        case 'marker':
          this.createMarker(e);
          break;

      }


    },
    //render menu 
    renderMenuSlide(options) {

      this.materialOptions = options

    },

  },
});

// Need to be used outside the setup
export function useEditMapWithOut() {
  return useEditMap(store);
}
