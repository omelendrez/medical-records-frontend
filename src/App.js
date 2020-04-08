import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Customers from './components/Customers'
import Pets from './components/Pets'
import Consultations from './components/Consultations'

function App() {
  const [filter, setFilter] = useState('')

  return (
    <BrowserRouter>
      <Navbar doSearch={setFilter} />
      <main>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/clientes" component={() => <Customers filter={filter} />} />
          <Route path="/pacientes" component={() => <Pets filter={filter} />} />
          <Route path="/consultas" component={() => <Consultations filter={filter} />} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
