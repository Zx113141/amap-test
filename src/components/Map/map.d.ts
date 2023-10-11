export enum MAP_MODE {
    EDIT,
    PREVIEW,
  }
  export interface IMapProp {
    mode: MODE;
    plugins;
    layers;
    center;
  }