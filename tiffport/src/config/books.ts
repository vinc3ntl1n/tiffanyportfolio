export interface BookConfig {
    id: string
    title: string
    coverImage: string
    totalPages: number
    basePath: string
    prefix: string
}

export const books: BookConfig[] = [
    {
        id: 'graduate',
        title: 'graduate',
        coverImage: '/book1/LinT_Portfolio_2026.jpg',
        totalPages: 108,
        basePath: '/book1/',
        prefix: 'LinT_Portfolio_2026'
    },
    {
        id: 'undergrad',
        title: 'undergrad',
        coverImage: '/book1/LinT_Portfolio_2026.jpg',
        totalPages: 108,
        basePath: '/book1/',
        prefix: 'LinT_Portfolio_2026'
    },
    {
        id: 'professional',
        title: 'professional',
        coverImage: '/book1/LinT_Portfolio_2026.jpg',
        totalPages: 108,
        basePath: '/book1/',
        prefix: 'LinT_Portfolio_2026'
    }
]
