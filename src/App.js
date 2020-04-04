import React from 'react';

import Navbar from './components/Navbar'
import Customers from './components/Customers'

function App() {
  return (
    <div className="container-fluid">
      <Navbar />
      <Customers />
    </div>
  );
}

export default App;
