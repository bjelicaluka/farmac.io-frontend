<template>
  <div>
    <ModalOpener modalBoxId="dermatologistModal" v-if="user.role === Roles.PharmacyAdmin && isAdminOfPharmacy || user.role === Roles.SystemAdmin">
      <Button @click="handleRegisterClick" class="pull-right">Register dermatologist</Button>
    </ModalOpener>

    <div class="row pl-4 pr-4" v-if="searchField">
      <Search @search="handleSearch($event)" />
    </div>
    <Table>
        <TableHead :columnNames="['Username', 'Name', 'Email', 'PID', 'Phone', 'Grade', 'Address', '']"></TableHead>
        <TableBody>
          <TableRow 
            v-for="d in dermatologists" 
            :key="d.id" 
            :values="getTableRow(d)"
          >
            <div class="pull-right text-gray" v-if="(user.role === Roles.PharmacyAdmin && isAdminOfPharmacy) || user.role === Roles.SystemAdmin">
              <drop-down-menu>
                <modal-opener
                  v-if="user.role === Roles.PharmacyAdmin && !dermatologistWorksForPharmacy(d)"
                  :modalBoxId="'addDermatologistToPharmacyModal'"
                >
                  <drop-down-item @click="handleAddToPharmacyClick(d.dermatologistAccount)">Add to Pharmacy</drop-down-item>
                </modal-opener>
                <modal-opener
                  v-if="user.role === Roles.PharmacyAdmin && dermatologistWorksForPharmacy(d)"
                  :modalBoxId="'removeDermatologistFromPharmacyModal'"
                >
                  <drop-down-item @click="handleRemoveFromPharmacyClick(d.dermatologistAccount)">Remove from Pharmacy</drop-down-item>
                </modal-opener>
                <modal-opener
                  v-if="user.role === Roles.PharmacyAdmin && dermatologistWorksForPharmacy(d)"
                  :modalBoxId="'defineDermatologistAppointmentModal'"
                >
                  <drop-down-item @click="handleDefineAppointmentClick(d.dermatologistAccount)">Define Appointment</drop-down-item>
                </modal-opener>
                <modal-opener
                  :modalBoxId="'dermatologistModal'"
                  v-if="user.role === Roles.SystemAdmin"
                >
                  <drop-down-item @click="handleEditClick(d.dermatologistAccount)">Edit</drop-down-item>
                </modal-opener>
                <modal-opener
                  :modalBoxId="'deleteDermatologistModal'"
                  v-if="user.role === Roles.SystemAdmin"
                >
                  <drop-down-item @click="handleDeleteClick(d.dermatologistAccount)">Delete</drop-down-item>
                </modal-opener>
              </drop-down-menu>
            </div>
          </TableRow>
          <Pagination v-if="pagination" @pageChange="$emit('pageChange', $event)" />
        </TableBody>
    </Table>
  
    <Modal
      title="Dermatologist"
      modalBoxId="dermatologistModal"
      sizeClass="modal-lg"
      >
        <div slot="body">
          <DermatologistForm
            :isEdit="isEdit"
            :existingAccount="selectedDermatologist"
            :existingUser="selectedDermatologist && selectedDermatologist.user"
          />
        </div>
      </Modal>
    <Modal

      v-if="user.role === Roles.PharmacyAdmin"
      modalBoxId="addDermatologistToPharmacyModal"
      title="Add Dermatologist To Pharmacy"
    >
      <div slot="body">
        <DermatologistPharmacyForm :dermatologist="selectedDermatologist" :pharmacyId="adminPharmacyId" />
      </div>
    </Modal>

    <Modal
      v-if="user.role === Roles.PharmacyAdmin"
      modalBoxId="defineDermatologistAppointmentModal"
      title="Define Dermatologist Appointment"
    >
      <div slot="body">
        <DefineAppointmentForm :dermatologistId="selectedDermatologist && selectedDermatologist.userId" :pharmacyId="adminPharmacyId" />
      </div>
    </Modal>

    <Modal
      v-if="user.role === Roles.PharmacyAdmin"
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
      <Modal
        modalBoxId="deleteDermatologistModal"
        title="Delete Dermatologist"
      >
        <div slot="body">
          <p v-if="selectedDermatologist">Are you sure that you want to delete dermatologist {{selectedDermatologist.user.firstName}} {{selectedDermatologist.user.lastName}}?</p>
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
import OptionModalButtons from '../Modal/OptionModalButtons.vue'
import {mapActions, mapGetters} from 'vuex'
import Search from '../Search/Search.vue'
import DermatologistForm from '../Forms/DermatologistForm.vue'
import DermatologistPharmacyForm from '../Forms/DermatologistPharmacyForm.vue'
import Button from '../Form/Button'
import {Roles} from '../../constants';
import DefineAppointmentForm from '../Forms/DefineAppointmentForm';
import toastr from 'toastr'
import { getAccountIdFromToken, getRoleFromToken } from '../../utils/token'
import Pagination from '../Table/Pagination.vue'

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
    DermatologistForm,
    DermatologistPharmacyForm,
    DefineAppointmentForm,
    Button,
    Pagination
  },
  props: {
    dermatologists: {},
    isAdminOfPharmacy: {
      default: false
    },
    adminPharmacyId: {},
    pagination: {
      default: false
    },
    searchField: {
      default: true
    }
  },
  data() {
    return {
      Roles,
      selectedDermatologist: null,
      isEdit: false,
      user: {},
      searchName: ''
    }
  },

  mounted() {
    this.user = {
      id: getAccountIdFromToken(),
      role: getRoleFromToken()
    }
  },

  computed: {
    ...mapGetters({result: 'dermatologist/getResult'})
  },
  watch: {
    result({message, ok, label}) {
      if(label === 'delete') {
        if(ok) {
          toastr.success(message);
        } else {
          toastr.error(message);
        }
      }
    }
  },

  methods: {
    ...mapActions({
      deleteDermatologist: 'dermatologist/deleteDermatologist',
      removeDermatologistFromPharmacy: 'dermatologist/removeDermatologistFromPharmacy',
    }),
    handleRegisterClick() {
      this.isEdit = false;
      this.selectedDermatologist = null;
    },
    getTableRow(dermatologistWorkPlaces) {
      const d = dermatologistWorkPlaces.dermatologistAccount;
      return [d.username, `${d.user.firstName} ${d.user.lastName}`, d.email, d.user.pid, d.user.phoneNumber, parseFloat(d.user?.averageGrade).toFixed(2) + ' / 5.0', this.formatAddress(d.user.address)];
    },
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
    handleDefineAppointmentClick(dermatologist) {
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
        this.removeDermatologistFromPharmacy({pharmacyId: this.adminPharmacyId, dermatologistId: this.selectedDermatologist.id});
      }
    },
    dermatologistWorksForPharmacy(dermatologistWorkPlaces) {
      return !!dermatologistWorkPlaces.workPlaces.find(wp => wp.pharmacy.id === this.adminPharmacyId);
    }
  },
}
</script>


<style>

</style>