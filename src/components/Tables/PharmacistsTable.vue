<template>
  <div>
    <ModalOpener
      modalBoxId="pharmacistModal"
      v-if="user.role === Roles.PharmacyAdmin && isAdminOfPharmacy"
    >
      <Button @click="handleRegisterClick" class="pull-right">Register Pharmacist</Button>
    </ModalOpener>
    
    <div class="row pl-4 pr-4" v-if="searchField">
      <Search @search="handleSearch($event)" />
    </div>
    <Table>
        <TableHead :columnNames="['Username', 'Name', 'Email', 'PID', 'Phone', 'Grade', 'Work Time', '']"></TableHead>
        <TableBody>
          <TableRow 
            v-for="p in pharmacists" 
            :key="p.id" 
            :values=getRow(p)
          >
            <div class="pull-right text-gray">
              <drop-down-menu v-if="user.role === Roles.PharmacyAdmin && (adminPharmacyId === p.user.pharmacyId || isAdminOfPharmacy)">
                <modal-opener :modalBoxId="'pharmacistModal'">
                  <drop-down-item @click="handleEditClick(p)">Edit</drop-down-item>
                </modal-opener>
                <modal-opener :modalBoxId="'deletePharmacistModal'">
                  <drop-down-item @click="handleDeleteClick(p)">Delete</drop-down-item>
                </modal-opener>
              </drop-down-menu>
            </div>
          </TableRow>
          <Pagination v-if="pagination" @pageChange="$emit('pageChange', $event)" />
        </TableBody>
    </Table>

    <Modal
      modalBoxId="pharmacistModal"
      title="Pharmacist"
      sizeClass="modal-lg"
      v-if="user.role === Roles.PharmacyAdmin"
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
      v-if="user.role === Roles.PharmacyAdmin"
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
import { getAccountIdFromToken, getRoleFromToken } from '../../utils/token'
import { Roles } from '../../constants'
import Pagination from '../Table/Pagination.vue'
import moment from 'moment'

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
    Search,
    Pagination
  },
  props: {
    pharmacists: {},
    adminPharmacyId: {},
    pagination: {
      default: false
    },
    searchField: {
      default: true
    },
    isAdminOfPharmacy: {
      default: false
    }
  },
  data() {
    return {
      selectedPharmacist: null,
      user: {},
      Roles,
      isEdit: false,
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
    },
    getRow(p) {
      return [
        p.username,
        `${p.user.firstName} ${p.user.lastName}`,
        p.email, p.user.pid, p.user.phoneNumber,
        parseFloat(p.user.averageGrade).toFixed(2) + ' / 5.00',
        moment(p.user.workTime?.from).format('H:mm') + ' - ' + moment(p.user.workTime?.to).format('H:mm')
      ]
    }
  },
}
</script>


<style>

</style>