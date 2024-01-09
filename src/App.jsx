import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import Header from './components/Header/Header'
import CategoryArticle from './pages/CategoryArticle/CategoryArticle'
import Auth from './pages/Auth/Auth'
import AddArticle from './pages/AddArticle/AddArticle'
import ArticleDetails from './pages/ArticleDetails/ArticleDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/addarticle' element={<AddArticle />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/category/:categoryName' element={<CategoryArticle />} />
        <Route path='/article/:articleId' element={<ArticleDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
