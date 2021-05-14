<template>
    <div class="content">
        <PharmacyPromotionCard :pharmacyId="pharmacyId" v-if="user && (!user.role || user.role === roles.Patient)" />
        <div class="container-fluid">
            <Card :title="pharmacy && pharmacy.name" :description="pharmacy && pharmacy.description">
                <div v-if="user && user.role === roles.Patient"> 
                    <div v-if="!isFollowing">
                        <FollowPharmacyModal modalBoxId="confirmFollowModal" :pharmacyName="pharmacy && pharmacy.name" @yes="handleFollow" />

                        <ModalOpener modalBoxId="confirmFollowModal">
                            <ButtonWithIcon type="button" className="btn btn-round btn-primary" iconName="bookmark_add">Follow</ButtonWithIcon>
                        </ModalOpener>
                    </div>
                    <div v-else>
                        <UnfollowPharmacyModal modalBoxId="confirmUnfollowModal" :pharmacyName="pharmacy && pharmacy.name" @yes="handleUnfollow" />

                        <ModalOpener modalBoxId="confirmUnfollowModal">
                            <ButtonWithIcon type="button" className="btn btn-round btn-primary" iconName="bookmark_remove">Unfollow</ButtonWithIcon>
                        </ModalOpener>
                    </div>
                </div>

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
            <Card title='Medicine Orders' :description="`Medicine orders for ${pharmacy && pharmacy.name} pharmacy.`" v-if="user.role === roles.PharmacyAdmin || user.role === roles.Supplier">
                <PharmacyOrdersTable :pharmacyOrders="pharmacyOrders" :pharmacyId="pharmacyId" @filter="pharmacyOrderProcessedFilter = $event" />
            </Card>
            <Card title='Promotions' :description="`Promotions for ${pharmacy && pharmacy.name} pharmacy.`" v-if="user.role === roles.PharmacyAdmin">
                <PharmacyPromotionsTable :pharmacyPromotions="pharmacyPromotions" :pharmacyId="pharmacyId" />
            </Card>
            <Card title='Absence Requests' :description="`Absence Requests for ${pharmacy && pharmacy.name} pharmacy.`" v-if="user.role === roles.PharmacyAdmin">
                <AbsenceRequestsTable :absenceRequests="absenceRequests" />
            </Card>
            <Card title='Not In Stock Records' :description="`Not In Stock Records for ${pharmacy && pharmacy.name} pharmacy.`" v-if="user.role === roles.PharmacyAdmin">
                <NotInStockRecordsTable :notInStockRecords="notInStockRecords" />
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
import PharmacyOrdersTable from '../components/Tables/PharmacyOrdersTable.vue';
import ButtonWithIcon from '../components/Form/ButtonWithIcon'
import FollowPharmacyModal from '../components/Modals/FollowPharmacyModal'
import UnfollowPharmacyModal from '../components/Modals/UnfollowPharmacyModal'
import ModalOpener from '../components/Modal/ModalOpener'

import { getRoleFromToken, getUserIdFromToken, getAccountIdFromToken } from '../utils/token'
import { Roles } from '../constants'
import { applyDiscount } from '../utils/discount'
import PharmacyPromotionsTable from '../components/Tables/PharmacyPromotionsTable.vue';
import AbsenceRequestsTable from '../components/Tables/AbsenceRequestsTable.vue';
import NotInStockRecordsTable from '../components/Tables/NotInStockRecordsTable.vue';
import PharmacyPromotionCard from '../components/Card/PharmacyPromotionCard.vue';


