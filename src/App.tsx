import { useEffect, useState } from 'react'
import './App.css'
import DocsPage from './pages/DocsPage'
import LandingPage from './pages/LandingPage'

type Route = 'home' | 'docs'

function getRoute(): Route {
  return window.location.hash === '#/docs' ? 'docs' : 'home'
}

function App() {
  const [route, setRoute] = useState<Route>(() => getRoute())

  useEffect(() => {
    const handleRouteChange = () => setRoute(getRoute())

    window.addEventListener('hashchange', handleRouteChange)
    return () => window.removeEventListener('hashchange', handleRouteChange)
  }, [])

  return route === 'docs' ? <DocsPage /> : <LandingPage />
}

export default App
