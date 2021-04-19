<template>
  <div>
    <ModalOpener modalBoxId="pharmacistModal">
      <Button @click="handleRegisterClick" class="pull-right">Register Pharmacist</Button>
    </ModalOpener>
    
    <div class="row pl-4 pr-4" v-if="searchField">
      <Search @search="handleSearch($event)" />
    </div>
    <Table>
        <TableHead :columnNames="['Username', 'Name', 'Email', 'PID', 'Phone', 'Address', '']"></TableHead>
        <TableBody>
        <TableRow 
          v-for="p in pharmacists" 
          :key="p.id" 
          :values="[p.username, `${p.user.firstName} ${p.user.lastName}`, p.email, p.user.pid, p.user.phoneNumber, formatAddress(p.user.address)]"
        >
          <div class="pull-right text-gray">
            <drop-down-menu>
              <modal-opener :modalBoxId="'pharmacistModal'">
                <drop-down-item @click="handleEditClick(p)">Edit</drop-down-item>
              </modal-opener>
              <modal-opener :modalBoxId="'deletePharmacistModal'">
                <drop-down-item @click="handleDeleteClick(p)">Delete</drop-down-item>
              </modal-opener>
            </drop-down-menu>
          </div>
        </TableRow>
        </TableBody>
    </Table>

    <Modal
      modalBoxId="pharmacistModal"
      title="Pharmacist"
      sizeClass="modal-lg"
    >
      <div slot="body">
        <PharmacistForm
          :isEdit="isEdit"
          :existingAccount="selectedPharmacist"
          :existingUser="selectedPharmacist && selectedPharmacist.user"
          :pharmacyId="adminPharmacyId"
        />
      </div>
    </Modal>
    <Modal
      modalBoxId="deletePharmacistModal"
      title="Delete Pharmacist"
    >
      <div slot="body">
        <p v-if="selectedPharmacist">Are you sure that you want to delete pharmacist {{selectedPharmacist.user.firstName}} {{selectedPharmacist.user.lastName}}?</p>
      </div>

      <div slot="buttons">
        <OptionModalButtons @yes="onDeleteSubmit"/>
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
import PharmacistForm from '../Forms/PharmacistForm.vue'
import OptionModalButtons from '../Modal/OptionModalButtons.vue'
import {mapActions, mapGetters} from 'vuex'
import Button from '../Form/Button.vue'
import toastr from 'toastr'
import Search from '../Search/Search.vue'

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
    PharmacistForm,
    OptionModalButtons,
    Button,
    Search
  },
  props: {
    pharmacists: {},
    adminPharmacyId: {},
    searchField: {
      default: true
    }
  },
  data() {
    return {
      selectedPharmacist: null,
      isEdit: false,
      searchName: ''
    }
  },
  computed: {
    ...mapGetters({
      result: 'pharmacist/getResult'
    })
  },
  watch: {
    result({label, ok, message}) {
      if(label === 'delete') {
        if(ok) {
          toastr.success(message);
        } else {
          toastr.error(message);
        }
      }
    },
  },
  methods: {
    ...mapActions({
      deletePharmacist: 'pharmacist/deletePharmacist'
    }),
    formatAddress(address) {
      const {state, city, streetName, streetNumber} = address;
      return `${state}, ${city}, ${streetName} - ${streetNumber}`
    },
    handleSearch(value) {
      this.$emit('search', value);
    },
    handleRegisterClick() {
      this.isEdit = false;
      this.selectedPharmacist = null;
    },
    handleEditClick(pharmacist) {
      this.isEdit = true;
      this.selectedPharmacist = pharmacist;
    },
    handleDeleteClick(pharmacist) {
      this.selectedPharmacist = pharmacist;
    },
    onDeleteSubmit() {
      if(this.selectedPharmacist) {
        this.deletePharmacist(this.selectedPharmacist.id);
      }
    }
  },
}
</script>


<style>

</style>