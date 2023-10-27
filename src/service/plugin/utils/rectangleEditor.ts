import Plugin from '../plugin'

class RectangleEditor extends Plugin {
    name: string = 'RectangleEditor'
    constructor(AMap, mapInstance, server) {
        super(AMap, mapInstance, server)
        // this.init(target)
    }
    init(rect) {
        return this.getPlugin(this.name, rect)
    }

}

export default RectangleEditor