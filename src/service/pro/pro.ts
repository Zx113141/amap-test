import EmbedServie from "../embedService"
class LocaPro {

    // Loca constructor 
    Loca: any = null
    // loca instance
    loca: any = null
    // mapInstance
    mapInstance: any = null
    private embedService: Nullable<EmbedServie> = null
    constructor(Loca, mapInstance, embedService) {
        this.embedService = embedService
        this.mapInstance = mapInstance
        this.Loca = Loca
    }
    notify(type: string, ...args: any) {
        // (this.embedService as EmbedServie).subscribeEmbed(type, this, args)
    }
    create(name, options) {
        // console.log(name);
        const struct = new this.Loca[name]({
            ...options
        })
        return struct
    }
    createContainer(name, options) {
        this.loca = new this.Loca.Container({
            map: this.mapInstance,
            opacity: 1,
        })
        return this.create(name, options)

    }
    remove(ctx, e) {
        (this.embedService as EmbedServie).handleRemove(ctx, e)
    }

    update() {

    }


}

export default LocaPro