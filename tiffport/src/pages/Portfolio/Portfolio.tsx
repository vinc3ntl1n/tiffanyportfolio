import { PortfolioCard } from '../../components'
import './Portfolio.css'

const categories = [
  { id: 'graduate', title: 'graduate', link: '/portfolio/graduate' },
  { id: 'undergrad', title: 'undergrad', link: '/portfolio/undergrad' },
  { id: 'professional', title: 'professional', link: '/portfolio/professional' },
]

export function Portfolio() {
  return (
    <div className="portfolio">
      <div className="portfolio-cards">
        <PortfolioCard title="graduate" link="/portfolio/graduate">
          <div className="book-red book-rect">
            <img src="/10-1.thumb128.png" alt="graduate book" className="image-placeholder" />
            <div className="book-label">GRADUATE</div>
          </div>
        </PortfolioCard>
        <PortfolioCard title="undergrad" link="/portfolio/undergrad">
          <div className="book-green book-rect">
            <img src="/11-1.thumb128.png" alt="undergrad book" className="image-placeholder" />
            <div className="book-label">UNDERGRAD</div>
          </div>
        </PortfolioCard>
        <PortfolioCard title="professional" link="/portfolio/professional">
          <div className="book-blue book-rect">
            <img src="/12-1.thumb128.png" alt="professional book" className="image-placeholder" />
            <div className="book-label">PROFESSIONAL</div>
          </div>
        </PortfolioCard>
      </div>
      <div className="portfolio-ground">
        {/* Brown ground bar */}
      </div>
    </div>
  )
}
