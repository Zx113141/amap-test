import LocaPro from "./pro"

class Camera extends LocaPro {
    name: string = 'Camera'
    cate: string = 'loca'
    // marker array
    structs: any[] = []

    options: any = {}

    createStruct() {
        const loca = this.createContainer({})
        loca.ambLight = {
            intensity: 2.2,
            color: '#babedc',
        };
        loca.dirLight = {
            intensity: 0.46,
            color: '#d4d4d4',
            target: [0, 0, 0],
            position: [0, -1, 1],
        };
        loca.pointLight = {
            color: 'rgb(15,19,40)',
            position: [121.5043258, 31.2392241, 2600],
            intensity: 25,
            // 距离表示从光源到光照强度为 0 的位置，0 就是光不会消失。
            distance: 3900,
        };
        const geo = new this.Loca.GeoJSONSource({
            url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/sh_building_center.json',
        });
        const pl = new this.Loca.PolygonLayer({
            zIndex: 120,
            shininess: 10,
            hasSide: true,
            cullface: 'back',
            depth: true,
        });

        pl.setSource(geo);
        pl.setStyle({
            topColor: '#111',
            height: function (index, feature) {
                return feature.properties.h;
            },
            textureSize: [1000, 820],
            texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/windows.jpg',
        });
        pl.setLoca(loca);

        const dat = new this.Loca.Dat();
        dat.addLight(loca.ambLight, loca, '环境光');
        dat.addLight(loca.dirLight, loca, '平行光');
        dat.addLight(loca.pointLight, loca, '点光');
        dat.addLayer(pl, '楼块');






        // this.mapInstance.on('complete', function () {

        // });
        loca.animate.start();
        // document.querySelector('.start-btn').addEventListener('click', function () {
        setTimeout(animate, 2000);
        let that = this
        function animate() {
            const speed = 1;
            // 镜头动画
            that.mapInstance.setZoom(11.8, true);
            that.mapInstance.setPitch(0, true);
            that.mapInstance.setCenter([121.304018, 31.217688], true);
            that.mapInstance.setRotation(1, true);
            pl.hide(1000);

            // 下钻
            loca.viewControl.addAnimates([{
                pitch: {
                    value: 0,
                    control: [[0, 20], [1, 0]],
                    timing: [0, 0, 0.8, 1],
                    duration: 3000 / speed,
                },
                zoom: {
                    value: 15.9,
                    control: [[0, 12.8], [1, 15.9]],
                    timing: [0, 0, 0.8, 1],
                    duration: 3000 / speed,
                },
                rotation: {
                    value: -20,
                    control: [[0, 20], [1, -20]],
                    timing: [0, 0, 0.8, 1],
                    duration: 2000 / speed,
                },
            }], function () {
                setTimeout(function () {
                    pl.show(2000);
                }, 3000);

                loca.viewControl.addAnimates([
                    // 寻迹
                    {
                        center: {
                            value: [121.500419, 31.238089],
                            control: [[121.424503326416,
                                31.199146851153124], [121.46656036376952,
                                31.245828642661486]],
                            timing: [0.3, 0, 0.1, 1],
                            duration: 8000 / speed,
                        },
                        zoom: {
                            value: 17,
                            control: [[0.3, 15], [1, 17]],
                            timing: [0.3, 0, 0.7, 1],
                            duration: 4000 / speed,
                        },
                        pitch: {
                            value: 50,
                            control: [[0.3, 0], [1, 50]],
                            timing: [0.3, 0, 1, 1],
                            duration: 3000 / speed,
                        },
                        rotation: {
                            value: -80,
                            control: [[0, -20], [1, -80]],
                            timing: [0, 0, 1, 1],
                            duration: 1000 / speed,
                        },
                    }, {
                        // 环绕
                        pitch: {
                            value: 50,
                            control: [[0, 40], [1, 50]],
                            timing: [0.3, 0, 1, 1],
                            duration: 7000 / speed,
                        },
                        rotation: {
                            value: 260,
                            control: [[0, -80], [1, 260]],
                            timing: [0, 0, 0.7, 1],
                            duration: 7000 / speed,
                        },
                        zoom: {
                            value: 17,
                            control: [[0.3, 16], [1, 17]],
                            timing: [0.3, 0, 0.9, 1],
                            duration: 5000 / speed,
                        },
                    }, {
                        // 拉起
                        center: {
                            value: [121.500419, 31.238089],
                            control: [[121.49986267089844,
                                31.227628422210365], [121.49969100952148,
                                31.24025152837923]],
                            timing: [0.3, 0, 0.7, 1],
                            duration: 2000 / speed,
                        },
                        pitch: {
                            value: 0,
                            control: [[0, 0], [1, 100]],
                            timing: [0.1, 0, 0.7, 1],
                            duration: 2000 / speed,
                        },
                        rotation: {
                            value: 361,
                            control: [[0, 260], [1, 361]],
                            timing: [0.3, 0, 0.7, 1],
                            duration: 2000 / speed,
                        },
                        zoom: {
                            value: 13.8,
                            control: [[0, 17.5], [1, 13.8]],
                            timing: [0.3, 0, 0.7, 1],
                            duration: 2500 / speed,
                        },
                    }], function () {
                        pl.hide(1000);
                        setTimeout(animate, 2000);
                        console.log('结束');
                    });
            });
        }
    }
}
// var map =  new AMap.Map('map', {
//     viewMode: '3D',
//     zoom: 11.8,
//     center: [121.304018, 31.217688],
//     mapStyle: 'amap://styles/45311ae996a8bea0da10ad5151f72979',
//     showBuildingBlock: false,
//     showLabel: false,
// });



export default Camera