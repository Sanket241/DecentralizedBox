import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Pages/Home'
import About from './Pages/About'
import Signin from './Pages/Signin'
import Footer from './Components/Footer'
import Error from './Components/Error'
const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/*' element={<Error/>} />
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App