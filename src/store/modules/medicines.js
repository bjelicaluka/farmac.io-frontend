import axios from 'axios';
import download from 'downloadjs'

const state = {
    medicines: null,
    smallMedicines: null,
    medicine: null,
    types: null,
    medicineNames: [],
    medicineOptions: [],
    pharmaciesForMedicine: null,
    result: null
}

const getters = {
    getMedicines: state => state.medicines,
    getMedicine: state => state.medicine,
    getTypes: state => state.types,
    getMedicineNames: state => state.medicineNames,
    getPharmaciesForMedicine: state => state.pharmaciesForMedicine,
    getResult: state => state.result,
    getSmallMedicines: state => state.smallMedicines,
    getMedicineOptions: state => state.medicineOptions
}

const actions = {
    fetchMedicines: (context) => {
        axios.get(`/medicines`)
        .then(response => {
            context.commit('setMedicines', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchTypes: (context) => {
        axios.get('/medicines/types')
        .then(response => {
            context.commit('setTypes', response.data);
        })
        .catch(error => {
        context.commit('setResult', { label: 'fetch', ok: false });
        })
    },

    fetchMedicineById: (context, id) => {
        axios.get(`/medicines/${id}`)
        .then(response => {
            context.commit('setMedicine', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchMedicinesForHomePage: (context) => {
        axios.get(`/medicines/home`)
        .then(response => {
            context.commit('setMedicines', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchMedicineOptions: (context) => {
        axios.get(`/medicines/home`)
        .then(response => {
            context.commit('setMedicineOptions', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchMedicinePdf: (context, {id, name}) => {
        axios.get(`/medicines/details/${id}`, { responseType: 'blob' })
            .then(response => {
              download(response.data, `${name}.pdf`, 'application/pdf');
            })
            .catch(error => {
                context.commit('setResult', { label: 'fetch', ok: false });
            });
    },   

  fetchMedicinesByParams: (context, {name, type, gradeFrom, gradeTo}) => {
        axios.get(`/medicines/search?name=${name}&type=${type}&gradeFrom=${gradeFrom}&gradeTo=${gradeTo}`)
        .then(response => {
            context.commit('setMedicines', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    fetchPharmacyMedicinesInStock: (context, pharmacyId) => {
        axios.get(`/pharmacies/${pharmacyId}/medicines-in-stock`)
        .then(response => {
            context.commit('setMedicines', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },

    searchPharmacyMedicinesInStock: (context, {pharmacyId, name}) => {
        axios.get(`/pharmacies/${pharmacyId}/medicines-in-stock/search`, {params: {name}})
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

    fetchMedicineNames: (context, pharmacyId) => {
        axios.get(`medicines/in-pharmacy/${pharmacyId}/names`)
        .then(response => {
            context.commit('setMedicineNames', response.data);
        })
        .catch(error => {
            context.commit('setResult', { label: 'fetch', ok: false });
        });
    },
    
    fetchMedicinesOrReplacements: (context, {pharmacyId, name}) => {
        axios.get(`medicines/in-pharmacy/${pharmacyId}/search?name=${name}`)
        .then(response => {
            context.commit('setSmallMedicines', response.data);
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

    updateMedicine: (context, medicine) => {
        axios.put('/medicines', medicine)
       .then(response => {
            context.commit('setResult', {
                label: 'update',
                ok: true,
                message: `You have successfully updated an existing medicine.`
            });
        })
        .catch(error => {
            context.commit('setResult', {
                label: 'update',
                ok: false,
                message: error.response.data.ErrorMessage
            });
        });
    },

    deleteMedicine: (context, id) => {
        axios.delete(`/medicines/${id}`)
        .then(response => {
            context.commit('setResult', {
                label: 'delete',
                ok: true,
                message: `You have successfully deleted medicine.`
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

}

const mutations = {
    setMedicines: (state, medicines) => {
        state.medicines = medicines;
    },
    setMedicineOptions: (state, medicines) => {
        state.medicineOptions = medicines;
    },
    setMedicine: (state, medicine) => {
        state.medicine = medicine;
    },
    setTypes: (state, types) => {
        state.types = types;
    },
    setMedicineNames: (state, medicineNames) => {
        let names = [];
        medicineNames.forEach(mn => names.push({label:mn, value:mn}))
        state.medicineNames = names;
    },
    setPharmaciesForMedicine: (state, pharmaciesForMedicine) => {
        state.pharmaciesForMedicine = pharmaciesForMedicine; 
    },
    setResult: (state, result) => {
        state.result = result;
    },
    setSmallMedicines: (state, smallMedicines) => {
        state.smallMedicines = smallMedicines;
    }
}

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
}