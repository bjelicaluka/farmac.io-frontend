<template>
  <div>
    <Table>
        <TableHead :columnNames="['Medical Staff', 'Reserved', 'Date', 'Time', 'Duration', '']"></TableHead>
        <TableBody>
          <TableRow 
            v-for="a in appointments" 
            :key="a.id" 
            :values="[`${a.medicalStaff.firstName} ${a.medicalStaff.lastName}`, a.isReserved, formatDate(a.dateTime), formatTime(a.dateTime), formatDuration(a.duration)]"
          >
            <div class="pull-right text-gray">
              <drop-down-menu>
                <modal-opener :modalBoxId="'appointmentModal'">
                  <drop-down-item @click="handleDeleteClick(a)">Delete</drop-down-item>
                </modal-opener>
              </drop-down-menu>
            </div>
          </TableRow>
        </TableBody>
    </Table>

    <Modal
      modalBoxId="appointmentModal"
      title="Appointment"
      sizeClass="modal-lg"
    >
      <div slot="body">
        JIK
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
import {mapGetters} from 'vuex'
import toastr from 'toastr'
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
  },
  props: ['appointments', 'pharmacyId'],
  data() {
    return {
      selectedAppointment: null,
    }
  },
  computed: {
    ...mapGetters({
      result: 'appointments/getResult'
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
    handleDeleteClick(appointment) {
      this.selectedAppointment = appointment;
    },
    formatDate(d) {
      return moment(d).format('ll');
    },
    formatTime(d) {
      return moment(d).format('LT');
    },
    formatDuration(min) {
      return moment.utc(moment.duration(min, "minutes").asMilliseconds()).format("HH:mm")
    }
  },
}
</script>


<style>

</style>