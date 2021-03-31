import axios from 'axios';

const state = {
    futureMedicineReservations: {},
    result: null,
    cancelResult: null,
}

const getters = {
    getFutureMedicineReservations: state => state.futureMedicineReservations,
    getResult: state => state.result,
    getCancelResult: state => state.cancelResult
};


const actions = {
    getFutureMedicineReservations(context, patientId){
        axios.get(`/reservations/futureReservations/${patientId}`)
        .then(response => {
            context.commit('setFutureMedicineReservations', response.data);
        })
        .catch(error => {
            context.commit('setResult', { code: error.response.status });
        });
    },

    cancelReservation(context, reservationId){
        axios.delete(`/reservations/cancel/${reservationId}`)
        .then(response => {
            context.commit('setCancelResult', {
                text: `You have successfully cancel reservation.`,
                code: response.status
            });
            context.dispatch('getFutureMedicineReservations', '2133bc63-1505-4835-9a40-124993d53be2');
        })
        .catch(error => {
            context.commit('setCancelResult', {
                text: error.response.data.ErrorMessage,
                code: error.response.data.StatusCode
            });
        });
    }
};

const mutations = {
    setFutureMedicineReservations: (state, futureMedicineReservations) => {
        state.futureMedicineReservations = futureMedicineReservations;
    },
    setResult: (state, result) => {
        state.result = result;
    },
    setCancelResult: (state, result) => {
        state.cancelResult = result;
    }
};

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
};