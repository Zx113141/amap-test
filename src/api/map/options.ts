import { ReqAreaMarker, ReqAreaPolygon, ResResult } from './model';
import { get, post } from '/@/utils/http';
import { MAP_MODE, IPolygonOptions, IMarkerOptions } from '/@/components/Map/map';
enum URL {
    polygon = '/v1/map/polygon',
    marker = '/v1/map/marker',
}

const polygon = async (params: ReqAreaPolygon) => get<ResResult<IPolygonOptions>>({ url: URL.polygon, params });

const marker = async (params: ReqAreaMarker) => get<ResResult<IMarkerOptions>>({ url: URL.marker, params });

export { polygon, marker };
