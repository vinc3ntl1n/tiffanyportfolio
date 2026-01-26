declare module 'epubjs' {
  interface RenditionOptions {
    width?: string | number
    height?: string | number
    spread?: 'none' | 'always' | 'auto'
    flow?: 'paginated' | 'scrolled'
  }

  interface Rendition {
    display(target?: string): Promise<void>
    next(): Promise<void>
    prev(): Promise<void>
    destroy(): void
  }

  interface Book {
    renderTo(element: HTMLElement, options?: RenditionOptions): Rendition
    destroy(): void
  }

  function ePub(url: string): Book
  export default ePub
}
