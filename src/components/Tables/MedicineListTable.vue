<template>
    <div>
        <ModalOpener modalBoxId="addMedicineToPharmacyModal">
            <Button class="pull-right">Add Medicine</Button>
        </ModalOpener>

        <Table>
            <TableHead :columnNames="['Medicine Name', 'Quantity', 'Average Grade', '']"></TableHead>
            <TableBody>
                <TableRow 
                    v-for="(pharmacyMedicine, i) in medicines" 
                    :key="i" 
                    :values="[pharmacyMedicine.medicine && pharmacyMedicine.medicine.name,
                        pharmacyMedicine.quantity, pharmacyMedicine.medicine && pharmacyMedicine.medicine.averageGrade]"
                >
                    <div class="pull-right text-gray">
                        <drop-down-menu>
                            <modal-opener
                                v-if="role === Roles.PharmacyAdmin"
                                :modalBoxId="'removeMedicineFromPharmacyModal'"
                            >
                                <drop-down-item @click="selectedPharmacyMedicine = pharmacyMedicine">Remove from Pharmacy</drop-down-item>
                            </modal-opener>
                        </drop-down-menu>
                    </div>
                </TableRow>
            </TableBody>
        </Table>

        <Modal
            v-if="role === Roles.PharmacyAdmin"
            modalBoxId="addMedicineToPharmacyModal"
            title="Add Medicine To Pharmacy"
        >
            <div slot="body">
                <PharmacyMedicineForm :pharmacyId="adminPharmacyId" />
            </div>
        </Modal>

        <Modal
            modalBoxId="removeMedicineFromPharmacyModal"
            title="Remove Medicine From Pharmacy"
        >
            <div slot="body">
                <p v-if="selectedPharmacyMedicine">Are you sure that you want to remove medicine {{selectedPharmacyMedicine.medicine.name}} from the pharmacy?</p>
            </div>

            <div slot="buttons">
                <OptionModalButtons @yes="onRemoveSubmit"/>
            </div>
        </Modal>
    </div>
</template>

<script>

import Table from '../Table/Table.vue'
import TableHead from '../Table/TableHead.vue'
import TableBody from '../Table/TableBody.vue'
import TableRow from '../Table/TableRow.vue'
import PharmacyMedicineForm from '../Forms/PharmacyMedicineForm.vue'
import ModalOpener from '../Modal/ModalOpener.vue'
import Button from '../Form/Button.vue'
import Modal from '../Modal/Modal.vue'
import {Roles} from '../../constants'
import DropDownMenu from '../DropdownMenu/DropdownMenu'
import DropDownItem from '../DropdownMenu/DropdownItem'
import OptionModalButtons from '../Modal/OptionModalButtons.vue'
import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'

export default {
    props: ['medicines', 'adminPharmacyId'],
    data: () => {
        return {
            Roles,
            role: Roles.PharmacyAdmin,
            selectedPharmacyMedicine: null
        }
    },
    components: {
        Table,
        TableHead,
        TableBody,
        TableRow,
        PharmacyMedicineForm,
        ModalOpener,
        Button,
        Modal,
        DropDownItem,
        DropDownMenu,
        OptionModalButtons
    },
    computed: {
        ...mapGetters({
            result: 'pharmacies/getResult'
        })
    },
    watch: {
        result({label, ok, message}) {
            if(label !== 'removeMedicineFromPharmacy') {
                return;
            }
            if(ok) {
                toastr.success(message);
            } else {
                toastr.error(message);
            }
        },
    },
    methods: {
        ...mapActions({
            removeMedicineFromPharmacy: 'pharmacies/removeMedicineFromPharmacy',
        }),
        onRemoveSubmit() {
            this.removeMedicineFromPharmacy({pharmacyId: this.adminPharmacyId, medicineId: this.selectedPharmacyMedicine.id});
        }
    }
}
</script>
