import axios from 'axios';

const state = {
    medicines: null,
    pharmaciesForMedicine: null,
    result: null
}

const getters = {
    getMedicines: state => state.medicines,
    getPharmaciesForMedicine: state => state.pharmaciesForMedicine,
    getResult: state => state.result
}

const actions = {
    fetchMedicines: (context) => {
        axios.get(`/medicines/home`)
        .then(response => {
            context.commit('setMedicines', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },
    fetchPharmaciesForMedicineById: (context, id) => {
        axios.get(`medicines/${id}/pharmacies`)
        .then(response => {
            context.commit('setPharmaciesForMedicine', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },
    addMedicine: (context, medicine) => {
        axios.post('/medicines', medicine)
       .then(response => {
            context.commit('setResult', {
                label: 'add',
                ok: true,
                message: `You have successfully created a new medicine.`
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'add',
                ok: false,
                message: error.response.data.ErrorMessage
            });
        });
    },

}

const mutations = {
    setMedicines: (state, medicines) => {
        state.medicines = medicines;
    },
    setResult: (state, result) => {
        state.result = result;
    },
    setPharmaciesForMedicine: (state, pharmaciesForMedicine) => {
        state.pharmaciesForMedicine = pharmaciesForMedicine; 
    }
}

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
}