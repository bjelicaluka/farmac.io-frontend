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
    fetchPatientsFutureAppointmentsWithPharmacists: (context, patientId) => {
        axios.get(`/appointments/future-with-pharmacists/${patientId}`)
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
            context.commit('setResult', {label: 'cancel', message: 'You have successfully cancelled your appointment.', ok: true})
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
    fetchHistoryOfVisitingDermatologist: (context, patientId) => {
        axios.get(`/appointments/history/${patientId}`)
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
    sortHistoryVisitingDermatologist: (context, {patientId, criteria, isAsc}) => {
        axios.get(`/appointments/history/${patientId}/sort?criteria=${criteria}&isAsc=${isAsc}`)
        .then(resp => {
            context.commit('setAppointments', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    createReport: (context, {appointmentId, notes, therapy}) => {
        axios.post(`/appointments/${appointmentId}/report`, {"notes": notes, "therapyDurationInDays": therapy})
        .then(resp => {
            context.commit('setResult', {label: 'createReport', ok: true, message: "Report successfully created."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'createReport', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    notePatientDidNotShowUp: (context, {appointmentId, notes, therapy}) => {
        axios.post(`/appointments/${appointmentId}/not-show-up`, {"notes": notes, "therapyDurationInDays": therapy})
        .then(resp => {
            context.commit('setResult', {label: 'createReport', ok: true, message: "Report successfully created."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'createReport', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    addPharmacistAppointment: (context, appointment) => {
        axios.post(`/appointments/pharmacist`, appointment)
        .then(resp => {
            context.commit('setResult', {label: 'addPharmacist', ok: true, message: "Successfully added pharmacist appointment."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'addPharmacist', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    addPharmacistAppointmentAsUser: (context, appointment) => {
        axios.post(`/appointments/pharmacist/as-user`, appointment)
        .then(resp => {
            context.commit('setResult', {label: 'addPharmacist', ok: true, message: "Successfully added pharmacist appointment."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'addPharmacist', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    cancelAppointmentWithPharmacist: (context, appointmentId) => {
        axios.delete(`/appointments/pharmacist/${appointmentId}`)
        .then(res => {
            context.commit('setResult', {label: 'cancel', message: 'You have successfully cancelled your appointment.', ok: true})
        })
        .catch(err => {
            context.commit('setResult', {label: 'cancel', message: err.response.data.ErrorMessage, ok: false})
        });
    }
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