import React from 'react'
import './layout.scss'
import Navbar from './components/navbar/Navbar.jsx'
import Home from './pages/Home/Home.jsx'

function App() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="pages">
        <Home />
      </div>
    </div>

  )
}

export default App