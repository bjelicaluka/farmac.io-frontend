import axios from "axios";

const state = {
    dermatologistsToComplaintAbout: [],
    pharmacistsToComplaintAbout: [],
    result: null
};

const getters = {
    getDermatologistsToComplaintAbout: state => state.dermatologistsToComplaintAbout,
    getPharmacistsToComplaintAbout: state => state.pharmacistsToComplaintAbout,
    getResult: state => state.result
};

const actions = {
    fetchDermatologistsToComplaintAbout: (context, patientId) => {
        axios.get(`/complaints/${patientId}/complaintable/dermatologists`)
        .then(response => {
            context.commit('setDermatologistsToComplaintAbout', response.data);
        })
        .catch(error => {
            context.commit('setResult', {label:'fetch', ok: false, message: error.response.data.ErrorMessage });
        })
    },

    createComplaintAboutDermatologist: (context, complaint) => {
        axios.post(`/complaints/about-dermatologist`, complaint)
        .then(response => {
            context.commit('setResult', {
                label: 'createComplaint',
                ok: true,
                message: 'You have sucessfully complainted about dermatologist.'
            });
        })
        .catch(error => {
            context.commit('setResult', {label:'createComplaint', ok: false, message: error.response.data.ErrorMessage });
        });
    },

    fetchPharmacistsToComplaintAbout: (context, patientId) => {
        axios.get(`/complaints/${patientId}/complaintable/pharmacists`)
        .then(response => {
            context.commit('setPharmacistsToComplaintAbout', response.data);
        })
        .catch(error => {
            context.commit('setResult', {label:'fetch', ok: false, message: error.response.data.ErrorMessage });
        })
    },

    createComplaintAboutPharmacist: (context, complaint) => {
        axios.post(`/complaints/about-pharmacists`, complaint)
        .then(response => {
            context.commit('setResult', {
                label: 'createComplaint',
                ok: true,
                message: 'You have sucessfully complainted about pharmacist.'
            });
        })
        .catch(error => {
            context.commit('setResult', {label:'createComplaint', ok: false, message: error.response.data.ErrorMessage });
        });
    }
};

const mutations = {
    setDermatologistsToComplaintAbout: (state, dermatologists) => {
        state.dermatologistsToComplaintAbout = dermatologists;
    },

    setPharmacistsToComplaintAbout: (state, pharmacists) => {
        state.pharmacistsToComplaintAbout = pharmacists;
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