// import { * asecharts } from 'echarts/core';
import { defineStore } from 'pinia';
import { store } from '/@/store';


interface IMarkerStore {
    markers: any[]
    options: any
}

export const useMarkerStore = defineStore({
    id: 'map-marker',
    state: (): IMarkerStore => ({
        markers: [],
        options: null
    }),
    getters: {
        getCurrentMarker(id) {
            return this.markers.find(marker => marker.id === id)
        },

    },
    actions: {
        pushToMarkers(marker) {
            this.markers.push(marker)
        },
        setMarkerOptions(options: IMarker) {
            this.options = options
        },
        getMarkerOptions(id?: string) {
            if (id) {
                return this.markers.find(marker => marker.id === id)
            } else {
                return this.options
            }
        }
    },
});

// Need to be used outside the setup
export function useMarkerWithOut() {
    return useMarkerStore(store);
}
