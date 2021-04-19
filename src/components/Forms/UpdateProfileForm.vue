<template>
    <div>
        <component
            :is="formComponent"
            :isEdit=true
            :existingAccount="userAccount"
            :existingUser="userAccount && userAccount.user"
            :reactOnAction=false
        />
    </div>
</template>

<script>

import PatientForm from '../Forms/PatientForm'
import SystemAdminForm from '../Forms/SystemAdminForm'
import DermatologistForm from '../Forms/DermatologistForm'
import PharmacistForm from '../Forms/PharmacistForm'
import PharmacyAdminForm from '../Forms/PharmacyAdminForm'
import SupplierForm from '../Forms/SupplierForm'
import { getAccountIdFromToken, getRoleFromToken } from '../../utils/token'
import { Roles } from '../../constants'
import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'

const getters = {
    getPatient: 'patient/getPatient',
    getSystemAdmin: 'systemAdmins/getSystemAdmin',
    getDermatologist: 'dermatologist/getDermatologist',
    getPharmacist: 'pharmacist/getPharmacist',
    getPharmacyAdmin: 'pharmacyAdmins/getPharmacyAdmin',
    getSupplier: 'suppliers/getSupplier',
    getPatientResult: 'patient/getResult',
    getSystemAdminResult: 'systemAdmins/getResult',
    getDermatologistResult: 'dermatologist/getResult',
    getPharmacistResult: 'pharmacist/getResult',
    getPharmacyAdminResult: 'pharmacyAdmins/getResult',
    getSupplierResult: 'suppliers/getResult'
};

export default {

    components: {
        PatientForm,
        SystemAdminForm,
        DermatologistForm,
        PharmacistForm,
        PharmacyAdminForm,
        SupplierForm
    },

    data: function() {
        return {
            role: null,
            roles: Roles,
            userAccount: null,
            formComponent: ''
        }
    },

    computed: {
        ...mapGetters({
            ...getters
        }),
    },

    watch: {
        getPatient(patient) {
            this.userAccount = patient;
        },

        getSystemAdmin(systemAdmin) {
            this.userAccount = systemAdmin;
        },

        getDermatologist(dermatologist) {
            this.userAccount = dermatologist;
        },

        getPharmacist(pharmacist) {
            this.userAccount = pharmacist;
        },

        getPharmacyAdmin(pharmacyAdmin) {
            this.userAccount = pharmacyAdmin;
        },

        getSupplier(supplier) {
            this.userAccount = supplier
        },

        getPatientResult: function({ok, label, message}) {
            this.handleUpdateMessage(ok, label, message);
        },

        getSystemAdminResult: function({ok, label, message}) {
            this.handleUpdateMessage(ok, label, message);
        },

        getDermatologistResult: function({ok, label, message}) {
            this.handleUpdateMessage(ok, label, message);
        },

        getPharmacistResult: function({ok, label, message}) {
            this.handleUpdateMessage(ok, label, message);
        },

        getPharmacyAdminResult: function({ok, label, message}) {
            this.handleUpdateMessage(ok, label, message);
        },

        getSupplierResult: function({ok, label, message}) {
            this.handleUpdateMessage(ok, label, message);
        }
    },

    methods: {
        ...mapActions({
            fetchPatient: 'patient/fetchPatientById',
            fetchSystemAdmin: 'systemAdmins/fetchSystemAdminById',
            fetchDermatologist: 'dermatologist/fetchDermatologistById',
            fetchPharmacist: 'pharmacist/fetchPharmacistById',
            fetchPharmacyAdmin: 'pharmacyAdmins/fetchPharmacyAdminById',
            fetchSupplier: 'suppliers/fetchSupplierById'
        }),

        handleUpdateMessage(ok, label, message) {
            if(label != 'update')
                return;

            if(ok) {
                toastr.success(`You have successfully updated your profile.`);
            } else {
                toastr.error(message);
            }
        },

        getFetchMethod(role) {
            const fetchActions = {
                Patient: this.fetchPatient,
                SystemAdmin: this.fetchSystemAdmin,
                Dermatologist: this.fetchDermatologist,
                Pharmacist: this.fetchPharmacist,
                PharmacyAdmin: this.fetchPharmacyAdmin,
                Supplier: this.fetchSupplier
            };

            return fetchActions[role]
        }
    },

    mounted() {
        
        this.role = getRoleFromToken();
        this.formComponent = `${this.role}Form`;
        const fetchMethod = this.getFetchMethod(this.role);
        fetchMethod(getAccountIdFromToken());
    }

}
</script>