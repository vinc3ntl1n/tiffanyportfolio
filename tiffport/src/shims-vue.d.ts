/// <reference types="vite/client" />
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module 'flipbook-vue' {
    import type { DefineComponent } from 'vue'
    const Flipbook: DefineComponent<{
        pages: (string | null)[]
        pagesHiRes?: string[]
        flipDuration?: number
        zoomDuration?: number
        zooms?: number[]
        ambient?: number
        gloss?: number
        perspective?: number
        nPolygons?: number
        singlePage?: boolean
        forwardDirection?: 'left' | 'right'
        centering?: boolean
        startPage?: number
        loadingImage?: string
        clickToZoom?: boolean
        dragToFlip?: boolean
        wheel?: 'scroll' | 'zoom'
    }, {}, any>
    export default Flipbook
}
