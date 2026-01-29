import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { FlipBook } from '../../components'
import './PortfolioDetail.css'

interface BookConfig {
  totalPages: number
  basePath: string
  prefix: string
}

const BOOK_CONFIGS: Record<string, BookConfig> = {
  graduate: {
    totalPages: 108,
    basePath: '/book1/',
    prefix: 'LinT_Portfolio_2026'
  },
  undergrad: {
    totalPages: 108,
    basePath: '/book1/',
    prefix: 'LinT_Portfolio_2026'
  },
}

function generatePageUrls(config: BookConfig): string[] {
  const pages: string[] = []
  for (let i = 1; i <= config.totalPages; i++) {
    if (i === 1) {
      pages.push(`${config.basePath}${config.prefix}.jpg`)
    } else {
      pages.push(`${config.basePath}${config.prefix}${i}.jpg`)
    }
  }
  return pages
}

export function PortfolioDetail() {
  const { category } = useParams<{ category: string }>()
  const navigate = useNavigate()

  const config = BOOK_CONFIGS[category || 'graduate'] || BOOK_CONFIGS.graduate
  const pages = generatePageUrls(config)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') navigate(-1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

  return (
    <div className="portfolio-detail">
      <aside className="portfolio-detail-sidebar">
        <span className="portfolio-detail-category">{category}</span>
      </aside>
      <main className="portfolio-detail-content">
        <FlipBook pages={pages} />
      </main>
    </div>
  )
}
