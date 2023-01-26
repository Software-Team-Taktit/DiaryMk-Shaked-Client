import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from './components/Sidebar'

import Home from './pages/Home';
import Search from './pages/Search';
import Recordings from './pages/Recordings';
import Settings from './pages/Settings';
import Record from './pages/Record';



const App: React.FunctionComponent = () => {
  return (
      <>
        <Router>
          <Sidebar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Search' element={<Search />} />
            <Route path='/Recordings' element={<Recordings />} />
            <Route path='/Settings' element={<Settings />} />
              <Route path='/Recordings/:id/:filename' element={<Record />} />
          </Routes>
        </Router>
      </>
  )
}

export default App
