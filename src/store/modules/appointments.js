import axios from "axios";
import store from '@/store'

const state = {
    appointments: null,
    appointment: null,
    dermatologistAppointments: null,
    result: null,
};

const getters = {
    getAppointments: state => state.appointments,
    getAppointment: state => state.appointment,
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
            context.commit('setResult', {label: 'reserveAppointment', ok: true, message: "Successfully reserved appointment with dermatologist."});
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
        axios.get(`/appointments/future-appointments/${patientId}`)
        .then(resp => {
            context.commit('setAppointments', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    cancelAppointment: (context, appointmentId) => {
        axios.delete(`/appointments/cancel-appointment/${appointmentId}`)
        .then(resp => {
            context.commit('setResult', {label: 'cancel', message: 'You have successfully cancelled appointment.', ok: true})
        })
        .catch(err => {
            context.commit('setResult', {label: 'cancel', message: err.response.data.ErrorMessage, ok: false})
        });
    },
    fetchMedicalStaffAppointmentsToReport: (context, medicalStaffId) => {
        axios.get(`/appointments/my-appointments/${medicalStaffId}`)
        .then(resp => {
            context.commit('setAppointments', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    fetchAppointment: (context, id) => {
        axios.get(`/appointments/${id}`)
        .then(resp => {
            context.commit('setAppointment', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    createReport: (context, report) => {
        axios.post(`/appointments/${report.appointmentId}/report`, {"notes": report.notes, "therapyDurationInDays": report.therapy})
        .then(resp => {
            context.commit('setResult', {label: 'createReport', ok: true, message: "Report successfully created."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'createReport', ok: false, message: err.response.data.ErrorMessage});
        });
    },
};

const mutations = {
    setAppointments: (state, appointments) => {
        state.appointments = appointments;
    },
    setAppointment: (state, appointment) => {
        state.appointment = appointment;
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