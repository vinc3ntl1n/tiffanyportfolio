import { Link } from 'react-router-dom'
import './Home.css'

export function Home() {
  return (
    <div className="home">
      <div className="home-content">
        <h1 className="home-title">tiffany lin</h1>
        <nav className="home-nav">
          <Link to="/portfolio" className="home-link">portfolio</Link>
          <Link to="/connect" className="home-link">connect</Link>
        </nav>
      </div>
      <div className="home-image">
        <img src="/10-1.thumb128.png" alt="hamster thumbnail" className="image-placeholder" />
      </div>
    </div>
  )
}
