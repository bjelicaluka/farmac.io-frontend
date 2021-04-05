import axios from "axios"

const state = {
    result: null,
    patients: null,
    sortCrit: "", isAsc: true
};

const getters = {
    getResult: state => state.result,
    getPatients: state => state.patients
};

const actions = {
    addPatient: (context, patient) => {
        axios.post('/accounts/create-patient', patient)
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
        console.log(`In next sprints...`);
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
        axios.get(`/patients/my-patients/${medicalId}/sort?crit=${state.sortCrit}&asc=${state.isAsc}`)
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
    }
};

const mutations = {
    setResult: (state, result) => {
        state.result = result;
    },
    setPatients: (state, patients) => {
        state.patients = patients;
    }
};

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
};
