import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import DisplayQueue from './Pages/DisplayQueue';
import ManageQueue from './Pages/ManageQueue';
import RequestQueue from './Pages/RequestQueue';


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
