import EmbedService from '/@/service/embedService';
// import { * asecharts } from 'echarts/core';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { message } from 'ant-design-vue';
interface EditMap {

  // material: any,
  service: Nullable<EmbedService>
  struct: any
}

export const useEditMap = defineStore({
  id: 'map-edit',
  state: (): EditMap => ({
    // info
    service: null,
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
    // 获取embed下所有的服务
    pushService(service) {
      this.service = service
    },
    // 获取当前embed所有服务(构件)
    setCurrentService(name: string) {
      this.struct = (this.service as EmbedService).embedList.find(server => server.name === name)
    },
    // 获取构件配置
    setCurrentStruct(options) {
      this.struct.options = options
      message.success('配置保存成功')
    },
    // 构件事件传递
    getEvents(e) {
      if (this.struct) {
        this.struct.setEvents(e)
      }
    }
  },
});

// Need to be used outside the setup
export function useEditMapWithOut() {
  return useEditMap(store);
}
