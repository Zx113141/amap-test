export enum MAP_MODE {
    EDIT = 0,
    PREVIEW = 1,
  }
  export interface IMapProp {
    mode: MAP_MODE;
    plugins;
    layers;
    center;
    autoFullscreen:boolean
  }