
import EmbedService from "../embedService"

class Plugin {
    AMap: any = null
    mapInstance: any = null
    plugins: any = []
    private embedService: EmbedService

    constructor(AMap, mapInstance, embedService) {
        this.embedService = embedService
        this.mapInstance = mapInstance
        this.AMap = AMap

    }

    createUitls(name, rect) {
        let plugin
        let that = this
        this.AMap.plugin(`AMap.${name}`, function () {//异步加载插件
            // console.log(that);
            plugin = new that.AMap[name](that.mapInstance, rect)
        });
        this.plugins.push({
            plugin,
            id: rect.getExtData().id
        })
        return plugin
    }
    getPlugin(name, rect,) {
        const plugin = this.plugins.find((plugin) => plugin.id === rect.getExtData().id)
        if (!plugin) {
            return this.createUitls(name, rect)
        }
        return plugin.plugin
        // this.plugins.find((plugin))
    }
}

export default Plugin