import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import Header from './components/Header/Header'
import CategoryArticle from './pages/CategoryArticle/CategoryArticle'
import Auth from './pages/Auth/Auth'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/category/:categoryName' element={<CategoryArticle />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
