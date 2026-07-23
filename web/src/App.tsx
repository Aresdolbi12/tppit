import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Membership from './pages/Membership'
import Region from './pages/Region'
import Barcodes from './pages/Barcodes'
import Check from './pages/Check'
import Pricing from './pages/Pricing'
import Services from './pages/Services'
import News from './pages/News'
import Contacts from './pages/Contacts'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  return (
    <>
      <div className="mesh-bg" aria-hidden />
      <div className="grain" aria-hidden />
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/o-palate" element={<About />} />
          <Route path="/chlenstvo" element={<Membership />} />
          <Route path="/region" element={<Region />} />
          <Route path="/shtrih-kody" element={<Barcodes />} />
          <Route path="/proverka" element={<Check />} />
          <Route path="/tarify" element={<Pricing />} />
          <Route path="/uslugi" element={<Services />} />
          <Route path="/novosti" element={<News />} />
          <Route path="/kontakty" element={<Contacts />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
