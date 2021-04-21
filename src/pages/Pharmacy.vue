<template>
    <div class="content">
        <div class="container-fluid">
            <Card :title="pharmacy && pharmacy.name" :description="pharmacy && pharmacy.description">
                <PharmacyInfo :pharmacy="pharmacy" />
            </Card>
            <Card title='Pharmacists' :description="`${pharmacy && pharmacy.name}'s pharmacist employees.`">
                <PharmacistsTable @search="handleSearchPharmacists" :pharmacists="pharmacists" :adminPharmacyId="pharmacyId" />
            </Card>
            <Card title='Dermatologists' :description="`${pharmacy && pharmacy.name}'s dermatologist employees.`">
                <DermatologistsTable @search="handleSearchDermatologists" :dermatologists="dermatologists" :adminPharmacyId="pharmacyId" />
            </Card>
            <Card title='Dermatologist Appointments' :description="`${pharmacy && pharmacy.name}'s dermatologist appointments.`">
                <AppointmentsTable :appointments="dermatologistAppointments" :pharmacyId="pharmacyId" />
            </Card>
            <Card title='Medicines' :description="`${pharmacy && pharmacy.name}'s medicines that are in stock.`">
                <MedicineListTable @search="handleSearchPharmacyMedicines" :medicines="medicines" :adminPharmacyId="pharmacyId" />
            </Card>
            <ModalOpener
                modalBoxId="pharmacyOrderModal"
            >
                <Button>Create Pharmacy Order</Button>
            </ModalOpener>
        </div> 

        <Modal
            modalBoxId="pharmacyOrderModal"
            title="Pharmacy Medicines Order"
            sizeClass="modal-lg"
        >
            <div slot="body">
                <PharmacyOrderForm :pharmacyId="pharmacyId" pharmacyAdminId="08d8f514-5921-423d-852c-694311688aa2" />
            </div>
        </Modal>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Card from '../components/Card/Card.vue';
import DermatologistsTable from '../components/Tables/DermatologistsTable.vue';
import PharmacistsTable from '../components/Tables/PharmacistsTable.vue';
import PharmacyInfo from '../components/Shared/PharmacyInfo'
import toastr from 'toastr'
import AppointmentsTable from '../components/Tables/AppointmentsTable.vue';
import MedicineListTable from '../components/Tables/MedicineListTable.vue';
import ModalOpener from '../components/Modal/ModalOpener.vue';
import Button from '../components/Form/Button.vue';
import Modal from '../components/Modal/Modal.vue';
import PharmacyOrderForm from '../components/Forms/PharmacyOrderForm.vue';

export default {
  components: { PharmacistsTable, Card, DermatologistsTable, PharmacyInfo, AppointmentsTable, MedicineListTable, ModalOpener, Button, Modal, PharmacyOrderForm },

    data: () => {
        return {
            pharmacyId: null,
            dermatologistSearchName: null,
            pharmacistSearchName: null
        }
    },
    computed: {
        ...mapGetters({
            pharmacy: 'pharmacies/getPharmacy',
            pharmacyResult: 'pharmacies/getResult',
            pharmacists: 'pharmacist/getPharmacists',
            pharmacistResult: 'pharmacist/getResult',
            dermatologists: 'dermatologist/getDermatologists',
            dermatologistResult: 'dermatologist/getResult',
            dermatologistAppointments: 'appointments/getDermatologistAppointments',
            appointmentsResult: 'appointments/getResult',
            medicines: 'medicines/getMedicines'
        }),
    },
    watch: {
        dermatologistResult({label, ok, message}) {
            if(label === 'removeFromPharmacy') {
                if(ok) {
                    toastr.success(message);
                } else {
                    toastr.error(message);
                }
                this.dermatologistSearchName ? 
                    this.handleSearchDermatologists(this.dermatologistSearchName)
                    :
                    this.fetchPharmacyDermatologists(this.pharmacyId);
            }
        },
        pharmacistResult({label}) {
            if(label === 'delete' || label === 'add') {
                this.pharmacistSearchName ? 
                    this.handleSearchPharmacists(this.pharmacistSearchName)
                    :
                    this.fetchPharmacyPharmacists(this.pharmacyId);
            }
        },
        pharmacyResult({ok, label, message}) {
            if(label === 'update' && ok) {
                this.fetchPharmacy(this.pharmacyId);
            }
            if((label === 'addMedicineToPharmacy' || label === 'removeMedicineFromPharmacy') && ok) {
                this.pharmacyMedicineSearchName ? 
                    this.searchPharmacyMedicinesInStock({pharmacyId: this.pharmacyId, name: this.pharmacyMedicineSearchName})
                    :
                    this.fetchPharmacyMedicinesInStock(this.pharmacyId);
            }
        },
        appointmentsResult({ok, label}){
            if(label==='reserveAppointment' && ok) {
                this.fetchDermatologistAppointments(this.pharmacyId);
            }
        }
    },
    methods: {
        ...mapActions({
            fetchPharmacy: 'pharmacies/fetchPharmacyById',
            fetchPharmacyPharmacists: 'pharmacist/fetchPharmacyPharmacists',
            searchPharmacyPharmacists: 'pharmacist/searchPharmacyPharmacistsByName',
            fetchPharmacyDermatologists: 'dermatologist/fetchPharmacyDermatologists',
            searchPharmacyDermatologists: 'dermatologist/searchPharmacyDermatologistsByName',
            fetchDermatologistAppointments: 'appointments/fetchDermatologistAppointmentsInPharmacy',
            fetchPharmacyMedicinesInStock: 'medicines/fetchPharmacyMedicinesInStock',
            searchPharmacyMedicinesInStock: 'medicines/searchPharmacyMedicinesInStock',
        }),
        handleSearchPharmacists(name) {
            this.pharmacistSearchName = name;
            this.searchPharmacyPharmacists({pharmacyId: this.pharmacyId, name});
        },
        handleSearchDermatologists(name) {
            this.dermatologistSearchName = name;
            this.searchPharmacyDermatologists({pharmacyId: this.pharmacyId, name});
        },
        handleSearchPharmacyMedicines(name) {
            this.pharmacyMedicineSearchName = name;
            this.searchPharmacyMedicinesInStock({pharmacyId: this.pharmacyId, name});
        }
    },
    mounted() {
        this.pharmacyId = this.$route.params.id;
        this.fetchPharmacy(this.pharmacyId);
        this.fetchPharmacyPharmacists(this.pharmacyId);
        this.fetchPharmacyDermatologists(this.pharmacyId);
        this.fetchDermatologistAppointments(this.pharmacyId);
        this.fetchPharmacyMedicinesInStock(this.pharmacyId);
    }
}
</script>
