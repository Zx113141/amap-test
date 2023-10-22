import LocaPro from "./pro"


export interface IMarker {
    width: number,
    height: number,
    topWhenClick: boolean,
    draggable: boolean,
    cursor?: string,
    visible: boolean,
    zIndex: number,
    angle: number,
    animation: "AMAP_ANIMATION_NONE" | 'AMAP_ANIMATION_DROP' | 'AMAP_ANIMATION_BOUNCE',
    title: string,
    clickable?: boolean,
    extData?: any,

    offset?: number[],
    customContent?: boolean

    icon: string
    label?: {
        content?: string,
        direction?: 'top' | 'right' | 'bottom' | 'left' | 'center',
    }
}


class PointerLayer extends LocaPro {

    name: string = 'PointLayer'
    cate: string = 'loca'
    // marker array
    structs: any[] = []

    options: any = {}
    constructor(Loca, mapInstance, server) {
        super(Loca, mapInstance, server)
    }
    createStruct(e) {
        console.log(this.Loca);
        const geo = new this.Loca.GeoJSONSource({
            url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/cuisine.json',
        });

        const style = {
            radius: 3.5,
            unit: 'px',
            color: '#3C1FA8',
            borderWidth: 0,
            blurWidth: 3.5,
        }

        const options = {
            zIndex: 10,
            blend: 'lighter',
        }
        const pl = this.createContainer(this.name, options)

        pl.setSource(geo);
        pl.setStyle(style);
        this.loca.add(pl);

        pl.addAnimate({
            key: 'radius',
            value: [0, 1],
            duration: 500,
            easing: 'Linear',
            transform: 2000,
            random: true,
            delay: 8000,
            yoyo: true,
            repeat: 100000
        });
        var dat = new this.Loca.Dat();
        dat.addLayer(pl);
    }

}

export default PointerLayer