
import { get, post } from '/@/utils/http';
enum URL {
    INDEX_CLUSTER = 'https://a.amap.com/jsapi_demos/static/data/community.js',
}



// export interface ReqAreaIndexCluster {
//     area: number;
// }

export interface ResResult<T> {
    data: T;
    msg: string;
    status: string;
}

const getIndexClusterList = async () => get<ResResult<any>>({ url: URL.INDEX_CLUSTER });

// const marker = async (params: ReqAreaMarker) => get<ResResult<IMarkerOptions>>({ url: URL.marker, params });

export { getIndexClusterList };
