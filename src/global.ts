import EmbedService from '/@/service/embedService';
import FlowEngine from '/@/service/workflow/flowEngine';

export { }

declare global {
    interface Window {
        embedService: EmbedService
        flowEngine: FlowEngine
    }
}