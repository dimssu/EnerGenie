import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddDevice from './components/AddDevice'
import Data from './components/Data'
import Header from './components/Header'

import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
            <Route path='/addDevice' element={<AddDevice/>}/>
            <Route path='/device/:id' element={<Data/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
