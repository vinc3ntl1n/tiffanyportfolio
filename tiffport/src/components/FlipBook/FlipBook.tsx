import { useEffect, useRef, useState, useCallback } from 'react'
// @ts-ignore
import { PageFlip } from 'page-flip'
import './FlipBook.css'

interface FlipBookProps {
    pages: string[]
    onPageChange?: (pageNum: number) => void
}

export function FlipBook({ pages, onPageChange }: FlipBookProps) {
    const bookRef = useRef<HTMLDivElement>(null)
    const pageFlipRef = useRef<PageFlip | null>(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [pagesReady, setPagesReady] = useState(false)

    const handlePrev = useCallback(() => {
        pageFlipRef.current?.flipPrev()
    }, [])

    const handleNext = useCallback(() => {
        pageFlipRef.current?.flipNext()
    }, [])

    useEffect(() => {
        if (!bookRef.current || !pagesReady) return
        if (pageFlipRef.current) return

        const pageElements = bookRef.current.querySelectorAll('.page-content')
        if (pageElements.length === 0) return

        const pageFlip = new PageFlip(bookRef.current, {
            width: 450,
            height: 500,
            size: 'stretch',
            minWidth: 300,
            maxWidth: 600,
            minHeight: 286,
            maxHeight: 714,
            showCover: true,
            mobileScrollSupport: false,
            useMouseEvents: true,
            flippingTime: 400,
            usePortrait: false,
            startZIndex: 0,
            autoSize: true,
            maxShadowOpacity: 0.5,
            drawShadow: true,
        })

        pageFlip.loadFromHTML(pageElements)
        pageFlipRef.current = pageFlip

        pageFlip.on('flip', (e: { data: number }) => {
            setCurrentPage(e.data)
            onPageChange?.(e.data)
        })

        return () => {
            pageFlip.destroy()
            pageFlipRef.current = null
        }
    }, [pagesReady, onPageChange])

    useEffect(() => {
        setPagesReady(true)
    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') handlePrev()
            if (e.key === 'ArrowRight') handleNext()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handlePrev, handleNext])

    return (
        <div className="flipbook-container">
            <button className="flipbook-nav prev" onClick={handlePrev}>‹</button>
            <div className="flipbook-wrapper">
                <div ref={bookRef} className="flipbook">
                    {pages.map((src, i) => (
                        <div
                            key={i}
                            className="page-content"
                            data-density={i === 0 || i === pages.length - 1 ? 'hard' : 'soft'}
                        >
                            <img
                                src={src}
                                alt={`Page ${i + 1}`}
                                loading={i < 10 ? 'eager' : 'lazy'}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <button className="flipbook-nav next" onClick={handleNext}>›</button>
            <div className="flipbook-indicator">
                {currentPage + 1} / {pages.length}
            </div>
        </div>
    )
}
