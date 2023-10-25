interface IIndexCluster {
    
}


class IndexCluster {
    mapInstance: any = null
    AMap: any = null

    // marker array
    markers: any[] = []
    constructor(mapInstance, AMap) {
        this.mapInstance = mapInstance
        this.AMap = AMap
    }
    clusterMarkers() {
        var markerList = [];
        var marker = new AMap.Marker({
            map: map,
        })
        markerList.push(marker);
        return markerList;
    }
    getStyle(context) {
        var clusterData = context.clusterData; // 聚合中包含数据
        var index = context.index; // 聚合的条件
        var count = context.count; // 聚合中点的总数
        var marker = context.marker; // 聚合绘制点 Marker 对象
        var color = [
            '8,60,156',
            '66,130,198',
            '107,174,214',
            '78,200,211',
        ];
        var indexs = ['city', 'district', 'area', 'community'];
        var i = indexs.indexOf(index['mainKey']);
        var text = clusterData[0][index['mainKey']];
        var size = Math.round(30 + Math.pow(count / points.length, 1 / 5) * 70);
        if (i <= 2) {
            var extra = '<span class="showCount">' + context.count + '套</span>';
            text = '<span class="showName">' + text + '</span>';
            text += extra;
        } else {
            size = 12 * text.length + 20;
        }
        var style = {
            bgColor: 'rgba(' + color[i] + ',.8)',
            borderColor: 'rgba(' + color[i] + ',1)',
            text: text,
            size: size,
            index: i,
            color: '#ffffff',
            textAlign: 'center',
            boxShadow: '0px 0px 5px rgba(0,0,0,0.8)'
        }
        return style;
    }
    getPosition(context) {
        var key = context.index.mainKey;
        var dataItem = context.clusterData && context.clusterData[0];
        var districtName = dataItem[key];
        if (!district[districtName]) {
            return null;
        }
        var center = district[districtName].center.split(',');
        var centerLnglat = new AMap.LngLat(center[0], center[1]);
        return centerLnglat;
    }
    _customRender(data) {
        const keys = Object.keys(data.clusterData);
        let markers = [];
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var cluster = data.clusterData[key];
            var position = cluster.data[0].lnglat;
            var marker = new AMap.LabelMarker({
                position: position,
                text: {
                    content: cluster.data.length.toString(),
                    style: {
                        fillColor: '#ffffff'
                    }
                }
            });
            markers.push(marker)
        }
        return {
            type: 'type',
            layer: null,
            markers: markers,
        };
    }
    // 自定义聚合点样式
    _renderClusterMarker(context) {
        var clusterData = context.clusterData; // 聚合中包含数据
        var index = context.index; // 聚合的条件
        var count = context.count; // 聚合中点的总数
        var marker = context.marker; // 聚合点标记对象
        var styleObj = getStyle(context);
        // 自定义点标记样式
        var div = document.createElement('div');
        div.className = 'amap-cluster';
        div.style.backgroundColor = styleObj.bgColor;
        div.style.width = styleObj.size + 'px';
        if (styleObj.index <= 2) {
            div.style.height = styleObj.size + 'px';
            // 自定义点击事件
            context.marker.on('click', function (e) {
                console.log(e)
                var curZoom = map.getZoom();
                if (curZoom < 20) {
                    curZoom += 1;
                }
                map.setZoomAndCenter(curZoom, e.lnglat);
            });
        }
        div.style.border = 'solid 1px ' + styleObj.borderColor;
        div.style.borderRadius = styleObj.size + 'px';
        div.innerHTML = styleObj.text;
        div.style.color = styleObj.color;
        div.style.textAlign = styleObj.textAlign;
        div.style.boxShadow = styleObj.boxShadow;
        context.marker.setContent(div)
        // 自定义聚合点标记显示位置
        var position = getPosition(context);
        if (position) {
            context.marker.setPosition(position);
        }
        context.marker.setAnchor('center');

    }
    render() {
        new this.AMap.IndexCluster(map, points, {
            renderClusterMarker: _renderClusterMarker,
            clusterIndexSet: clusterIndexSet,
        })
    }

}

export default IndexCluster