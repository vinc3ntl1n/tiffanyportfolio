import { getBooks, type BookData } from '../utils/bookScanner'

export type BookConfig = BookData

export const books: BookConfig[] = getBooks()
