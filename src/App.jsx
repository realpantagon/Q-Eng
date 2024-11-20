import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import DisplayQueue from './View/DisplayQueue';
import ManageQueue from './View/ManageQueue';
import RequestQueue from './View/RequestQueue';



const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<DisplayQueue />} />
        <Route path="/manage" element={<ManageQueue />} />
        <Route path="/request" element={<RequestQueue />} />
      </Routes>
    </Router>
  );
};

export default App;
