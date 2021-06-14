import axios from "axios";

const PAGE_SIZE = 5;

const state = {
    complaints: [],
    complaint: null,
    answers: [],
    dermatologistsToComplaintAbout: [],
    pharmacistsToComplaintAbout: [],
    pharmaciesToComplaintAbout: [],
    result: null
};

const getters = {
    getComplaints: state => state.complaints,
    getComplaint: state => state.complaint,
    getAnswers: state => state.answers,
    getDermatologistsToComplaintAbout: state => state.dermatologistsToComplaintAbout,
    getPharmacistsToComplaintAbout: state => state.pharmacistsToComplaintAbout,
    getPharmaciesToComplaintAbout: state => state.pharmaciesToComplaintAbout,
    getResult: state => state.result
};

const actions = {
    fetchComplaints: (context) => {
        axios.get(`/complaints`)
        .then(response => {
            context.commit('setComplaints', response.data);
        })
        .catch(error => {
            context.commit('setResult', {label:'fetch', ok: false, message: error.response.data.ErrorMessage });
        })
    },

    fetchComplaintsPagesTo: (context, { showAll, page }) => {
        axios.get(`/complaints/pages-to`, {params: {showAll: showAll, number: page, size: PAGE_SIZE}})
        .then(response => {
            context.commit('setComplaints', response.data);
        })
        .catch(error => {
            context.commit('setResult', {label:'fetch', ok: false, message: error.response.data.ErrorMessage });
        })
    },

    fetchComplaintsByWriter: (context, writerId) => {
        axios.get(`/complaints/by/${writerId}`)
        .then(response => {
            context.commit('setComplaints', response.data);
        })
        .catch(error => {
            context.commit('setResult', {label:'fetch', ok: false, message: error.response.data.ErrorMessage });
        })
    },

    fetchComplaintsByWriterPagesTo: (context, { writerId, page }) => {
        axios.get(`/complaints/by/${writerId}/pages-to`, {params: {number: page, size: PAGE_SIZE}})
        .then(response => {
            context.commit('setComplaints', response.data);
        })
        .catch(error => {
            context.commit('setResult', {label:'fetch', ok: false, message: error.response.data.ErrorMessage });
        })
    },
    

    fetchComplaintById: (context, complaintId) => {
        axios.get(`/complaints/${complaintId}`)
        .then(response => {
            context.commit('setComplaint', response.data);
        })
        .catch(error => {
            context.commit('setResult', {label:'fetch', ok: false, message: error.response.data.ErrorMessage });
        })
    },

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
    },

    fetchPharmaciesToComplaintAbout: (context, patientId) => {
        axios.get(`/complaints/${patientId}/complaintable/pharmacies`)
        .then(response => {
            context.commit('setPharmaciesToComplaintAbout', response.data);
        })
        .catch(error => {
            context.commit('setResult', {label:'fetch', ok: false, message: error.response.data.ErrorMessage });
        })
    },

    createComplaintAboutPharmacy: (context, complaint) => {
        axios.post(`/complaints/about-pharmacies`, complaint)
        .then(response => {
            context.commit('setResult', {
                label: 'createComplaint',
                ok: true,
                message: 'You have sucessfully complainted about pharmacy.'
            });
        })
        .catch(error => {
            context.commit('setResult', {label:'createComplaint', ok: false, message: error.response.data.ErrorMessage });
        });
    },

    fetchAnswersByWriter: (context, writerId) => {
        axios.get(`/complaints/answered-by/${writerId}`)
        .then(response => {
            context.commit('setAnswers', response.data);
        })
        .catch(error => {
            context.commit('setResult', {label:'fetch', ok: false, message: error.response.data.ErrorMessage });
        })
    },

    fetchAnswersByWriterPagesTo: (context, { writerId, page }) => {
        axios.get(`/complaints/answered-by/${writerId}/pages-to`, {params: { number: page, size: PAGE_SIZE }})
        .then(response => {
            context.commit('setAnswers', response.data);
        })
        .catch(error => {
            context.commit('setResult', {label:'fetch', ok: false, message: error.response.data.ErrorMessage });
        })
    },

    createAnswerForComplaint: (context, answer) => {
        axios.post(`/complaints/${answer.complaintId}/answers`, answer)
        .then(response => {
            context.commit('setResult', {
                label: 'createAnswer',
                ok: true,
                message: 'You have sucessfully answered to this complaint.'
            });
        })
        .catch(error => {
            context.commit('setResult', {label:'createAnswer', ok: false, message: error.response.data.ErrorMessage });
        });
    }
};

const mutations = {
    setComplaints: (state, complaints) => {
        state.complaints = complaints;
    },

    setComplaint: (state, complaint) => {
        state.complaint = complaint;
    },

    setAnswers: (state, answers) => {
        state.answers = answers;
    },

    setDermatologistsToComplaintAbout: (state, dermatologists) => {
        state.dermatologistsToComplaintAbout = dermatologists;
    },

    setPharmacistsToComplaintAbout: (state, pharmacists) => {
        state.pharmacistsToComplaintAbout = pharmacists;
    },

    setPharmaciesToComplaintAbout: (state, pharmacies) => {
        state.pharmaciesToComplaintAbout = pharmacies;
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