import axios from "axios";
import store from '@/store'

const state = {
    appointments: null,
    dermatologistAppointments: null,
    result: null,
};

const getters = {
    getAppointments: state => state.appointments,
    getDermatologistAppointments: state => state.dermatologistAppointments,
    getResult: state => state.result,
};

const actions = {
    fetchAppointments: (context) => {
        axios.get(`/appointments`)
        .then(resp => {
            context.commit('setAppointments', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    fetchDermatologistAppointmentsInPharmacy: (context, pharmacyId) => {
        axios.get(`/pharmacies/${pharmacyId}/dermatologists/appointments`)
        .then(resp => {
            context.commit('setDermatologistAppointments', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    addDermatologistAppointment: (context, appointment) => {
        axios.post(`/appointments/dermatologist`, appointment)
        .then(resp => {
            context.commit('setResult', {label: 'addDermatologist', ok: true, message: "Successfully added dermatologist appointment."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'addDermatologist', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    reserveAppointment: (context, appointment) => {
        axios.post(`/appointments/make-appointment`, {"appointmentId" : appointment.appointmentId, "patientId" : appointment.patientId})
        .then(resp => {
            context.commit('setResult', {label: 'reserveAppointment', ok: true, message: "Successfully maked appointment with dermatologist."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'reserveAppointment', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    sortAppointments: (context, sortObject) => {
        axios.get(`/appointments/sort?pharmacyId=${sortObject['pharmacyId']}&criteria=${sortObject['criteria']}&isAsc=${sortObject['isAsc']}`)
        .then(resp => {
            context.commit('setDermatologistAppointments', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        })
    },
    fetchPatientsFutureAppointments: (context, patientId) => {
        axios.get(`/appointments/future-appointmnets/${patientId}`)
        .then(resp => {
            context.commit('setAppointments', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    }
};

const mutations = {
    setAppointments: (state, appointments) => {
        state.appointments = appointments;
    },
    setDermatologistAppointments: (state, appointments) => {
        state.dermatologistAppointments = appointments;
    },
    setResult: (state, result) => {
        state.result = result;
    },
};

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
};