import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Pages/Home'
import About from './Pages/About'
import Signin from './Pages/Signin'
import Footer from './Components/Footer'
import Error from './Components/Error'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import Protectedroute from './Components/Protectedroute'
import Access from './Components/Access'
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        
        <Route element={<Protectedroute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/access' element={<Access/>} />
          
        </Route>
        <Route path='/*' element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App