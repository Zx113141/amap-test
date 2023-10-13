import AMapLoader from '@amap/amap-jsapi-loader';
import {
  IMarkerOptions,
  IPluginOptions,
  IPolygonOptions,
  ILayersOptions,
} from '../components/Map/map';
import Polygon from './polygon';
import Markers from './marker';
import { clusterIndexSet } from '../config/constant/cluster.config';

interface IOptions {
  key: string; // 申请好的Web端开发者Key，首次调用 load 时必填
  version: string; // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  plugins?: string[]; //插件列表
  // 是否加载 AMapUI，缺省不加载
  AMapUI?: {
    version?: string; // AMapUI 缺省 1.1
    plugins?: string[]; // 需要加载的 AMapUI ui插件
  };
  // 是否加载 Loca， 缺省不加载
  Loca?: {
    version?: string; // Loca 版本，缺省 1.3.2
  };
}

class InitMap {
  // domId
  domId: string;
  // options
  options: IOptions;
  // map instance
  map: any = null;
  // constructor of amap
  AMap: any = null;
  // plugin
  pulgin: any[] = [];
  // polygon
  polygon: any = null;
  // marker
  marker: any = [];

  constructor(domId, options) {
    this.domId = domId;
    this.options = options;
  }
  // 初始化plugin
  private initPlugin(Plugin) {}
  // 初始化vector
  private initVector(Polygon) {
    this.polygon = new Polygon(this.map, this.AMap);
  }
  // 初始化marker
  private initMarker(Markers) {
    this.marker = new Markers(this.map, this.AMap);
  }
  // 初始化IndexCluster
  private initIndexCluster(IndexCluster, configs) {}

  // init
  async init() {
    const AMap = await AMapLoader.load({
      key: 'f31603ec0edd29e60f2721d9422ed9f6',
      version: '1.4.15',
    });
    this.map = new AMap.Map(this.domId, { ...this.options });
    // 保存AMap构造函数
    this.AMap = AMap;
    this.initVector(Polygon);
    this.initMarker(Markers);
    this.map.refreshResize();
  }

  injectEvents(key, fn) {
    this.map.on(key, fn);
  }

  injectParams(params: ILayersOptions | IMarkerOptions) {}

  destroyEvents(key, fn) {
    this.map.off(key, fn);
  }
}

export default InitMap;
