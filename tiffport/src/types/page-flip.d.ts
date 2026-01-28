declare module 'page-flip' {
    export interface FlipSetting {
        width: number
        height: number
        size?: 'fixed' | 'stretch'
        minWidth?: number
        maxWidth?: number
        minHeight?: number
        maxHeight?: number
        showCover?: boolean
        mobileScrollSupport?: boolean
        useMouseEvents?: boolean
        flippingTime?: number
        usePortrait?: boolean
        startZIndex?: number
        autoSize?: boolean
        maxShadowOpacity?: number
        drawShadow?: boolean
    }

    export interface FlipEvent {
        data: number
    }

    export class PageFlip {
        constructor(element: HTMLElement, settings: FlipSetting)
        loadFromImages(images: string[]): void
        loadFromHTML(elements: NodeListOf<Element> | HTMLElement[]): void
        flipNext(): void
        flipPrev(): void
        flip(pageNum: number): void
        on(event: 'flip' | 'changeState', callback: (e: FlipEvent) => void): void
        destroy(): void
    }
}
