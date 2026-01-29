
export interface BookData {
    id: string
    title: string
    coverImage: string
    images: string[]
    totalPages: number
}

function getFolderName(path: string): string {
    const parts = path.split('/')
    const booksIndex = parts.indexOf('books')
    if (booksIndex !== -1 && parts[booksIndex + 1]) {
        return parts[booksIndex + 1]
    }
    return ''
}

export function getBooks(): BookData[] {
    const imageModules = import.meta.glob('../assets/books/*/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' })
    const textModules = import.meta.glob('../assets/books/*/info.txt', { eager: true, query: '?raw', import: 'default' })

    const bookMap: Record<string, BookData> = {}
    for (const path in imageModules) {
        const folderName = getFolderName(path)
        if (!folderName) continue

        if (!bookMap[folderName]) {
            bookMap[folderName] = {
                id: folderName,
                title: folderName,
                coverImage: '',
                images: [],
                totalPages: 0
            }
        }

        const imageUrl = imageModules[path] as string
        bookMap[folderName].images.push(imageUrl)
    }

    for (const path in textModules) {
        const folderName = getFolderName(path)
        if (bookMap[folderName]) {
            const content = textModules[path] as string
            const titleMatch = content.match(/Title:\s*(.+)/i)
            if (titleMatch) {
                bookMap[folderName].title = titleMatch[1].trim()
            }
        }
    }

    return Object.values(bookMap).map(book => {
        book.images.sort((a, b) => {
            const fileA = a.split('/').pop() || ''
            const fileB = b.split('/').pop() || ''
            return fileA.localeCompare(fileB, undefined, { numeric: true, sensitivity: 'base' })
        })

        if (book.images.length > 0) {
            book.coverImage = book.images[0]
        }

        book.totalPages = book.images.length
        return book
    })
}
