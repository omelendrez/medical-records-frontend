import { getInactiveCustomers, restoreCustomer } from '../services/customers'
import { getInactivePets, restorePet } from '../services/pets'
import { getInactiveConsultations, restoreConsultation } from '../services/consultations'

export const fieldsDefault = {
  clientes: {
    fields: [
      { name: 'name', title: 'Nombre' },
      { name: 'address', title: 'Domicilio' },
      { name: 'phone', title: 'Teléfono' },
      { name: 'email', title: 'Email' },
      { name: 'observations', title: 'Observaciones' }
    ],
    getRecords: getInactiveCustomers,
    restoreRecord: restoreCustomer
  },
  pacientes: {
    fields: [
      { name: 'name', title: 'Nombre' },
      { name: 'type', title: 'Tipo' },
      { name: 'breed', title: 'Raza' },
      { name: 'observations', title: 'Observaciones' }
    ],
    getRecords: getInactivePets,
    restoreRecord: restorePet
  },
  consultas: {
    fields: [
      { name: 'date', title: 'Fecha', className: "text-nowrap" },
      { name: 'petName', title: 'Paciente' },
      { name: 'diagnosis', title: 'Diagnóstico' },
      { name: 'treatment', title: 'Tratamiento' },
      { name: 'nextConsultation', title: 'Próx. Turno', className: "text-nowrap" }
    ],
    getRecords: getInactiveConsultations,
    restoreRecord: restoreConsultation
  }
}

export const paymentMethods = [
  { id: 0, name: 'N/A' },
  { id: 1, name: 'Efectivo' },
  { id: 2, name: 'Tarjeta Débito' },
  { id: 3, name: 'Tarjeta Crédito' },
  { id: 4, name: 'Mercado Pago' },
  { id: 5, name: 'Otro' }
]

export const sexList = [
  { id: '', name: '' },
  { id: 'M', name: 'Macho' },
  { id: 'H', name: 'Hembra' }
]

export const getDateFromDays = () => {
  let d = new Date();
  d.setDate(d.getDate() - 45)
  return d
}

export const formatNumber = amount => parseFloat(amount).toFixed(2)