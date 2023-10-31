<template> </template>

<script setup lang="ts">
  const props = defineProps({
    comp: {
      name: {
        default: 'MapService',
      },
      setOptions: {
        default: () => () => {},
      },
    },
  });
</script>

<style lang="less" scoped></style>
