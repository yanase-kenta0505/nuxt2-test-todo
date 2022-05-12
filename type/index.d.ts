import { accessorType } from "~/store/index";

declare module 'vue/types/vue' {
    interface Vue {
        $accessor : typeof accessorType
    }
}

declare module '@nuxt/type'{
    interface NuxtAppOptions {
        $accessor: typeof accessorType
    }
}