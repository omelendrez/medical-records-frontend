import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Customers from './components/customers/Customers'
import CustomerAdd from './components/customers/CustomerAdd'
import CustomerEdit from './components/customers/CustomerEdit'
import CustomerView from './components/customers/CustomerView'
import Pets from './components/pets/Pets'
import PetAdd from './components/pets/PetAdd'
import PetEdit from './components/pets/PetEdit'
import Consultations from './components/consultations/Consultations'
import ConsultationAdd from './components/consultations/ConsultationAdd'
import ConsultationEdit from './components/consultations/ConsultationEdit'

function App() {
  const [filter, setFilter] = useState('')

  return (
    <BrowserRouter>
      <Navbar doSearch={setFilter} />
      <main>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/clientes" exact component={() => <Customers filter={filter} />} />
          <Route path="/clientes/:id" exact component={CustomerView} />
          <Route path="/nuevo-cliente" component={CustomerAdd} />
          <Route path="/edit-cliente/:id" exact component={CustomerEdit} />
          <Route path="/pacientes" exact component={() => <Pets filter={filter} />} />
          <Route path="/clientes/:id/nuevo-paciente" exact component={PetAdd} />
          <Route path="/nuevo-paciente" component={() => <PetAdd />} />
          <Route path="/edit-paciente/:id" exact component={PetEdit} />
          <Route path="/consultas" component={() => <Consultations filter={filter} />} />
          <Route path="/edit-consulta/:consultationId" exact component={ConsultationEdit} />
          <Route path="/nueva-consulta/:customerId/:petId" exact component={ConsultationAdd} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
