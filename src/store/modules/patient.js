import axios from "axios"

const state = {
    result: null,
    patient: null,
    patients: null,
    allergies: null,
    sortCrit: "", isAsc: true,
};

const getters = {
    getResult: state => state.result,
    getPatients: state => state.patients,
    getPatient: state => state.patient,
    getAllergies: state => state.allergies
};

const actions = {
    fetchPatientById: (context, id) => {
        axios.get(`/patients/${id}`)
        .then(response => {
            context.commit('setPatient', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    addPatient: (context, patient) => {
        axios.post('/patients', patient)
        .then(response => {
            context.commit('setResult', {
                label: 'add',
                ok: true,
                message: `You have successfully created a new account. Please verify your account on the email.`
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'add',
                ok: false,
                message: error.response.data.ErrorMessage
            });
        })
    },

    updatePatient: (context, patient) => {
        axios.put('/patients', patient)
         .then(response => {
             context.commit('setResult', {
                 label: 'update',
                 ok: true,
                 message: `You have successfully updated a patient.`
             });
         })
         .catch(error => {
             context.commit('setResult', {
                 label: 'update',
                 ok: false,
                 message: error.response.data.ErrorMessage
             });
         })
    },

    fetchMedicalStaffsPatients: (context, medicalId) => {
        axios.get(`/patients/my-patients/${medicalId}`)
        .then(resp => {
            context.commit('setPatients', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetchPatients', ok: false, message: err.response.data.ErrorMessage});
        });
    },

    fetchSortedMedicalStaffsPatients: (context, {medicalId, sortCrit}) => {
        if (sortCrit === state.sortCrit)
            state.isAsc = !state.isAsc;
        state.sortCrit = sortCrit;
        axios.get(`/patients/my-patients/${medicalId}/sort?crit=${state.sortCrit}&isAsc=${state.isAsc}`)
        .then(resp => {
            context.commit('setPatients', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetchPatients', ok: false, message: err.response.data.ErrorMessage});
        });
    },

    searchPatients: (context, {medicalId, name}) => {
        axios.get(`/patients/my-patients/${medicalId}/search?name=${name}`)
        .then(resp => {
            context.commit('setPatients', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetchPatients', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    addAllergies: (context, request) => {
        axios.post(`/patients/add-allergies`, request)
        .then(resp => {
            context.commit('setResult', {label: 'addAllergies', ok: true, message: "You successfully added allergies."});
        })
        .catch(err => {
            context.commit('setResult', {label: 'addAllergies', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    fetchAllergies: (context, patientId) => {
        axios.get(`/patients/patients-allergies/${patientId}`)
        .then(resp => {
            context.commit('setAllergies', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetchAllergies', ok: false, message: err.response.data.ErrorMessage});
        })
    },
    deleteAllergy: (context, {medicineId, patientId}) => {
        axios.delete(`patients/${patientId}/allergy/${medicineId}`)
        .then(resp => {
            context.commit('setResult', {label: 'deleteAllergy', ok: true, message: 'Allergy is successfully deleted'});
        })
        .catch(err => {
            context.commit('setResult', {label: 'deleteAllergy', ok: false, message: err.response.data.ErrorMessage});
        })
    }
};

const mutations = {
    setPatients: (state, patients) => {
        state.patients = patients;
    },
    setPatient: (state, patient) => {
        state.patient = patient;
    },
    setAllergies: (state, allergies) => {
        state.allergies = allergies;
    },
    setResult: (state, result) => {
        state.result = result;
    }
};

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
};
