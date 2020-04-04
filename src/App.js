import React from 'react';

import Navbar from './components/Navbar'
import Customers from './components/Customers'
import Pets from './components/Pets'

function App() {
  return (
    <div className="container-fluid">
      <Navbar />
      <Customers />
      <Pets />
    </div>
  );
}

export default App;
