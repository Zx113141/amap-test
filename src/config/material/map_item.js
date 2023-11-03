import circle from '/@/assets/struct_icons/circle.svg';
import cluster from '/@/assets/struct_icons/cluster.svg';
import marker from '/@/assets/struct_icons/map-marker.svg';
import polygon from '/@/assets/struct_icons/Polygon.svg';
import text from '/@/assets/struct_icons/text.svg';
export const map_items = [
  {
    name: '地图基础功能(Base Function)',
    key: 'base',
    children: [
      {
        name: '区域多边形',
        value: 'Polygon',
        icon: polygon,
      },
      {
        name: '矩形',
        value: 'Rectangle',
      },
      {
        name: '圆形',
        value: 'Circle',
        icon: circle,
      },
      {
        name: '点标记',
        value: 'Marker',
        icon: marker,
      },
      {
        name: '聚合点标记',
        value: 'IndexCluster',
      },
    ],
  },
];

export const map_pro = [
  {
    name: '进阶地图工具(Loca)',
    key: 'loca',
    children: [
      {
        name: '相机',
        value: 'Camera',
      },
      {
        name: '圆点',
        value: 'RoundPointLayer',
      },
      {
        name: '贴地点',
        value: 'ScatterLayer',
      },
      {
        name: '图标点',
        value: 'IconLayer',
      },
      {
        name: '线图层',
        value: 'LineLayer',
      },
      {
        name: '多边形',
        value: 'PolygonLayer',
      },
      {
        name: '3D热力',
        value: 'HeatMapLayer',
      },
      {
        name: '网格&蜂窝',
        value: 'GridLayer/HexagonLayer',
      },
    ],
  },
];
