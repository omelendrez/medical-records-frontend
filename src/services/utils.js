import { getInactiveCustomers, restoreCustomer } from '../services/customers'
import { getInactivePets, restorePet } from '../services/pets'
import { getInactiveConsultations, restoreConsultation } from '../services/consultations'
import moment from 'moment'
import 'moment/locale/es'

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
      { name: 'nextAppointment', title: 'Próx. Turno', className: "text-nowrap" }
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
  { id: 'Hc', name: 'Hembra c' },
  { id: 'He', name: 'Hembra e' },
  { id: 'Mc', name: 'Macho c' },
  { id: 'Me', name: 'Macho e' }
]

export const getSexName = sexId => { // sexId = Mc
  const sex = sexList.find(sex => sexId === sex.id)
  return sex ? sex.name : '???'
}

export const getDateFromDays = days => {
  if (days < 1) {
    return ''
  }
  let d = new Date();
  d.setDate(d.getDate() - days)
  const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`.split('-')
  const newDate = date.map(part => part.length === 1 ? part = `0${part}` : part)
  return newDate.join('-')
}

export const formatNumber = amount => parseFloat(amount).toFixed(2)

export const getAge = birthDate => moment(birthDate).toNow().replace('en ', '')

export const formatDate = date => moment(date).format('L')