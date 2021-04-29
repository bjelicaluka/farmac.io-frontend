import axios from "axios";

const state = {
    examinationReports: null,
    medicineConsumptionReports: null,
    pharmacyIncomeReports: null,
    result: null
};

const getters = {
    getExaminationReports: state => state.examinationReports,
    getMedicineConsumptionReports: state => state.medicineConsumptionReports,
    getPharmacyIncomeReports: state => state.pharmacyIncomeReports,
    getResult: state => state.result
};

const actions = {

    fetchExaminationReports: (context, {pharmacyId, timePeriod}) => {
        axios.post(`/pharmacies/${pharmacyId}/examination-report`, timePeriod)
        .then(response => {
            context.commit('setExaminationReports', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchMedicineConsumptionReports: (context, {pharmacyId, timePeriod}) => {
        axios.post(`/pharmacies/${pharmacyId}/medicine-consumption-report`, timePeriod)
        .then(response => {
            context.commit('setMedicineConsumptionReports', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchPharmacyIncomeReports: (context, {pharmacyId, timePeriod}) => {
        axios.post(`/pharmacies/${pharmacyId}/pharmacy-income-report`, timePeriod)
        .then(response => {
            context.commit('setPharmacyIncomeReports', response.data);
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
    setPharmacyIncomeReports: (state, pharmacyIncomeReports) => {
        state.pharmacyIncomeReports = pharmacyIncomeReports;
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