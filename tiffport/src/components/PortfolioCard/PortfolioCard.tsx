import { Link } from 'react-router-dom'
import './PortfolioCard.css'

interface PortfolioCardProps {
  title: string
  image: string
  link: string
}

export function PortfolioCard({ title, link }: PortfolioCardProps) {
  return (
    <Link to={link} className="portfolio-card">
      <h3 className="portfolio-card-title">{title}</h3>
      <div className="portfolio-card-image">
        <img src="/12-1.thumb128.png" alt="hamster thumbnail" className="image-placeholder" />
      </div>
    </Link>
  )
}
