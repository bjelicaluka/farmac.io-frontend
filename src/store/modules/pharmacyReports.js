import axios from "axios";

const state = {
    examinationReports: null,
    medicineConsumptionReports: null,
    result: null
};

const getters = {
    getExaminationReports: state => state.examinationReports,
    getMedicineConsumptionReports: state => state.medicineConsumptionReports,
    getResult: state => state.result
};

const actions = {

    fetchExaminationReports: (context, {pharmacyId, timePeriod}) => {
        axios.post(`/pharmacy/${pharmacyId}/examination-report`, timePeriod)
        .then(response => {
            context.commit('setExaminationReports', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchMedicineConsumptionReports: (context, {pharmacyId, timePeriod}) => {
        axios.post(`/pharmacy/${pharmacyId}/medicine-consumption-report`, timePeriod)
        .then(response => {
            context.commit('setMedicineConsumptionReports', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

};

const mutations = {
    setExaminationReports: (state, examinationReports) => {
        state.examinationReports = examinationReports;
    },
    setMedicineConsumptionReports: (state, medicineConsumptionReports) => {
        state.medicineConsumptionReports = medicineConsumptionReports;
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