<template>
  <div class="editor-area">
    <section class="left-section" @click="() => sotre.service?.setCurrentEmbed('')">
      <left-slide>
        <instance-list>
          <template #app_store>
            <a-collapse v-model:active-key="activeKey">
              <a-collapse-panel :key="item.key" :header="item.name" v-for="item in menu">
                <div class="menu">
                  <material-menu
                    v-for="child in item.children"
                    :key="child.type"
                    :cate="item.key"
                    v-bind="{ ...child }"
                  ></material-menu>
                </div>
              </a-collapse-panel>
            </a-collapse>
          </template>
          <template #struct_list>
            <struct-modal />
          </template>
        </instance-list>
      </left-slide>
    </section>
    <main id="editor">
      <slot name="main"></slot>
    </main>
    <section class="right-section">
      <Slide>
        <material-config :item="map_items"></material-config>
      </Slide>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { useEditMapWithOut } from '/@/store/modules/editMap';
  // import EditorService from '/@/service/editor';
  import LeftSlide from '/@/components/Slide/index.vue';
  import MaterialMenu from '../MaterialMenu/index.vue';
  import MaterialConfig from '../MaterialConfig/index.vue';
  import { map_items, map_pro } from '/@/config/material/map_item';
  import InstanceList from '/@/components/InstanceList/index.vue';
  import StructModal from '/@/components/StructModal/index.vue';

  const sotre = useEditMapWithOut();
  const menu = [...map_items, ...map_pro];
  const activeKey = ref(['base', 'loca']);
</script>

<style lang="less">
  .editor-area {
    position: relative;
    width: 100%;
    height: 100%;
    main,
    .left-section,
    .right-section {
      height: 100%;
    }
    .left-section {
      position: absolute;
      .ant-collapse-content-box {
        padding: 0px !important;
      }
      z-index: 30;
      background: white;
      .menu {
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-eve;
      }
    }
    .right-section {
      position: absolute;

      right: 0;
      top: 0;
      z-index: 30;
      background: white;
    }
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 8px 4px;
  }

  .ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
    vertical-align: 2px;
  }
  .ant-collapse-content > .ant-collapse-content-box {
    padding: 0px 0px;
  }
</style>
