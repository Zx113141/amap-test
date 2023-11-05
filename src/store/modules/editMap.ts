
import EmbedService, { STRUCT_NAME, MENU_CATE, Embed } from '/@/service/embedService';
// import { * asecharts } from 'echarts/core';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { message } from 'ant-design-vue';
interface EditMap {

  // material: any,
  service: Nullable<EmbedService>
  // embed: any,
  // struct: any,

}

export const useEditMap = defineStore({
  id: 'map-edit',
  state: (): EditMap => ({
    // info
    service: null,
    // embed: {
    //   name: STRUCT_NAME.MAP_SERVICE,
    //   cate: MENU_CATE.BASE,
    // },
    // struct: null,
    // eventLoop: null
  }),
  getters: {
    // getCanvasOrMaterial(): Nullable<EditMap> {
    //   return this.material || null
    // },
  },
  actions: {
    // 获取embed下所有的服务
    pushService(service) {
      this.service = service
    },
  },
});

// Need to be used outside the setup
export function useEditMapWithOut() {
  return useEditMap(store);
}
