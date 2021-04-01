import axios from 'axios';

const state = {
    futureMedicineReservations: {},
    result: null,
    reservedMedicines: []
}

const getters = {
    getFutureMedicineReservations: state => state.futureMedicineReservations,
    getResult: state => state.result,
    getReservedMedicines: state => state.reservedMedicines
};


const actions = {
    fetchFutureMedicineReservations(context, patientId){
        axios.get(`/reservations/futureReservations/${patientId}`)
        .then(response => {
            context.commit('setFutureMedicineReservations', response.data);
        })
        .catch(error => {
            context.commit('setResult', { ok: false });
        });
    },

    cancelReservation(context, reservationId){
        axios.delete(`/reservations/cancel/${reservationId}`)
        .then(response => {
            context.commit('setResult', {
                label: 'cancel',
                message: `You have successfully cancel reservation.`,
                ok: true
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'cancel',
                message: error.response.data.ErrorMessage,
                ok: false
            });
        });
    },
    
    fetchReservedMedicines(context, reservationId){
        axios.get(`/reservations/reservedMedicines/${reservationId}`)
        .then(response => {
            context.commit('setReservedMedicines', response.data);
        })
        .catch(error => {
            context.commit('setResult', { ok: false });
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
    
    setReservedMedicines: (state, reservedMedicines) =>{
        state.reservedMedicines = reservedMedicines;
    }
};

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
};