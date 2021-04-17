<template>
    <div>
        <Modal modalBoxId="addAllergiesModal" title="Add allergies">
            <div slot="body">
                <MedicinesTable :medicines="addedMedicines" iconName='clear' @clickButton='removeAllergy' title="Remove allergy"/>
                <Button type="submit" @click="addAllergies">Add allergies</Button>
                <MedicinesTable :medicines="medicines" iconName='local_pharmacy' @clickButton="addAllergy" title="Add allergy"/>
            </div>
        </Modal>
        <ModalOpener id="addAllergiesModalOpener"  modalBoxId="addAllergiesModal">
            <Button class="pull-right">Add allergies</Button>
        </ModalOpener>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Button from '../Form/Button'
import MedicinesTable from '../Tables/MedicinesTable'
import Modal from '../Modal/Modal'
import ModalOpener from '../Modal/ModalOpener'
import toastr from 'toastr'
import { getAccountIdFromToken } from '../../utils/token'

export default {
   components: {
       Button,
       MedicinesTable,
       Modal,
       ModalOpener
    },

    data: function() {
        return {
            medicines: [],
            addedMedicines: [],
            addedMedicinesIds: []
        }
    },

    computed: {
        ...mapGetters({
            getMedicines: 'medicines/getMedicines',
            getMedicine: 'medicines/getMedicine',
            result: 'patient/getResult'
        })
    },

    watch: {
        getMedicines(allMedicines){
            this.medicines = allMedicines;
        },
        getMedicine(medicine){
            this.addedMedicines.push(medicine.medicine);
            this.addedMedicinesIds.push(medicine.medicine.id)
        },
        result({label, ok, message}){
            if(label === 'addAllergies'){
                if(ok){
                    toastr.success(message);
                }
                else{
                    toastr.error(message);
                }
            }
        }
    },

    methods: {
        ...mapActions({ 
            fetchMedicines: 'medicines/fetchMedicines',
            fetchMedicine: 'medicines/fetchMedicineById',
            addPatientsAllergies: 'patient/addAllergies'
        }),
        addAllergy(medicineId) {
            let check = false;
            this.addedMedicinesIds.forEach(medicine => {
                if(medicine == medicineId){
                    check = true;
                }
            });
            if (!check){
                this.fetchMedicine(medicineId);
            }
            else{
                toastr.error("Allergy is already added.");
            }
        },
        removeAllergy(medicineId){
            this.addedMedicines = this.addedMedicines.filter(item => item.id !== medicineId);
            this.addedMedicinesIds = this.addedMedicinesIds.filter(item => item !== medicineId);
        },
        addAllergies(){
            let request = {
                medicinesId : this.addedMedicinesIds,
                patientId : getAccountIdFromToken()
            }
            this.addPatientsAllergies(request);
        }

    },

    mounted() {
        this.fetchMedicines()
    }
}

</script>
