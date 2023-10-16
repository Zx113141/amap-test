import AMapLoader from '@amap/amap-jsapi-loader';
// import {
//   IMarkerOptions,
//   IPluginOptions,
//   IPolygonOptions,
//   ILayersOptions,
// } from '../components/Map/map';
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
// TODO:seperate init all map plugins or other embed
class InitMap {
  // domId
  domId: string;
  // options
  options: IOptions;
  // map instance
  map: any = null;
  // contructor
  AMap: any = null
  constructor(domId, options) {
    this.domId = domId;
    this.options = options;
  }

  // init
  async init() {
    const AMap = await AMapLoader.load({
      key: 'f31603ec0edd29e60f2721d9422ed9f6',
      version: '1.4.15',
    });
    this.map = new AMap.Map(this.domId, { ...this.options });
    this.AMap = AMap
    // this.map.refreshResize();
  }

  injectEvents(key, fn) {
    this.map.on(key, fn);
  }

  destroyEvents(key, fn) {
    this.map.off(key, fn);
  }
}

export default InitMap;
