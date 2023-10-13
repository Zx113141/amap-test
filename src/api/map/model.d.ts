

export interface ReqAreaPolygon {
    area: number;
}

export interface ReqAreaMarker {
    area: number;
}



export interface ResResult<T> {
    data: T;
    msg: string;
    status: string;
}