import { Link } from 'react-router-dom'
import './PortfolioCard.css'

interface PortfolioCardProps {
  title: string
  image: string
  link: string
}

export function PortfolioCard({ title, image, link }: PortfolioCardProps) {
  // TODO: Implement portfolio card
  return (
    <Link to={link} className="portfolio-card">
      <h3>{title}</h3>
      <img src={image} alt={title} />
    </Link>
  )
}
