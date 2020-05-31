import { getInactiveCustomers, restoreCustomer } from '../services/customers'
import { getInactivePets, restorePet } from '../services/pets'
import { getInactiveConsultations, restoreConsultation } from '../services/consultations'
import { getInactiveDewormings, restoreDeworming } from '../services/dewormings'
import { getInactiveVaccinations, restoreVaccination } from '../services/vaccinations'
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
  vacunaciones: {
    fields: [
      { name: 'date', title: 'Fecha', className: "text-nowrap" },
      { name: 'petName', title: 'Paciente' },
      { name: 'vaccination', title: 'Desparasitación' },
      { name: 'nextAppointment', title: 'Próx. Turno', className: "text-nowrap" }
    ],
    getRecords: getInactiveVaccinations,
    restoreRecord: restoreVaccination
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
  },
  desparasitaciones: {
    fields: [
      { name: 'date', title: 'Fecha', className: "text-nowrap" },
      { name: 'petName', title: 'Paciente' },
      { name: 'deworming', title: 'Desparasitación' },
      { name: 'nextAppointment', title: 'Próx. Turno', className: "text-nowrap" }
    ],
    getRecords: getInactiveDewormings,
    restoreRecord: restoreDeworming
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

export const vaccinesList = [
  { id: 1, name: 'Triple felina' },
  { id: 2, name: 'Quíntuple' },
  { id: 3, name: 'Séxtuple' },
  { id: 4, name: 'Puppy DP' },
  { id: 5, name: 'Antirrábica' }
]
export const treatmentStage = [
  { id: 1, name: 'Inicio' },
  { id: 2, name: 'Continuación' },
  { id: 3, name: 'Fin / Alta' }
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
  return moment(d).format('YYYY-MM-DD');
}

export const getApointmentFromDays = days => {
  if (days < 1) {
    return ''
  }
  let d = new Date();
  d.setDate(d.getDate() + parseInt(days))
  return moment(d).format('YYYY-MM-DD');
}

export const getDateFromMonths = months => {
  if (months < 1) {
    return ''
  }
  let d = new Date();
  d.setMonth(d.getMonth() - months)
  return moment(d).format('YYYY-MM-DD');
}

export const formatNumber = amount => parseFloat(amount).toFixed(2)

export const getAge = birthDate => moment(birthDate).toNow().replace('en ', '')

export const formatDate = date => moment(date).format('L')

export const setToday = () => moment(new Date()).format('YYYY-MM-DD')
