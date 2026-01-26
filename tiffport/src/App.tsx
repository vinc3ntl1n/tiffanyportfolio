import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components'
import { Home, Portfolio, PortfolioDetail, Connect } from './pages'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout theme="light" />}>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/connect" element={<Connect />} />
        </Route>
        <Route element={<Layout theme="dark" />}>
          <Route path="/portfolio/:category" element={<PortfolioDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
