import EmbedService, { STRUCT_NAME, MENU_CATE } from '/@/service/embedService';
// import { * asecharts } from 'echarts/core';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { message } from 'ant-design-vue';
interface EditMap {

  // material: any,
  service: EmbedService
  struct: any
}

export const useEditMap = defineStore({
  id: 'map-edit',
  state: (): EditMap => ({
    // info
    service: {},
    struct: {
      name: STRUCT_NAME.MAP_SERVICE,
      cate: MENU_CATE.BASE,
    }
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
    // 获取当前embed所有服务(构件)
    setCurrentService(material: any) {
      if (!material) {
        this.struct = (this.service as EmbedService).embedList.find(server => server.name === STRUCT_NAME.MAP_SERVICE)
        this.service?.getCurrent(null)
      } else {
        this.struct = (this.service as EmbedService).embedList.find(server => server.name === material.name)
        // console.log(this.struct, material.name);
        this.service?.getCurrent(this.struct)
      }
    },
    // 获取构件配置
    setCurrentStruct(options) {
      this.struct.options = options
      if (this.struct.name === STRUCT_NAME.MAP_SERVICE) {
        this.service.notify(STRUCT_NAME.MAP_SERVICE, 'setOptions', options)
      }
      message.success('配置保存成功')
    },

  },
});

// Need to be used outside the setup
export function useEditMapWithOut() {
  return useEditMap(store);
}
