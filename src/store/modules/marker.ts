// import { * asecharts } from 'echarts/core';
import { defineStore } from 'pinia';
import { store } from '/@/store';


interface IMarkerStore {
    markers: any[]
}

export const useMarkerStore = defineStore({
    id: 'map-marker',
    state: (): IMarkerStore => ({
        markers: [],
    }),
    getters: {
        getCurrentMarker(id) {
            return this.markers.find(marker => marker.id === id)
        }
    },
    actions: {
        pushToMarkers(marker) {
            this.markers.push(marker)
        }
    },
});

// Need to be used outside the setup
export function useMarkerWithOut() {
    return useMarkerStore(store);
}
