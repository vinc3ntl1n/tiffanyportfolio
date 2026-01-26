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
        {categories.map((cat) => (
          <PortfolioCard
            key={cat.id}
            title={cat.title}
            image=""
            link={cat.link}
          />
        ))}
      </div>
      <div className="portfolio-ground">
        {/* Brown ground bar */}
      </div>
    </div>
  )
}
