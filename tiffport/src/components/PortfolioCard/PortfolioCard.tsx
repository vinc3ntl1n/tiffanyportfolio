import { Link } from 'react-router-dom'
import './PortfolioCard.css'

interface PortfolioCardProps {
  title: string
  link: string
  children?: React.ReactNode
}

export function PortfolioCard({ title, link, children }: PortfolioCardProps) {
  return (
    <Link to={link} className="portfolio-card">
      <div className="portfolio-card-image">
        {children}
      </div>
    </Link>
  )
}
