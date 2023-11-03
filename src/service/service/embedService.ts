import { Embed, Plugin } from '../initService'
/**
 * in order to manage struct such as [map, marker, polygon, and all of Amap instance]
 * when we need to init map, init this constructor
 * **/

export enum MODE {
    EDIT = 'edit',
    PREVIEW = 'preview',
}
export enum EVENTS_MAP {
    CLICK = 'click'
}


export enum MENU_CATE {
    BASE = 'base',
    LOCA = 'loca',
    PLUGIN = 'plugin'
}

class EmbedService {
    // mode
    mode: string = MODE.EDIT
    // special struct for amp instance list
    currentEmbed: Nullable<Embed> = null
    currentStruct: any = null
    /**
     * @author {zhangxu}
     * @description struct list manage
     * **/
    embedList: Embed[] = []

    // plugin instance list
    pluginList: Plugin[] = []


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
    // // 订阅已经实例化的构件事件
    subscribeEmbed(type: string, ctx: Embed, ...params: any) {
        if (this.mode === MODE.EDIT) {

        }
        // this.handleStructEvents(type, ctx, params)
    }
    getCurrentEmbed(currentEmbed) {
        this.currentEmbed = currentEmbed
        this.echoStructPanel(currentEmbed?.name || 'MapService')
    }
    getCurrentStruct(struct) {
        this.currentStruct = struct
    }


    // 移除当前构件
    handleRemove(name, e) {
        const id = e.target.getExtData().id
        e.target.setMap(null)
        e.target = null
        const embed = this.embedList.find((embed) => embed.name === name) as Embed
        embed.structs = embed.structs.filter((struct) => struct.getExtData().id !== id)
    }

    // 销毁事件
    destory(key) {

    }
    // 外部事件通知
    notify(name, functionType, ...args) {
        if (this[name][functionType]) {
            const res = this[name][functionType](...args)
        } else {
            const embed = this.embedList.find(embed => embed.name === name)
            if (embed) {
                embed[functionType](...args)
            }
        }

    }


    // 处理构件事务
    handleEvents(name, type, e) {
        // 处理地图点击事件，判断是否添加构件
        // handleClick(e) {

        //     if (this.currentEmbed) {
        //         if (this.mode === MODE.EDIT) {
        //             this.currentEmbed?.createStruct(e)
        //         }
        //     } else {
        //         this.MapService?.handleMapClick(e)
        //     }
        // }
        // switch (type) {
        //     case EVENTS_MAP.CLICK:
        //     // this.execeptClick(ctx, params)
        // }
    }
    // execeptClick() {

    // }
}

export default EmbedService