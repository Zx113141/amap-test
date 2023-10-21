<template>
  <div class="slide" >
    <slot></slot>
  </div>
</template>

<script></script>

<style lang="less" scoped>
  .slide {
    column-gap: 15px;
    // padding: 10px 15px;
    width: 300px;
    height: 100%;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02);
  }
</style>
