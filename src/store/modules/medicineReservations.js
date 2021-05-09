import axios from 'axios';

const state = {
    futureMedicineReservations: {},
    result: null,
    reservedMedicines: [],
    reservation: null
}

const getters = {
    getFutureMedicineReservations: state => state.futureMedicineReservations,
    getResult: state => state.result,
    getReservedMedicines: state => state.reservedMedicines,
    getReservation: state => state.reservation
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
    },

    fetchReservationInPharmacy(context, {uniqueId, pharmacyId}) {
        axios.get(`/reservations/in-pharmacy/${pharmacyId}/by-uniqueid/${uniqueId}`)
        .then(resp => {
            context.commit('setReservation', resp.data);
        })
        .catch(err => {
            context.commit('setResult', {label: 'fetch', ok: false, message: err.response.data.ErrorMessage});
        });
    },

    issueReserved(context, reservationId) {
        axios.put(`/reservations/issue-medicines/${reservationId}`)
        .then(resp => {
            context.commit('setResult', {label: 'issue', ok: true, message: 'Reservation is marked as done.'});
        })
        .catch(err => {
            context.commit('setResult', {label: 'issue', ok: false, message: err.response.data.ErrorMessage});
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
    },

    setReservation: (state, reservation) => {
        state.reservation = reservation;
    }
};

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
};