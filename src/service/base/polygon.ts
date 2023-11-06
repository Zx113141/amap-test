import Cover from "./cover"
export interface IPoly {
    name: string,
    fillColor?: string,
    strokeOpacity?: number,
    fillOpacity?: number,
    strokeColor?: string,
    strokeWeight?: number,
    strokeStyle?: 'dashed' | 'solid',
    strokeDasharray?: number[],
    path: [],
}


class Polygon extends Cover {
    name: string = 'Polygon'
    // marker array
    structs: any[] = []
    // cate: string = 'base'
    options: any = {
        name: 'polygon',
        fillColor: 'rgb(254, 87, 34)',
        strokeOpacity: 1,
        fillOpacity: 0.5,
        strokeColor: 'red',
        strokeWeight: 1,
        strokeStyle: 'dashed',
        strokeDasharray: [5, 5],
        path: [],
        border: [],
        context: 'Polygon',
    }
    constructor(AMap, mapInstance) {
        super(AMap, mapInstance)
    }

    async createStruct(e) {
        // const position = [e.lnglat.lng, e.lnglat.lat]
        await this.getDistrict()

        const configs = {

            offset: new this.AMap.Pixel(-30, -60),
            ...this.options,

        }
        const polygon = this.create(this.name, configs)

        // polygon.on('mouseover', () => {
        //     polygon.setOptions({
        //         fillOpacity: 0.7,
        //         fillColor: '#7bccc4'
        //     })
        // })
        // polygon.on('mouseout', () => {
        //     polygon.setOptions({
        //         fillOpacity: 0.5,
        //         fillColor: '#ccebc5'

        //     })
        // })
        // mapInstance.add(polygon);
        this.structs.push(polygon)
    }
    async getDistrict() {
        const district = this.options.border
        const params = {
            keywords: district[district.length - 1] || '贵州',
            subdistrict: 1,
        };
        const res = await this.getPathByDistrict(params)

    }
    async getPathByDistrict(params) {
        const { keywords, subdistrict } = params;
        fetch(
            `https://restapi.amap.com/v3/config/district?keywords=${keywords}&subdistrict=${subdistrict}&key=${window.SERVER_KEY}&extensions=all`,
        )
            .then((response) => response.body)
            .then((rb) => {
                const reader = rb?.getReader() as ReadableStreamBYOBReader;
                return new ReadableStream({
                    start(controller) {
                        // The following function handles each data chunk
                        function push() {
                            // "done" is a Boolean and value a "Uint8Array"
                            reader.read().then(({ done, value }) => {
                                // If there is no more data to read
                                if (done) {
                                    // console.log('done', done);/
                                    controller.close();
                                    return;
                                }
                                // Get the data and send it to the browser via the controller
                                controller.enqueue(value);
                                // Check chunks by logging to the console
                                // console.log(done, value);
                                push();
                            });
                        }
                        push();
                    },
                });
            })
            .then((stream) =>
                // Respond with our stream
                new Response(stream, { headers: { 'Content-Type': 'text/json' } }).json(),
            )
            .then((result) => {
                // Do things with result
                const polyline: number[][] = [];
                const arr = result.districts[0].polyline.split(';');
                arr.forEach((item: string) => {
                    const newa = item.split(',');
                    if (newa[1].indexOf('|')) {
                        newa[1] = newa[1].split('|')[0];
                    }
                    polyline.push([Number(newa[0]), Number(newa[1])]);
                });
                this.options.path = polyline
            });
    };

    update(ctx, options) {
        ctx.setOptions(options)
    }
    // pushPolygonToMap(areas) {
    //     areas.forEach((area) => {
    //         this.addPolygon(area)
    //     })
    // }
}

export default Polygon