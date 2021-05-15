import axios from "axios";

const PAGE_SIZE = 5;

const state = {
    loyaltyPrograms: null,
    discount: 0,
    result: null
};

const getters = {
    getLoyaltyPrograms: state => state.loyaltyPrograms,
    getDiscount: state => state.discount,
    getResult: state => state.result
};

const actions = {
    fetchLoyaltyPrograms: (context) => {
        axios.get(`loyalty-programs`)
        .then(response => {
            context.commit('setLoyaltyPrograms', response.data);
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'fetch',
                ok: false,
                message: error.response.data.ErrorMessage
            });
        });
    },

    fetchLoyaltyProgramsPage: (context, page) => {
        axios.get(`loyalty-programs/page`, {params: { number: page, size: PAGE_SIZE }})
        .then(response => {
            context.commit('setLoyaltyPrograms', response.data);
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'fetch',
                ok: false,
                message: error.response.data.ErrorMessage
            });
        });
    },

    fetchDiscountForPatient: (context, patientId) => {
        if(patientId === undefined)
            return;
        axios.get(`loyalty-programs/discount-for/${patientId}`)
        .then(response => {
            context.commit('setDiscount', response.data);
        })
        .catch(error => {
        });
    },

    addLoyaltyProgram: (context, loyaltyProgram) => {
        axios.post(`loyalty-programs`, loyaltyProgram)
        .then(response => {
            context.commit('setResult', {
                label: 'add',
                ok: true,
                message: 'You have successfully created a new loyalty program.'
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

    updateLoyaltyProgram: (context, loyaltyProgram) => {
        axios.put(`loyalty-programs`, loyaltyProgram)
        .then(response => {
            context.commit('setResult', {
                label: 'update',
                ok: true,
                message: 'You have successfully updated an existing loyalty program.'
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

    deleteLoyaltyProgram: (context, loyaltyProgramId) => {
        axios.delete(`loyalty-programs/${loyaltyProgramId}`)
        .then(response => {
            context.commit('setResult', {
                label: 'delete',
                ok: true,
                message: 'You have successfully deleted an existing loyalty program.'
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'delete',
                ok: false,
                message: error.response.data.ErrorMessage
            });
        });
    }

};

const mutations = {
    setLoyaltyPrograms: (state, loyaltyPrograms) => {
        state.loyaltyPrograms = loyaltyPrograms;
    },

    setDiscount: (state, discount) => {
        state.discount = discount
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