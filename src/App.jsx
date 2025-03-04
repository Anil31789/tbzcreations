import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Notfound from './Components/Notfound/Notfound';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='*' element={<Notfound/>}/>
          <Route path='/:id' element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App