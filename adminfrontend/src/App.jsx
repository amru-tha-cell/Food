import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {Routes,Route} from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import './App.css'
import Add from './screens/Add/Add'
import List from './screens/List/List'
import Orders from './screens/Orders/Orders'
import {ToastContainer} from 'react-toastify'

//const url = 'http://localhost:4000'
const url = "https://food45.onrender.com"
const App = () => {
  return (
    <div className='app'>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Add url={url}/>}></Route>
          <Route path='/add' element={<Add url={url}/>}></Route>
          <Route path='/list' element={<List url={url}/>}></Route>
          <Route path='/orders' element={<Orders url={url}/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App