<template>
  <div>
    <div class="row pl-4 pr-4">
      <Search @search="handleSearch($event)" />
    </div>
    <Table>
        <TableHead :columnNames="['Username', 'Name', 'Email', 'PID', 'Phone', 'Address', '']"></TableHead>
        <TableBody>
        <TableRow 
          v-for="d in dermatologists" 
          :key="d.id" 
          :values="[d.username, `${d.user.firstName} ${d.user.lastName}`, d.email, d.user.did, d.user.dhoneNumber, formatAddress(d.user.address)]"
        >
          <div class="pull-right text-gray">
            <drop-down-menu>
              <modal-opener
                v-if="role === Roles.PharmacyAdmin && !dermatologistWorksForPharmacy(d)"
                :modalBoxId="'addDermatologistToPharmacyModal'"
              >
                <drop-down-item @click="handleAddToPharmacyClick(d)">Add to Pharmacy</drop-down-item>
              </modal-opener>
              <modal-opener
                v-if="role === Roles.PharmacyAdmin && dermatologistWorksForPharmacy(d)"
                :modalBoxId="'removeDermatologistFromPharmacyModal'"
              >
                <drop-down-item @click="handleRemoveFromPharmacyClick(d)">Remove from Pharmacy</drop-down-item>
              </modal-opener>
              <modal-opener :modalBoxId="'dermatologistModal'">
                <drop-down-item @click="handleEditClick(d)">Edit</drop-down-item>
              </modal-opener>
              <modal-opener :modalBoxId="'deleteDermatologistModal'">
                <drop-down-item @click="handleDeleteClick(d)">Delete</drop-down-item>
              </modal-opener>
            </drop-down-menu>
          </div>
        </TableRow>
        </TableBody>
    </Table>

    <Modal
      v-if="role === Roles.PharmacyAdmin"
      modalBoxId="addDermatologistToPharmacyModal"
      title="Add Dermatologist To Pharmacy"
    >
      <div slot="body">
        <DermatologistPharmacyForm :dermatologist="selectedDermatologist" :pharmacyId="pharmacyId" />
      </div>
    </Modal>

    <Modal
      v-if="role === Roles.PharmacyAdmin"
      modalBoxId="removeDermatologistFromPharmacyModal"
      title="Remove Dermatologist From Pharmacy"
    >
      <div slot="body">
        <p v-if="selectedDermatologist">Are you sure that you want to remove dermatologist {{selectedDermatologist.user.firstName}} {{selectedDermatologist.user.lastName}} from your pharmacy?</p>
      </div>

      <div slot="buttons">
        <OptionModalButtons @yes="onRemoveFromPharmacySubmit"/>
      </div>
    </Modal>
  </div>
</template>

<script>
import Table from '../Table/Table'
import TableHead from '../Table/TableHead'
import TableBody from '../Table/TableBody'
import TableRow from '../Table/TableRow'
import DropDownMenu from '../DropdownMenu/DropdownMenu'
import DropDownItem from '../DropdownMenu/DropdownItem'
import ModalOpener from '../Modal/ModalOpener.vue'
import Modal from '../Modal/Modal.vue'
import OptionModalButtons from '../Modal/OptionModalButtons.vue'
import {mapActions, mapGetters} from 'vuex'
import Search from '../Search/Search.vue'
import DermatologistPharmacyForm from '../Forms/DermatologistPharmacyForm.vue'
import {Roles} from '../../constants';

export default {
  components: {
    Table,
    TableBody,
    TableRow,
    TableHead,
    DropDownItem,
    DropDownMenu,
    ModalOpener,
    Modal,
    OptionModalButtons,
    Search,
    DermatologistPharmacyForm,
  },
  props: ['dermatologists', 'pharmacyId'],
  data() {
    return {
      Roles,
      role: 'PharmacyAdmin',
      selectedDermatologist: null,
      isEdit: false,
      searchName: ''
    }
  },
  methods: {
    ...mapActions({
      deleteDermatologist: 'dermatologist/deleteDermatologist',
      removeDermatologistFromPharmacy: 'dermatologist/removeDermatologistFromPharmacy',
    }),
    formatAddress(address) {
      const {state, city, streetName, streetNumber} = address;
      return `${state}, ${city}, ${streetName} - ${streetNumber}`
    },
    handleSearch(value) {
      this.$emit('search', value);
    },
    handleAddToPharmacyClick(dermatologist) {
      this.selectedDermatologist = dermatologist;
    },
    handleRemoveFromPharmacyClick(dermatologist) {
      this.selectedDermatologist = dermatologist;
    },
    handleEditClick(dermatologist) {
      this.isEdit = true;
      this.selectedDermatologist = dermatologist;
    },
    handleDeleteClick(dermatologist) {
      this.selectedDermatologist = dermatologist;
    },
    onDeleteSubmit() {
      if(this.selectedDermatologist) {
        this.deleteDermatologist(this.selectedDermatologist.id);
      }
    },
    onRemoveFromPharmacySubmit() {
      if(this.selectedDermatologist) {
        this.removeDermatologistFromPharmacy({pharmacyId: this.pharmacyId, dermatologistId: this.selectedDermatologist.id});
      }
    },
    dermatologistWorksForPharmacy(d) {
      return !!d.user.workPlaces.find(wp => wp.pharmacy.id === this.pharmacyId);
    }
  },
}
</script>


<style>

</style>