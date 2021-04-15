<template>
    <div class="content">
        <PharmacySearch />
        <Modal
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

            <Modal
                modalBoxId="pharmacyModal"
                title="Create Pharmacy"
            >
                <div slot="body">
                    <PharmacyForm />
                </div>
            </Modal>

            <ModalOpener modalBoxId="pharmacyModal">
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
            selectedPharmacyId: null
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
        deletePharmacy: 'pharmacies/deletePharmacy'
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
    }
  },

  mounted() {
      this.fetchPharmacies();
  }
}

</script>

<style>

</style>