export default {
     components: {
        PharmacistsTable,
        Card,
        DermatologistsTable,
        PharmacyInfo,
        AppointmentsTable,
        MedicineListTable,
        ButtonWithIcon,
        FollowPharmacyModal,
        UnfollowPharmacyModal,
        ModalOpener,
        PharmacyOrdersTable,
        PharmacyPromotionsTable,
        AbsenceRequestsTable,
        NotInStockRecordsTable,
          PharmacyPromotionCard
    },

    data: () => {
        return {
            pharmacyId: null,
            user: {},
            dermatologistAppointments: [],
            dermatologistSearchName: null,
            pharmacistSearchName: null,
            isPharmacyOrderEdit: false,
            pharmacyOrderProcessedFilter: false,
            roles: Roles
        }
    },
    computed: {
        ...mapGetters({
            pharmacy: 'pharmacies/getPharmacy',
            pharmacyResult: 'pharmacies/getResult',
            pharmacists: 'pharmacist/getPharmacists',
            pharmacistResult: 'pharmacist/getResult',
            pharmacyOrdersResult: 'pharmacyOrders/getResult',
            pharmacyPromotionsResult: 'pharmacyPromotions/getResult',
            absenceRequests: 'medicalStaff/getAbsenceRequests',
            notInStockRecords: 'notInStockRecords/getNotInStockRecords',

            dermatologists: 'dermatologist/getDermatologists',
            dermatologistResult: 'dermatologist/getResult',
            getDermatologistAppointments: 'appointments/getDermatologistAppointments',
            appointmentsResult: 'appointments/getResult',
            medicines: 'medicines/getMedicines',
            pharmacyOrders: 'pharmacyOrders/getPharmacyOrders',
            pharmacyPromotions: 'pharmacyPromotions/getPharmacyPromotions',
            pharmacyOrder: 'pharmacyOrders/getPharmacyOrder',
            followingResult: 'followings/getResult',
            isFollowing: 'followings/isFollowing',
            absenceRequestResult: 'medicalStaff/getResult',
            notInStockRecordResult: 'notInStockRecords/getResult',
            discount: 'loyaltyPrograms/getDiscount'
        })
    },
    watch: {
        getDermatologistAppointments(dermatologistAppointments) {
            dermatologistAppointments.forEach(da => da.isReserved ? da.price : da.price = parseFloat(applyDiscount(da.price, this.discount).toFixed(2)));
            this.dermatologistAppointments = dermatologistAppointments;
        },

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
        pharmacyOrdersResult({ok, label}){
            if(label === 'add' || label === 'update') {
                ok && this.filterPharmacyOrders({pharmacyId: this.pharmacyId});
            }
        },
        pharmacyPromotionsResult({ok, label}){
            if(['add', 'update', 'delete'].find(l => l === label)) {
                ok && this.fetchPharmacyPromotions(this.pharmacyId);
            }
        },
        pharmacyOrderProcessedFilter() {
            this.filterPharmacyOrders({pharmacyId: this.pharmacyId, isProcessed: this.pharmacyOrderProcessedFilter});
        },
        followingResult({label, ok, message}) {
            if(label !== 'follow' && label !== 'unfollow')
                 return;
            
            if(ok) {
                this.fetchPatientFollowings(this.user.id);
                toastr.success(message);
            } else {
                toastr.error(message);
            }
        },

        absenceRequestResult({label}) {
            if(label === 'acceptAbsenceRequest' || label === 'declineAbsenceRequest') {
                this.fetchAbsenceRequestsForPharmacy(this.pharmacyId);
            }
        },

        notInStockRecordResult({label, ok, message}) {
            if(label === 'markSeen') {
                this.fetchNotInStockRecordsForPharmacy(this.pharmacyId);
            }
        },

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
            filterPharmacyOrders: 'pharmacyOrders/filterPharmacyOrders',
            fetchPharmacyPromotions: 'pharmacyPromotions/fetchPharmacyPromotions',
            fetchAbsenceRequestsForPharmacy: 'medicalStaff/fetchAbsenceRequestsForPharmacy',
            fetchNotInStockRecordsForPharmacy: 'notInStockRecords/fetchNotInStockRecordsForPharmacy',
            fetchPatientFollowings: 'followings/fetchPatientFollowings',
            followPharmacy: 'followings/followPharmacy',
            unfollowPharmacy: 'followings/unfollowPharmacy',
            setCurrentPharmacy: 'followings/setCurrentPharmacy',
            fetchDiscountForPatient: 'loyaltyPrograms/fetchDiscountForPatient'
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
        },

        handleUnfollow() {
            this.unfollowPharmacy({
                patientId: this.user.id,
                pharmacyId: this.pharmacyId
            })
        }
    },
    mounted() {
        
        this.pharmacyId = this.$route.params.id;
        this.user = {
            id: getAccountIdFromToken(),
            userId: getUserIdFromToken(),
            role: getRoleFromToken()
        }

        if(this.user.role === Roles.Patient) {
            this.fetchDiscountForPatient(this.user.userId);
            this.fetchPatientFollowings(this.user.id);
            this.setCurrentPharmacy(this.pharmacyId);
        }

        this.fetchPharmacy(this.pharmacyId);
        this.fetchPharmacyPharmacists(this.pharmacyId);
        this.fetchPharmacyDermatologists(this.pharmacyId);
        this.fetchDermatologistAppointments(this.pharmacyId);
        this.fetchPharmacyMedicinesInStock(this.pharmacyId);
        this.filterPharmacyOrders({pharmacyId: this.pharmacyId});
        this.fetchPharmacyPromotions(this.pharmacyId);
        this.fetchAbsenceRequestsForPharmacy(this.pharmacyId);
        this.fetchNotInStockRecordsForPharmacy(this.pharmacyId);
    }
}
</script>
