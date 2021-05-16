<template>
    <div class="content">
        <PharmacySearch @search="handleSearch"/>

        <Modal
            v-if="role == roles.SystemAdmin"
            modalBoxId="deletePharmacyModal"
            title="Confirmation"
        >
            <div slot="body">
                <p>Are you sure that you want to delete {{this.selectedPharmacyName}} pharmacy?</p>
            </div>
            <div slot="buttons">
                <OptionModalButtons @yes="handleDelete">
                </OptionModalButtons>
            </div>
        </Modal>
        <ModalOpener id="deletePharmacyModalOpener" class="d-none" modalBoxId="deletePharmacyModal" />

        <div class="container-fluid">
            <div v-for="(pharmacy, index) in pharmacies" :key="index">
                <div class="row">
                    <div class="col-md-6 ml-auto mr-auto">
                        <PharmacyCard @onDeleteSelected="onDeleteSelected" :pharmacy="pharmacy" />
                    </div>
                </div>
            </div>
            <Button class="pull-right" @click="handleLoadMore">Load More</Button>

            <Modal
                v-if="role == roles.SystemAdmin"
                modalBoxId="pharmacyModal"
                title="Create Pharmacy"
            >
                <div slot="body">
                    <PharmacyForm />
                </div>
            </Modal>

            <ModalOpener v-if="role == roles.SystemAdmin" modalBoxId="pharmacyModal">
                <Button class="pull-right">Create Pharmacy</Button>
            </ModalOpener>
        </div>
    </div>
</template>

<script>

import Modal from '../components/Modal/Modal'
import ModalOpener from '../components/Modal/ModalOpener'
import OptionModalButtons from '../components/Modal/OptionModalButtons'
import PharmacyForm from '../components/Forms/PharmacyForm'
import PharmacyCard from '../components/Card/PharmacyCard'
import Button from '../components/Form/Button'
import PharmacySearch from '../components/Searchs/PharmacySearch'
import { mapGetters, mapActions } from 'vuex'
import toastr from 'toastr'

import { Roles } from '../constants'
import { getRoleFromToken } from '../utils/token'

export default {
    components: {
        Modal,
        ModalOpener,
        OptionModalButtons,
        PharmacyForm,
        PharmacyCard,
        Button,
        PharmacySearch
    },
    
   data: function() {
        return {
            selectedPharmacyName: '',
            selectedPharmacyId: null,
            role: null,
            roles: Roles,
            page: 1,
            searchParams: {
                name: '',
                city: '',
                sortCriteria: '',
                isAscending: true,
                gradeFrom: 0,
                gradeTo: 5,
                distanceFrom: 0,
                distanceTo: 9999,
                userLat: 200,
                userLon: 200
            }
        }
    },

   computed: {
        ...mapGetters({
            pharmacies: 'pharmacies/getPharmacies',
            result: 'pharmacies/getResult'
        })
    },

    watch: {
      result({label, ok, message}) {
        if(['add', 'update', 'delete'].indexOf(label) !== -1 && ok)
            this.fetchPharmacies();

        if(label !== 'delete')
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
        fetchPharmacies: 'pharmacies/fetchPharmacies',
        deletePharmacy: 'pharmacies/deletePharmacy',
        searchPharmacies: 'pharmacies/searchPharmacies'
    }),

    onDeleteSelected(e, id, name) {
        e.preventDefault();
        this.selectedPharmacyName = name;
        this.selectedPharmacyId = id;
        document.getElementById('deletePharmacyModalOpener').click();
    },

    handleDelete(e) {
        e.preventDefault();
        this.deletePharmacy(this.selectedPharmacyId);
    },

    handleLoadMore() {
        this.page++;
        this.searchPharmacies({ ...this.searchParams, page: this.page });
    },

    handleSearch(searchParams) {
        this.searchParams = searchParams;
        this.searchPharmacies({ ...this.searchParams, page: this.page });
    }
  },

  mounted() {
      this.role = getRoleFromToken();
      this.fetchPharmacies(this.page);
  }
}

</script>

<style>

</style>