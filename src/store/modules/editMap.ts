
import EmbedService, { STRUCT_NAME, MENU_CATE, Embed } from '/@/service/embedService';
// import { * asecharts } from 'echarts/core';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { message } from 'ant-design-vue';
interface EditMap {

  // material: any,
  service: Nullable<EmbedService>
  embed: any,
  struct: any
}

export const useEditMap = defineStore({
  id: 'map-edit',
  state: (): EditMap => ({
    // info
    service: null,
    embed: {
      name: STRUCT_NAME.MAP_SERVICE,
      cate: MENU_CATE.BASE,
    },
    struct: null
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
      // console.log(material, this.service);
      if (!material) {
        this.embed = (this.service as EmbedService).embedList.find(server => server.name === STRUCT_NAME.MAP_SERVICE)
        this.service?.getCurrentEmbed(null)
      } else {
        this.embed = (this.service as EmbedService).embedList.find(server => server.name === material.name)
        // console.log(this.embed, material.name);
        this.service?.getCurrentEmbed(this.embed)
      }
    },
    // 获取构件配置
    setCurrentStruct(options) {
      this.embed.options = options
      switch (this.embed.name) {
        case STRUCT_NAME.MAP_SERVICE:
        case STRUCT_NAME.MOUSE_TOOL:
          (this.service as EmbedService).notify(this.embed.name, 'setOptions', options)
      }
      (this.service as EmbedService).notify(this.embed.name, 'createStruct', options)
      message.success('配置保存成功')
    },
    // 根据Id 选中构件
    selectStructById({ name, id }) {
      const struct_list = this.service?.embedList.find((embed: Embed) => embed.name === name)?.structs
      if (struct_list) {
        this.struct = struct_list.find((struct: any) => struct.getExtData().id === id)

        this.service?.getCurrentStruct(this.struct)
      }
    },

  },
});

// Need to be used outside the setup
export function useEditMapWithOut() {
  return useEditMap(store);
}
