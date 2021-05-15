<template>
    <div>
        <ModalOpener modalBoxId="supplierMedicineModal">
            <Button @click="handleAddClick" class="pull-right">Add Medicine</Button>
        </ModalOpener>

        <Table>
            <TableHead :columnNames="['Medicine Name', 'Manufacturer', 'Quantity', 'Average Grade', '']"></TableHead>
            <TableBody>
                <TableRow 
                    v-for="(supplierMedicine, i) in supplierMedicines" 
                    :key="i" 
                    :values="[
                        supplierMedicine.medicine && supplierMedicine.medicine.name,
                        supplierMedicine.medicine && supplierMedicine.medicine.manufacturer,
                        supplierMedicine.quantity,
                        supplierMedicine.medicine && supplierMedicine.medicine.averageGrade
                    ]"
                >
                    <div class="pull-right text-gray">
                        <DropDownMenu>
                            <ModalOpener modalBoxId="supplierMedicineModal" >
                                <DropDownItem @click="handleEditClick(supplierMedicine)">Update from Stock</DropDownItem>
                            </ModalOpener>
                            <ModalOpener modalBoxId="removeMedicineFromStockModal" >
                                <DropDownItem @click="handleRemoveClick(supplierMedicine)">Remove from Stock</DropDownItem>
                            </ModalOpener>
                        </DropDownMenu>
                    </div>
                </TableRow>
                <Pagination @pageChange="$emit('pageChange', $event)" />
            </TableBody>
        </Table>

        <Modal modalBoxId="supplierMedicineModal" title="Add Medicine To Stock" >
            <div slot="body">
                <SupplierMedicineForm
                    :isEdit="isEdit"
                    :existingSupplierMedicine="selectedSupplierMedicine"
                />
            </div>
        </Modal>

        <Modal modalBoxId="removeMedicineFromStockModal" title="Remove Medicine From Stock" >
            <div slot="body">
                <p v-if="selectedSupplierMedicine">Are you sure that you want to remove medicine {{selectedSupplierMedicine.medicine.name}} from the stock?</p>
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
import ModalOpener from '../Modal/ModalOpener.vue'
import Button from '../Form/Button.vue'
import Modal from '../Modal/Modal.vue'
import SupplierMedicineForm from '../Forms/SupplierMedicineForm'
import DropDownMenu from '../DropdownMenu/DropdownMenu'
import DropDownItem from '../DropdownMenu/DropdownItem'
import OptionModalButtons from '../Modal/OptionModalButtons.vue'
import Pagination from '../Table/Pagination.vue'

import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'
import { getAccountIdFromToken } from '../../utils/token'

export default {
    props: {
        supplierMedicines: {}
    },

    data: () => {
        return {
            selectedSupplierMedicine: null,
            isEdit: false,
            supplierId: null
        }
    },

    components: {
        Table,
        TableHead,
        TableBody,
        TableRow,
        ModalOpener,
        Button,
        Modal,
        SupplierMedicineForm,
        DropDownItem,
        DropDownMenu,
        OptionModalButtons,
        Pagination
    },
    
    computed: {
        ...mapGetters({
            result: 'supplierStock/getResult'
        })
    },

    watch: {
        result({label, ok, message}) {
            if(label !== 'delete') {
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
            deleteMedicineFromStock: 'supplierStock/deleteMedicineFromSupplierStock',
        }),

        handleAddClick() {
            this.isEdit = false;
            this.selectedSupplierMedicine = null;
        },

        handleEditClick(supplierMedicine) {
            this.isEdit = true;
            this.selectedSupplierMedicine = supplierMedicine;
        },

        handleRemoveClick(supplierMedicine) {
            this.selectedSupplierMedicine = supplierMedicine;
        },

        onRemoveSubmit() {
            this.deleteMedicineFromStock({
                supplierId: this.supplierId,
                supplierMedicineId: this.selectedSupplierMedicine.id
            });
        }
    },

    mounted() {
        this.supplierId = getAccountIdFromToken();
    }
}
</script>
