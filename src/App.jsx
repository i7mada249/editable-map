import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MarkerControl from './MarkerControl';

import Map from '../Componants/map'
import Navbar from '../Componants/Navbar'

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Map />} />
              <Route path="/edit-markers" element={<MarkerControl />} />
          </Routes>
      </Router>
  );
};

export default App;
