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
        name: 'Polygon',
        icon: polygon,
      },
      {
        name: 'Rectangle',
      },
      {
        name: 'Circle',
        icon: circle,
      },
      {
        name: 'Marker',
        icon: marker,
      },
      {
        name: 'IndexCluster',
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
        name: 'Camera',
      },
      {
        name: 'PointLayer',
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
