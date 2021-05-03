<template>
    <div>
        <ModalOpener
            modalBoxId="addMedicineToPharmacyModal"
            v-if="user.role === Roles.PharmacyAdmin"
        >
            <Button class="pull-right">Add Medicine</Button>
        </ModalOpener>

        <div class="row pl-4 pr-4" v-if="searchField">
            <Search @search="handleSearch($event)" />
        </div>
        <Table>
            <TableHead :columnNames="['Medicine Name', 'Quantity', 'Average Grade', '']"></TableHead>
            <TableBody>
                <TableRow 
                    v-for="(pharmacyMedicine, i) in medicines" 
                    :key="i" 
                    :values="[pharmacyMedicine.medicine && pharmacyMedicine.medicine.name,
                        pharmacyMedicine.quantity, pharmacyMedicine.medicine && parseFloat(pharmacyMedicine.medicine.averageGrade).toFixed(2) + ' / 5.0']"
                >
                    <div class="pull-right text-gray">
                        <DropDownMenu v-if="user.role === Roles.PharmacyAdmin">
                            <ModalOpener
                                v-if="user.role === Roles.PharmacyAdmin"
                                :modalBoxId="'removeMedicineFromPharmacyModal'"
                            >
                                <DropDownItem @click="selectedPharmacyMedicine = pharmacyMedicine">Remove from Pharmacy</DropDownItem>
                            </ModalOpener>
                        </DropDownMenu>
                    </div>
                </TableRow>
            </TableBody>
        </Table>

        <Modal
            v-if="user.role === Roles.PharmacyAdmin"
            modalBoxId="addMedicineToPharmacyModal"
            title="Add Medicine To Pharmacy"
        >
            <div slot="body">
                <PharmacyMedicineForm :pharmacyId="adminPharmacyId" />
            </div>
        </Modal>

        <Modal
            v-if="user.role === Roles.PharmacyAdmin"
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
import Search from '../Search/Search.vue'
import { getAccountIdFromToken, getRoleFromToken } from '../../utils/token'

export default {
    props: {
        medicines: {},
        adminPharmacyId: {},
        searchField: {
            default: true
        }
    },
    data: () => {
        return {
            Roles,
            user: {},
            selectedPharmacyMedicine: null
        }
    },
    mounted() {
        this.user = {
            id: getAccountIdFromToken(),
            role: getRoleFromToken()
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
        OptionModalButtons,
        Search
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
        },
        handleSearch(value) {
            this.$emit('search', value);
        },
    }
}
</script>
