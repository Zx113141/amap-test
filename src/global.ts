import EmbedService from '/@/service/embedService';


export { }

declare global {
    interface Window {
        embedService: EmbedService
    }
}