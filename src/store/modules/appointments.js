import axios from "axios";

const state = {
    appointments: null,
    result: null,
};

const getters = {
    getAppointments: state => state.appointments,
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
    addDermatologistAppointment: (context, appointment) => {
        axios.post(`/appointments/dermatologist`, appointment)
        .then(resp => {
            context.commit('setResult', {label: 'addDermatologist', ok: true, message: "Successfully added dermatologist appointment."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'addDermatologist', ok: false, message: err.response.data.ErrorMessage});
        });
    },
};

const mutations = {
    setAppointments: (state, appointments) => {
        state.appointments = appointments;
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