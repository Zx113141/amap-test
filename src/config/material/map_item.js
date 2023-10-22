export const map_items = [
  {
    name: '地图基础功能(Base Function)',
    key: 'base',
    children: [
      {
        name: 'Polygon',
        menu: [
          {
            name: '基础配置',
            key: 'base',
          },
          {
            name: '事件处理',
            key: 'events',
          },
        ],
      },
      {
        name: 'Marker',
        menu: [
          {
            name: '基础配置',
            key: 'base',
          },
          {
            name: '事件处理',
            key: 'events',
          },
        ],
      },
      {
        name: 'Text',
        menu: [
          {
            name: '基础配置',
            key: 'base',
          },
          {
            name: '事件处理',
            key: 'events',
          },
        ],
      },
    ],
  },
  {
    name: '进阶地图工具(Loca)',
    key: 'loca',
    children: [
      {
        name: 'Camera',
      },
      {
        name: 'PointLayer',
        menu: [
          {
            name: '基础配置',
            key: 'base',
          },
          {
            name: '事件处理',
            key: 'events',
          },
        ],
      },
      {
        name: 'ScatterLayer',
      },
      {
        name: 'IconLayer',
      },
      {
        name: 'LineLayer',
      },
      {
        name: 'PolygonLayer',
      },
      {
        name: 'HeatMapLayer',
      },
      {
        name: 'GridLayer/HexagonLayer',
      },
    ],
  },
];
