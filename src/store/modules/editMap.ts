import { defineStore } from 'pinia';
import { store } from '/@/store';
import fetchApi from '/@/api/home';
import { ResInfoList } from '/@/api/home/model';

interface EditMap {
    main: Nullable<ResInfoList>;
}

export const useEditMap = defineStore({
    id: 'map-edit',
    state: (): EditMap => ({
        // info
        main: null,
    }),
    getters: {
        getInfo(): Nullable<ResInfoList> {
            return this.main || null;
        },
    },
    actions: {
        setInfo(info: Nullable<ResInfoList>) {
            this.main = info;
        },
        resetState() {
            this.main = null;
        },
        /**
         * @description: login
         */
        async setEditSave() {
            const res = await fetchApi.info();
            if (res) {
                // save token
                this.setInfo(res);
            }
            return res;
        },
    },
});

// Need to be used outside the setup
export function useEditMapWithOut() {
    return useEditMap(store);
}
