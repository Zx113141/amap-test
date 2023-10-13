<template>
  <div class="editor-area">
    <section class="left-section">
      <Slide> </Slide>
    </section>
    <main>
      <slot name="main"></slot>
    </main>
    <section class="right-section">
      <Slide> </Slide>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import EditorService from '/@/service/editor';
  import Slide from '../Slide/index.vue';
  const editor = reactive(new EditorService());
</script>

<style lang="less" scoped>
  .editor-area {
    position: relative;
    width: 100%;
    height: 100%;
    .left-section {
      position: absolute;
      height: 100%;
      z-index: 9999;
      background: white;
    }
    .right-section {
      position: absolute;
      height: 100%;
      right: 0;
      top: 0;
      z-index: 9999;
      background: white;
    }
  }
</style>
