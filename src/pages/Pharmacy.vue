<template>
    <div class="content">
        <div class="container-fluid">
            <Card :title="pharmacy && pharmacy.name" :description="pharmacy && pharmacy.description">
                

                
                <Modal
                    title="Confirmation"
                    modalBoxId="confirmFollowModal"
                >
                    <div slot="body">
                    Are you sure that you want to follow {{pharmacy && pharmacy.name}}?
                    Following pharmacy means that you will get email notification every time there is a new promotion.
                    </div>
                    <div slot="buttons">
                        <OptionModalButtons @yes="handleFollow" />
                    </div>
                </Modal>

                <ModalOpener v-if="user && user.role === roles.Patient" modalBoxId="confirmFollowModal">
                    <ButtonWithIcon
                        type="button"
                        className="btn btn-round btn-primary"
                        iconName="favorite"
                    >
                        Follow
                    </ButtonWithIcon>
                </ModalOpener>


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
        </div> 
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
import ButtonWithIcon from '../components/Form/ButtonWithIcon'
import Modal from '../components/Modal/Modal'
import ModalOpener from '../components/Modal/ModalOpener'
import OptionModalButtons from '../components/Modal/OptionModalButtons'

import { getRoleFromToken, getAccountIdFromToken } from '../utils/token'
import { Roles } from '../constants'


export default {
     components: {
        PharmacistsTable,
        Card,
        DermatologistsTable,
        PharmacyInfo,
        AppointmentsTable,
        MedicineListTable,
        ButtonWithIcon,
        Modal,
        ModalOpener,
        OptionModalButtons
    },

    data: () => {
        return {
            pharmacyId: null,
            user: null,
            dermatologistSearchName: null,
            pharmacistSearchName: null,
            roles: Roles
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
            medicines: 'medicines/getMedicines',
            followingResult: 'followings/getResult'
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
        },

        followingResult({label, ok, message}) {
            if(label !== 'follow')
                 return;
            
            if(ok) {
                toastr.success(message);
            } else {
                toastr.error(message);
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
            followPharmacy: 'followings/followPharmacy'
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
        },

        handleFollow() {
            this.followPharmacy({
                patientId: this.user.id,
                pharmacyId: this.pharmacyId
            })
        }
    },
    mounted() {
        this.pharmacyId = this.$route.params.id;
        this.fetchPharmacy(this.pharmacyId);
        this.fetchPharmacyPharmacists(this.pharmacyId);
        this.fetchPharmacyDermatologists(this.pharmacyId);
        this.fetchDermatologistAppointments(this.pharmacyId);
        this.fetchPharmacyMedicinesInStock(this.pharmacyId);

        this.user = {
            id: getAccountIdFromToken(),
            role: getRoleFromToken()
        }
    }
}
</script>
