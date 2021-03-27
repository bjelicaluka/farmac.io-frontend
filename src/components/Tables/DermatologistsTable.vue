<template>
  <div>
    <div class="row pl-4 pr-4">
      <Search @search="handleSearch($event)" />
    </div>
    <Table>
        <TableHead :columnNames="['Username', 'Name', 'Email', 'PID', 'Phone', 'Address', '']"></TableHead>
        <TableBody>
        <TableRow 
          v-for="p in dermatologists" 
          :key="p.id" 
          :values="[p.username, `${p.user.firstName} ${p.user.lastName}`, p.email, p.user.pid, p.user.phoneNumber, formatAddress(p.user.address)]"
        >
          <div class="pull-right text-gray">
            <drop-down-menu>
              <modal-opener :modalBoxId="'dermatologistModal'">
                <drop-down-item @click="handleEditClick(p)">Edit</drop-down-item>
              </modal-opener>
              <modal-opener :modalBoxId="'deleteDermatologistModal'">
                <drop-down-item @click="handleDeleteClick(p)">Delete</drop-down-item>
              </modal-opener>
            </drop-down-menu>
          </div>
        </TableRow>
        </TableBody>
    </Table>

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
import {mapActions} from 'vuex'
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
    OptionModalButtons,
    Search,
  },
  props: ['dermatologists'],
  data() {
    return {
      selectedDermatologist: null,
      isEdit: false,
      searchName: ''
    }
  },
  methods: {
    ...mapActions({
      deleteDermatologist: 'dermatologist/deleteDermatologist'
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
      this.selectedDermatologist = null;
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
    }
  },
}
</script>


<style>

</style>