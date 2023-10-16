export const map_items = [
  {
    name: 'polygon',
    options: {
      type: 'polygon',
    },
  },
  {
    name: 'marker',
    options: {
      type: 'marker',
      base: {
        width: '15px',
        height: '15px',
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        // offset: new this.AMap.Pixel(-13, -30)
        cursor: 'move',
        // 设置是否可以拖拽
        draggable: true,
      },
    },
  },
];
