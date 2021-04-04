import axios from "axios";

const state = {
    patients: null,
    sortCrit: "",
    sortDir: "1"
};

const getters = {
    getPatients: state => state.patients
};

const actions = {
    fetchPatients: (context, id) => {
        axios.get(`/medical-staff/${id}/patients`)
        .then(resp => {
            context.commit('setPatients', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetchPatients', ok: false, message: err.response.data.ErrorMessage});
        });
    },
    sortPatients: (context, crit) => {
        context.commit('sortPatients', crit);
    }
};

const mutations = {
    setPatients: (state, patients) => {
        state.patients = patients;
    },
    sortPatients: (state, crit) => {
        const patients = state.patients;
        if (crit === state.sortCrit)
            state.sortDir = state.sortDir === '1' ? '-1' : '1';
        state.sortCrit = crit;
        patients.sort((k1 ,k2) => {
            if(k1[state.sortCrit] < k2[state.sortCrit]) return -1 * parseInt(state.sortDir);
            if(k1[state.sortCrit] > k2[state.sortCrit]) return 1 * parseInt(state.sortDir);
            return 0;
        });
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