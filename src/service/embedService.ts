import Polygon from './base/polygon'
import Marker from './base/marker'
import PointerLayer from './pro/pointLayer'
import MapService from './mapService'
// import MouseTool from './base/mouseTool'
import IndexCluster from './base/cluster'
import Rectangle from './base/rectangle'
import RectangleEditor from './plugin/utils/rectangleEditor'
import Circle from './base/circle'
import CircleEditor from './plugin/utils/circleEditor'
import Camera from './pro/camera'
import { defineAsyncComponent, shallowReactive} from 'vue'
import FlowEngine from './workflow/flowEngine'
/**
 * in order to manage struct such as [map, marker, polygon, and all of Amap instance]
 * when we need to init map, init this constructor
 * **/
export type Embed = Marker | Polygon | Rectangle | PointerLayer | IndexCluster | Circle | MapService
export type Plugin = RectangleEditor | CircleEditor
export enum MODE {
    EDIT = 'edit',
    PREVIEW = 'preview',
}
export enum EVENTS_MAP {
    CLICK = 'click'
}

export enum SERVER_CONSTRUCT {
    COVER = 'cover',
    LOCA = 'loca',
    PLUGIN = 'plugin'
}

export enum STRUCT_NAME {
    MAP_SERVICE = 'MapService',
    POLYGON = 'Polygon',
    MARKER = 'Marker',
    // MOUSE_TOOL = 'MouseTool'
    INDEX_CLUSTER = 'IndexCluster',
    RECTANGLE = 'Rectangle'
}

export enum MENU_CATE {
    BASE = 'base',
    LOCA = 'loca',
    PLUGIN = 'plugin'
}
const Constructor = {
    Marker,
    Polygon,
    PointerLayer,
    Camera,
    Circle,
    Rectangle,
    IndexCluster,
    CircleEditor,
    RectangleEditor
}


class EmbedService {
    // mode
    mode: string = MODE.EDIT
    /**
     * @author {zhangxu}
     * @description map instance and map domId
     * **/
    // domID
    domId: string = ''
    /**
     * @author {zhangxu}
     * @description struct list manage
     * **/
    // special struct for amp instance list
    currentEmbed: Nullable<Embed> = null
    currentStruct: any = null

    embedList: Embed[] = []

    // plugin instance list
    pluginList: Plugin[] = []
    // current render menu item
    embedMenu: any[] = []
    // panel Vnode
    panelVNode: any = null
    // eventLoop
    eventLoop: Map<string, {
        embed: string,
        event: string,
        lifecycle: string,
        options: any
    }[]> = new Map()
    constructor(domId, embedList) {
        this.embedMenu = embedList
        this.domId = domId
        window.flowEngine = new FlowEngine()
    }
    // 实例化Panel
    initStructPanel(key) {
        // 异步加载
        setTimeout(() => {
            this.panelVNode = defineAsyncComponent(() => import(`/@/components/Panel-Components/${key}.vue`))
        })
    }
    // 实例化mapService
    initMapService(domId, AMap, mapOptions) {
        return new MapService(domId, AMap, mapOptions)
    }
    // 初始化Embed 
    initAllStruct(AMap, Loca, mapOptions, mode,) {
        this.mode = mode
        const mapEmbed = this.initMapService(this.domId, AMap, mapOptions)
        const mepInstance = mapEmbed.structs[0]
        Object.keys(this.embedMenu).forEach((key) => {
            this.embedMenu[key].forEach((serve) => {
                // tip.value = `加载${key}下的${serve}`
                let embed

                switch (key) {
                    case SERVER_CONSTRUCT.COVER:
                        embed = new Constructor[serve](AMap, mepInstance);
                        // console.log(embed);
                        break;
                    case SERVER_CONSTRUCT.PLUGIN:
                        const plugin = new Constructor[serve](AMap, mepInstance);
                        this.pluginList.push(plugin)
                        break;
                    case SERVER_CONSTRUCT.LOCA:
                        embed = new Constructor[serve](Loca, mepInstance);
                        break;
                }
                if (embed) {
                    this.embedList.push(embed)
                }
            })
        })
        this.embedList.push()
    }
    // 在初始化过程存入已经实例化plugin 下次直接读取缓存
    pushPlugin(plugin) {
        this.pluginList.push(plugin)
    }

    // 获取可通过插件进行编辑对象
    getCoverByPluginEdit(name, ctx, e) {
        const { target } = e
        const plugin = this.pluginList.find((plugin) => plugin.name === name)
        if (!plugin) return
        const editor = plugin.init(target)

        if (!ctx.editable) {
            editor.open()
            ctx.editable = true

        } else {
            editor.close()
            ctx.editable = false
        }
    }
    // init events for struct 

    // // 订阅已经实例化的构件事件
    subscribeEmbed(type: string, struct: any, embed: any, ...params: any) {
        console.log(MODE.EDIT, type);
        if (this.mode === MODE.EDIT) {
            if (type === 'click') {
                console.log(struct);
                this.setCurrentStruct(struct)
            }
        } else {
            // TODO: work flow --> 
            const id = struct.getExtData().id
            const event_list = this.getEventFromEventsLoop(id)
            // console.log(event_list, parent, ctx);
            if (event_list) {
                if (event_list.event === type) {
                    window.flowEngine.runTask(embed[event_list.lifecycle], struct, event_list.options)
                }
            }
        }



    }
    // 处理地图点击事件，判断是否添加构件
    // TODO:
    handleClick(e) {

        if (this.currentEmbed) {
            if (this.mode === MODE.EDIT) {
                this.currentEmbed?.createStruct(e)
            }
        } else {
            const mapEmbed = this.embedList[this.embedList.length - 1]
            mapEmbed.handleMapClick(e)
            // this.MapService?.handleMapClick(e)
        }
    }

    cfgForEmbedAndStruct(options) {
        if (this.currentEmbed) {
            // embed
            this.currentEmbed.options = options
        } else {
            // map
            this.embedList[this.embedList.length - 1].options = options
        }
    }
    setCurrentEmbed(name) {
        this.currentEmbed = this.embedList.find((embed: Embed) => embed.name === name) as Embed
        this.initStructPanel(name || 'MapService')

    }
    setCurrentStruct(struct) {
        this.currentStruct = struct
        if (this.currentEmbed && this.currentEmbed?.name === struct._opts.context) {
            this.currentEmbed.options =struct._opts
        }
        // console.log(struct, this.currentEmbed);
    }


    // // 移除当前构件
    // handleRemove(name, e) {
    //     const id = e.target.getExtData().id
    //     e.target.setMap(null)
    //     e.target = null
    //     const embed = this.embedList.find((embed) => embed.name === name) as Embed
    //     embed.structs = embed.structs.filter((struct) => struct.getExtData().id !== id)
    // }
    // // 外部事件通知
    // notify(name, functionType, ...args) {
    //     if (this[name][functionType]) {
    //         const res = this[name][functionType](...args)
    //         console.log(1);
    //     } else {
    //         const embed = this.embedList.find(embed => embed.name === name)
    //         if (embed) {
    //             embed[functionType](...args)
    //         }
    //     }

    // }
    // 设置事件循环
    setEventsLoop(property) {
        this.eventLoop.set(property[0].struct, property)
    }
    // 获取事件循环任务
    getEventFromEventsLoop(id) {
        if (this.eventLoop.has(id)) {
            return this.eventLoop.get(id)[0]
        }
        return null
    }
}

export default EmbedService