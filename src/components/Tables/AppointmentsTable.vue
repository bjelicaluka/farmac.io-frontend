<template>
  <div>
    <FormRow>
      <div class="col-3">
        <SelectOptionInput
          label="Select sort criteria"
          v-model="selectedValue"
          :options="options"
        >
        </SelectOptionInput>
      </div>
    </FormRow>
    <Table>
        <TableHead :columnNames="['Medical Staff', 'Reserved', 'Date', 'Time', 'Duration', 'Price', '']"></TableHead>
        <TableBody>
          <TableRow 
            v-for="a in appointments" 
            :key="a.id" 
            :values="[`${a.medicalStaff.firstName} ${a.medicalStaff.lastName} (${a.medicalStaff.averageGrade})`, a.isReserved ? 'Yes' : 'No', formatDate(a.dateTime), formatTime(a.dateTime), formatDuration(a.duration), a.price]"
          >
            <div class="pull-right text-gray">
              <drop-down-menu>
                <modal-opener :modalBoxId="'appointmentModal'">
                  <drop-down-item @click="handleDeleteClick(a)">Delete</drop-down-item>
                </modal-opener>

                  <drop-down-item v-if="!a.isReserved" @click="handleMakeAppointmentClick(a)">Make appointment</drop-down-item>
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
import SelectOptionInput from '../Form/SelectOptionInput.vue'
import FormRow from '../Form/FormRow.vue'
import {mapGetters, mapActions} from 'vuex'
import toastr from 'toastr'
import moment from 'moment'

let selectOptions = [
  {
    value: 'grade-asc',
    label: 'Grade - Ascending'
  },
  {
    value: 'grade-desc',
    label: 'Grade - Descending'
  },
  {
    value: 'price-asc',
    label: 'Price - Ascending'
  },
  {
    value: 'price-desc',
    label: 'Price - Descending'
  }
];

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
    SelectOptionInput,
    FormRow,
  },
  props: ['appointments', 'pharmacyId'],
  data() {
    return {
      selectedAppointment: null,
      options: selectOptions,
      selectedValue: ''
    }
  },
  computed: {
    ...mapGetters({
      result: 'appointments/getResult'
    })
  },
  watch: {
    result({label, ok, message}) {
      if(label === 'delete' || label==='makeAppointment') {
        if(ok) {
          toastr.success(message);
        } else {
          toastr.error(message);
        }
      }
    },
    selectedValue (){
      this.handleChangeSort();
    }
  },
  methods: {
    ...mapActions({
        reserveAppointment: 'appointments/reserveAppointment',
        sortAppointments: 'appointments/sortAppointments'
    }),
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
    ,
    handleMakeAppointmentClick(appointment) {
      let appointmentRequest = { 'appointmentId' : appointment.id, "patientId" : '08d8f514-58cc-41e9-810e-0a83d243cd60', "pharmacyId" : appointment.pharmacyId};
      this.reserveAppointment(appointmentRequest);
    },
    handleChangeSort(){
      let criteria = this.selectedValue.split("-")[0]
      const isAsc = this.selectedValue.split("-")[1] == 'asc';
      this.sortAppointments({
        'criteria' : criteria,
        'isAsc' : isAsc,
        'pharmacyId' : this.pharmacyId
      });
    }
  },
}
</script>


<style>

</style>