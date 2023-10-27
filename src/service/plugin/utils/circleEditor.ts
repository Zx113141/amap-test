import Plugin from '../plugin'

class CircleEditor extends Plugin {
    name: string = 'CircleEditor'
    constructor(AMap, mapInstance, server) {
        super(AMap, mapInstance, server)
        // this.init(target)
    }
    init(rect) {
        return this.getPlugin(this.name, rect)
    }

}

export default CircleEditor