import axios from "axios";
import store from '@/store'

const PAGE_SIZE = 5;

const state = {
    appointments: null,
    appointment: null,
    dermatologistAppointments: null,
    calendarEvents: null,
    result: null,
};

const getters = {
    getAppointments: state => state.appointments,
    getAppointment: state => state.appointment,
    getDermatologistAppointments: state => state.dermatologistAppointments,
    getCalendarEvents: state => state.calendarEvents,
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
    fetchDermatologistAppointmentsPageInPharmacy: (context, {pharmacyId, page}) => {
        axios.get(`/pharmacies/${pharmacyId}/dermatologists/appointments/page`, {params: {number: page, size: PAGE_SIZE}})
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
    createReport: (context, {appointmentId, notes, therapyDurationInDays, prescribedMedicines}) => {
        axios.post(`/appointments/${appointmentId}/report`, {notes, therapyDurationInDays, prescribedMedicines})
        .then(resp => {
            context.commit('setResult', {label: 'createReport', ok: true, message: "Report successfully created."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'createReport', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    notePatientDidNotShowUp: (context, {appointmentId, notes, therapyDurationInDays, prescribedMedicines}) => {
        axios.post(`/appointments/${appointmentId}/not-show-up`, {notes, therapyDurationInDays, prescribedMedicines})
        .then(resp => {
            context.commit('setResult', {label: 'createReport', ok: true, message: "Did-not-show-up report successfully created."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'createReport', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    addAnotherAppointmentByMedicalStaff: (context, appointment) => {
        axios.post(`/appointments/another`, appointment)
        .then(resp => {
            context.commit('setResult', {label: 'addAnother', ok: true, message: "Successfully added new appointment."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'addAnother', ok: false, message: err.response.data.ErrorMessage});
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
    },
    fetchAppointmentsAsEvents: (context, medicalStaffId) => {
        axios.get(`/appointments/for-calendar/${medicalStaffId}`)
        .then(resp => {
            context.commit('setCalendarEvents', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    fetchHistoryOfVisitingPharmacists: (context, patientId) => {
        axios.get(`/appointments/history-visit-pharmacists/${patientId}`)
        .then(resp => {
            context.commit('setAppointments', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    sortHistoryVisitingPharmacists: (context, {patientId, criteria, isAsc}) => {
        axios.get(`/appointments/history-visit-pharmacists/${patientId}/sort`, {params: {criteria, isAsc}})
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
    setAppointment: (state, appointment) => {
        state.appointment = appointment;
    },
    setDermatologistAppointments: (state, appointments) => {
        state.dermatologistAppointments = appointments;
    },
    setCalendarEvents: (state, appointments) => {
        state.calendarEvents = appointments;
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