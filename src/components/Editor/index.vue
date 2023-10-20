<template>
  <div class="editor-area">
    <section class="left-section" @click="() => sotre.setCurrentService('')">
      <left-slide>
        <a-collapse>
          <a-collapse-panel key="base" header="地图基础功能(Base Function)">
            <div style="display: flex; column-gap: 8px">
              <material-menu
                v-for="item in map_items"
                :key="item.type"
                v-bind="{ ...item }"
              ></material-menu>
            </div>
          </a-collapse-panel>
          <a-collapse-panel key="pro" header="进阶地图工具(Loca)">
            <div style="display: flex; column-gap: 8px">
              <material-menu
                v-for="item in map_items"
                :key="item.type"
                v-bind="{ ...item }"
              ></material-menu>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </left-slide>
    </section>
    <main id="editor">
      <slot name="main"></slot>
    </main>
    <section class="right-section">
      <Slide>
        <embed-panel></embed-panel>
      </Slide>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { useEditMapWithOut } from '/@/store/modules/editMap';
  // import EditorService from '/@/service/editor';
  import LeftSlide from '/@/components/Slide/index.vue';
  import MaterialMenu from '../MaterialMenu/index.vue';
  import EmbedPanel from '/@/components/EmbedPanel/index.vue';
  import { map_items } from '/@/config/material/map_item';

  const sotre = useEditMapWithOut();
</script>

<style lang="less" scoped>
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

      z-index: 9999;
      background: white;
    }
    .right-section {
      position: absolute;

      right: 0;
      top: 0;
      z-index: 9999;
      background: white;
    }
  }
</style>
