export enum MAP_MODE {
  EDIT = 0,
  PREVIEW = 1,
}

type STOKE_STYLE = 'dashed' | 'line'
























export declare interface IPolygonOptions {
  path: number[][]
  fillColor: string
  strokeOpacity: number
  fillOpacity: number,
  strokeColor: string,
  strokeWeight: number,
  strokeStyle: STOKE_STYLE,
  strokeDasharray: number[],
}

export declare interface ILayersOptions {

}

export declare interface IPluginOptions {

}

export declare interface IMarkerOptions {

}

export interface IMapProp {
  mode: MAP_MODE
  pluginsOptions?: IPluginOptions
  layersOptions?: ILayersOptions
  polygonOptions?: IPolygonOptions
  markerOptions?: IMarkerOptions
  center;
  autoFullscreen: boolean
}