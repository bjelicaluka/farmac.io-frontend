import axios from 'axios';

const state = {
    reservations: {
        
    }
}

const getters = {
    getReservations: state => state.reservations,
}

const actions = {
    addReservation: (context, reservation) => {
        context.commit('setNewReservation', reservation);
    },
    removeItem: (context, reservation) => {
        context.commit('removeReservation', reservation);
    }
}

const mutations = {
    setNewReservation: (state, reservation) => {
        if(state.reservations[reservation['pharmacyId']] === undefined){
            state.reservations[reservation['pharmacyId']] = [];
        }
        reservation['counter'] = state.reservations[reservation['pharmacyId']].length;
        let newItem = {...reservation};
        state.reservations[reservation['pharmacyId']].push(newItem);
        state.reservations = {...state.reservations}
    },
    removeReservation: (state, reservation) => {
        let items = state.reservations[reservation['pharmacyId']];
        let check = false;
        items.forEach(item => {
            if(item['medicineId'] === reservation['medicineId'] && item['quantity'] === reservation['quantity'] && check == false){
                console.log(item);
                let index = items.indexOf(item);
                items.splice(index, 1);
                check = true;
            }
        });
        if(items.length == 0){
            delete state.reservations[reservation['pharmacyId']];
        }
    }
}

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
}