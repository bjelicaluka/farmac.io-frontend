import axios from "axios";

const state = {
    dermatologistsToRate: [],
    pharmacistsToRate: [],
    pharmaciesToRate: [],
    medicinesToRate: [],
    grade: null,
    ratedDermatologists: [],
    result: null
};

const getters = {
    getDermatologistsToRate: state => state.dermatologistsToRate,
    getPharmacistsToRate: state => state.pharmacistsToRate,
    getPharmaciesToRate: state => state.pharmaciesToRate,
    getMedicinesToRate: state => state.medicinesToRate,
    getGrade: state => state.grade,
    getRatedDermatologists: state => state.ratedDermatologists,
    getResult: state => state.result
};

const actions = {
    fetchCanBeRatedDermatologists: (context, patientId) => {
        axios.get(`/grades/${patientId}/can-rate-dermatologists`)
        .then(resp => {
            context.commit('setDermatologistsToRate', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        })
    },
    fetchRatedDermatologists: (context, patientId) => {
        axios.get(`/grades/${patientId}/rated-dermatologists`)
        .then(resp => {
            context.commit('setRatedDermatologists', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        })
    },
    fetchMedicalStaffGrade: (context, { patientId, medicalStaffId }) => {
        axios.get(`/grades/${medicalStaffId}/grade/${patientId}`)
        .then(resp => {
            context.commit('setGrade', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        })
    },
    rateMedicalStaff: (context, {patientId, medicalStaffId, grade, medicalStaffType}) => {
        let label = medicalStaffType === 'Dermatologist' ? 'gradeDermatologist' : 'gradePharmacist';
        let message = medicalStaffType === 'Dermatologist' ? "You have successfully rated a dermatologist."  : "You have successfully rated a pharmacist."
        axios.post(`/grades/rate`, {patientId, medicalStaffId, grade})
        .then(resp => {
            context.commit('setResult', {label: label, ok: true, message: message});
        })
        .catch(err => {
            context.commit('setResult', {label: label, ok: false, message: err.response.data.ErrorMessage});
        })
    },
    fetchPharmacistsThatPatientCanRate: (context, patientId) => {
        axios.get(`/grades/${patientId}/can-rate-pharmacists`)
        .then(resp => {
            context.commit('setPharmacistsToRate', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        })
    },
    fetchMedicinesThatCanRate: (context, patientId) => {
        axios.get(`/grades/${patientId}/can-rate-medicines`)
        .then(response => {
            context.commit('setMedicinesToRate', response.data);
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'fetch',
                ok: false,
                message: error.response.data.ErrorMessage
            })
        })
    },
    rateMedicine: (context, {value, patientId, medicineId}) => {
        axios.post(`/grades/rate-medicine`, {value, patientId, medicineId})
        .then(response => {
            context.commit('setResult', { 
                label: 'gradeMedicine',
                ok: true,
                message: "You have successfully rated the medicine."
            })
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'gradeMedicine',
                ok: false,
                message: error.response.data.ErrorMessage
            })
        })
    },
    fetchPharmaciesThatCanRate: (context, patientId) => {
        axios.get(`/grades/${patientId}/can-rate-pharmacies`)
        .then(response => {
            context.commit('setPharmaciesToRate', response.data);
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'fetch',
                ok: false,
                message: error.response.data.ErrorMessage
            })
        })
    },
    ratePharmacy: (context, {value, patientId, pharmacyId}) => {
        axios.post(`/grades/rate-pharmacy`, {value, patientId, pharmacyId})
        .then(response => {
            context.commit('setResult', { 
                label: 'gradePharmacy',
                ok: true,
                message: "You have successfully rated the pharmacy."
            })
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'gradePharmacy',
                ok: false,
                message: error.response.data.ErrorMessage
            })
        })
    }
};

const mutations = {
    setDermatologistsToRate: (state, dermatologists) => {
        state.dermatologistsToRate = dermatologists;
    },

    setPharmacistsToRate: (state, pharmacists) => {
        state.pharmacistsToRate = pharmacists;
    },

    setPharmaciesToRate: (state, pharmacies) => {
        state.pharmaciesToRate = pharmacies;
    },

    setMedicinesToRate: (state, medicines) => {
        state.medicinesToRate = medicines;
    },

    setGrade: (state, grade) => {
        state.grade = grade;
    },

    setRatedDermatologists: (state, dermatologists) => {
        state.ratedDermatologists = dermatologists;
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