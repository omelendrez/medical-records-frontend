import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Customers from './components/Customers'
import Pets from './components/Pets'
import Consultations from './components/Consultations'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/clientes" component={Customers} exact />
          <Route path="/pacientes" component={Pets} />
          <Route path="/consultas" component={Consultations} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
