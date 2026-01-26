import { useParams } from 'react-router-dom'
import './PortfolioDetail.css'

export function PortfolioDetail() {
  const { category } = useParams<{ category: string }>()
  
  // TODO: Implement portfolio detail viewer
  return <div className="portfolio-detail">Portfolio Detail: {category}</div>
}
