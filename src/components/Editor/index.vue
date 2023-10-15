<template>
  <div class="editor-area">
    <section class="left-section">
      <left-slide draggable="true">
        <material-menu
          v-for="item in map_items"
          :key="item.type"
          v-bind="{ ...item }"
        ></material-menu>
      </left-slide>
    </section>
    <main id="editor">
      <slot name="main"></slot>
    </main>
    <section class="right-section">
      <!-- <Slide> </Slide> -->
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { useEditMapWithOut } from '/@/store/modules/editMap';
  import EditorService from '/@/service/editor';
  import LeftSlide from '/@/components/Slide/index.vue';
  import MaterialMenu from '../MaterialMenu/index.vue';
  import { map_items } from '/@/config/material/map_item';
  const store = useEditMapWithOut();
  let editor = reactive(new EditorService('editor', store.setPosition));

  onMounted(() => {
    editor.init();
  });
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
