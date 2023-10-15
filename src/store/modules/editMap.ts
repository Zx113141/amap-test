import { defineStore } from 'pinia';
import { store } from '/@/store';
import fetchApi from '/@/api/home';
import { ResInfoList } from '/@/api/home/model';

interface EditMap {
  main: Nullable<ResInfoList>;
  markers: any[],
  plugins: any[],
  polygons: any[],
  material: any
}

export const useEditMap = defineStore({
  id: 'map-edit',
  state: (): EditMap => ({
    // info
    main: null,
    markers: [],
    plugins: [],
    polygons: [],
    material: null
  }),
  getters: {
    getInfo(): Nullable<ResInfoList> {
      return this.main || null;
    },
    getMarkerOptions(): Nullable<EditMap> {
      return this.markers.find(marker => marker.id === this.material.id)
    },
    getCanvasOrMaterial(): Nullable<EditMap> {
      return this.material || null
    }
  },
  actions: {
    chooseMaterial(material) {
      this.material = material
    },
    beforeMapClick(e) {
      const [click] = e
      const positon = [click.lnglat.lng, click.lnglat.lat]
    },
    // map 点击事件
    // const handleClick = (...args) => {
    //   const [click] = args;

    //   switch (currentEvents.value) {
    //     case 'marker':
    //       map.marker.createMarker(, store.getMarkerOptions);
    //     // case 'polygon':

    //     //
    //   }
    // };
    /**
     * @description: login
     */
    async setEditSave() {
      const res = await fetchApi.info();
      if (res) {
        // save token
        this.setInfo(res);
      }
      return res;
    },
  },
});

// Need to be used outside the setup
export function useEditMapWithOut() {
  return useEditMap(store);
}
