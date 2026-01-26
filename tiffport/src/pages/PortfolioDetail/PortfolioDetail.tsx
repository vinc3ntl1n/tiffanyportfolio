import { useParams } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import ePub from 'epubjs'
import './PortfolioDetail.css'

const categoryBooks: Record<string, string> = {
  graduate: '/book1.epub',
  undergrad: '/book1.epub',
  professional: '/book1.epub',
}

export function PortfolioDetail() {
  const { category } = useParams<{ category: string }>()
  const viewerRef = useRef<HTMLDivElement>(null)
  const renditionRef = useRef<ReturnType<ReturnType<typeof ePub>['renderTo']> | null>(null)

  useEffect(() => {
    if (!viewerRef.current || !category) return

    const bookUrl = categoryBooks[category] || '/book1.epub'
    const book = ePub(bookUrl)
    
    const rendition = book.renderTo(viewerRef.current, {
      width: '100%',
      height: '100%',
      spread: 'always',
    })
    
    rendition.display()
    renditionRef.current = rendition

    return () => {
      book.destroy()
    }
  }, [category])

  const handlePrev = () => {
    renditionRef.current?.prev()
  }

  const handleNext = () => {
    renditionRef.current?.next()
  }

  return (
    <div className="portfolio-detail">
      <aside className="portfolio-detail-sidebar">
        <span className="portfolio-detail-category">{category}</span>
      </aside>
      <main className="portfolio-detail-content">
        <button className="nav-button prev" onClick={handlePrev}>‹</button>
        <div className="portfolio-detail-viewer" ref={viewerRef} />
        <button className="nav-button next" onClick={handleNext}>›</button>
      </main>
    </div>
  )
}
