import axios from 'axios';

const state = {
    reservations: {},
    result: null
}

const getters = {
    getReservations: state => state.reservations,
    getResult: state => state.result,
}

const actions = {
    addReservation: (context, reservation) => {
        context.commit('setNewReservation', reservation);
    },
    removeItem: (context, reservation) => {
        context.commit('removeReservation', reservation);
    },
    reserveMedicines: (context, {pharmacyId, pickupDeadline}) => {
        let items = state.reservations[pharmacyId];
        axios.post('/reservations', {
          pharmacyId: pharmacyId,
          patientId: 'd1cb8425-c01f-4552-8660-75910e0def59',
          pickupDeadline: pickupDeadline,
          medicines: items
        }).then(response =>  {
            context.commit('setResult', {
                text: `You have successfully reserved medicines.`,
                code: response.status
            });
            context.commit('removeMedicinesForPharmacy', pharmacyId);
        }).
        catch(error => {
            context.commit('setResult', {
                text: error.response.data.ErrorMessage,
                code: error.response.data.StatusCode
            });
        });

    },
}

const mutations = {
    setNewReservation: (state, reservation) => {
        if(state.reservations[reservation['pharmacyId']] === undefined){
            state.reservations[reservation['pharmacyId']] = [];
        }
        state.reservations[reservation['pharmacyId']].push( {...reservation});
        state.reservations = {...state.reservations}
    },
    removeReservation: (state, reservation) => {
        let items = state.reservations[reservation['pharmacyId']];
        let check = false;
        items.forEach(item => {
            if(item['medicineId'] === reservation['medicineId'] && item['quantity'] === reservation['quantity'] && check == false){
                let index = items.indexOf(item);
                items.splice(index, 1);
                check = true;
            }
        });
        if(items.length == 0){
            delete state.reservations[reservation['pharmacyId']];
        }
    },
    removeMedicinesForPharmacy: (state, pharmacyId) => {
        delete state.reservations[pharmacyId];
        state.reservations = {...state.reservations}
    },

    setResult: (state, result) => {
        state.result = result;
    }
}

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
}