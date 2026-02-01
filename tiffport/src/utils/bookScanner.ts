
export interface BookData {
    id: string
    title: string
    coverImage: string
    images: string[]
    totalPages: number
}

function getBookInfo(path: string): { bookId: string, subfolder: string } | null {
    const parts = path.split('/')
    const booksIndex = parts.indexOf('books')
    if (booksIndex !== -1 && parts[booksIndex + 1]) {
        return {
            bookId: parts[booksIndex + 1],
            subfolder: parts[booksIndex + 2] || ''
        }
    }
    return null
}

const BLANK_PAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

export function getBooks(): BookData[] {
    const imageModules = import.meta.glob('../assets/books/*/*/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' })
    const textModules = import.meta.glob('../assets/books/*/info.txt', { eager: true, query: '?raw', import: 'default' })

    const tempBooks: Record<string, {
        covers: string[],
        spreads: string[],
        pages: string[]
    }> = {}

    for (const path in imageModules) {
        const info = getBookInfo(path)
        if (!info) continue

        const { bookId, subfolder } = info
        if (!tempBooks[bookId]) {
            tempBooks[bookId] = { covers: [], spreads: [], pages: [] }
        }

        const imageUrl = imageModules[path] as string

        if (subfolder === 'covers') {
            tempBooks[bookId].covers.push(imageUrl)
        } else if (subfolder === 'spreads') {
            tempBooks[bookId].spreads.push(imageUrl)
        } else if (subfolder === 'pages') {
            tempBooks[bookId].pages.push(imageUrl)
        }
    }

    const sortFiles = (a: string, b: string) => {
        const fileA = a.split('/').pop() || ''
        const fileB = b.split('/').pop() || ''
        return fileA.localeCompare(fileB, undefined, { numeric: true, sensitivity: 'base' })
    }

    const books: BookData[] = []

    for (const bookId in tempBooks) {
        const { covers, spreads, pages } = tempBooks[bookId]

        covers.sort(sortFiles)
        spreads.sort(sortFiles)
        pages.sort(sortFiles)

        const finalImages: string[] = []

        if (covers.length > 0) finalImages.push(covers[0])

        if (spreads.length >= 2) {
            finalImages.push(spreads[0])
            finalImages.push(spreads[1])
        }

        finalImages.push(...pages)

        if (finalImages.length % 2 === 0) {
            finalImages.push(BLANK_PAGE)
        }

        if (spreads.length >= 4) {
            finalImages.push(spreads[2])
            finalImages.push(spreads[3])
        }

        if (covers.length > 1) {
            finalImages.push(covers[1])
        }

        const book: BookData = {
            id: bookId,
            title: bookId,
            coverImage: covers.length > 0 ? covers[0] : '',
            images: finalImages,
            totalPages: finalImages.length
        }
        books.push(book)
    }

    for (const path in textModules) {
        const parts = path.split('/')
        const booksIndex = parts.indexOf('books')
        if (booksIndex !== -1 && parts[booksIndex + 1]) {
            const bookId = parts[booksIndex + 1]
            const book = books.find(b => b.id === bookId)
            if (book) {
                const content = textModules[path] as string
                const titleMatch = content.match(/Title:\s*(.+)/i)
                if (titleMatch) {
                    book.title = titleMatch[1].trim()
                }
            }
        }
    }

    return books
}
