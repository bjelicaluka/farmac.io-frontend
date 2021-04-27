<template>
    <div>
        <ModalOpener
            modalBoxId="pharmacyOrderModal"
            v-if="user.role === Roles.PharmacyAdmin"
        >
            <Button class="mt-4" @click="selectedPharmacyOrder = null">Create Pharmacy Order</Button>
        </ModalOpener>

        <SelectOptionInput
            class="pull-right"
            label="All Orders"
            v-model="pharmacyOrderStatusFilter"
            :options="[{label: 'Processed', value: true}, {label: 'Waiting', value: false}]"
        />
        <Table>
            <TableHead :columnNames="['Medicines', 'Deadline', 'Is Processed', '']"></TableHead>
            <TableBody>
                <TableRow 
                    v-for="(pharmacyOrder, i) in pharmacyOrders" 
                    :key="i" 
                    :values="[
                        formatOrderedMedicines(pharmacyOrder),
                        formatDateTime(pharmacyOrder.offersDeadline),
                        pharmacyOrder.isProcessed ? 'Processed' : 'Waiting to be processed'
                    ]"
                >
                    <div class="pull-right text-gray">
                        <DropDownMenu>
                            <ModalOpener
                                v-if="user.role === Roles.PharmacyAdmin"
                                modalBoxId="pharmacyOrderModal"
                            >
                                <DropDownItem @click="selectedPharmacyOrder = pharmacyOrder">Edit</DropDownItem>
                            </ModalOpener>

                            <ModalOpener
                                v-if="user.role === Roles.Supplier"
                                modalBoxId="supplierOfferModal"
                            >
                                <DropDownItem @click="selectedPharmacyOrder = pharmacyOrder">Add offer</DropDownItem>
                            </ModalOpener>

                        </DropDownMenu>
                    </div>
                </TableRow>
            </TableBody>
        </Table>

        <Modal
            v-if="user.role === Roles.PharmacyAdmin"
            modalBoxId="pharmacyOrderModal"
            title="Pharmacy Medicines Order"
            sizeClass="modal-lg"
        >
            <div slot="body">
                <PharmacyOrderForm
                    :isEdit="!!selectedPharmacyOrder" 
                    :existingPharmacyOrder="selectedPharmacyOrder" 
                    :pharmacyId="pharmacyId"
                    pharmacyAdminId="08d8f514-5921-423d-852c-694311688aa2"
                />
            </div>
        </Modal>

        <Modal modalBoxId="supplierOfferModal" title="Give offer">
            <div slot="body">
                <SupplierOfferForm
                    :isEdit=false
                    :existingPharmacyOrder="selectedPharmacyOrder"
                />
            </div>
        </Modal>
    </div>
</template>

<script>

import Table from '../Table/Table.vue'
import TableHead from '../Table/TableHead.vue'
import TableBody from '../Table/TableBody.vue'
import TableRow from '../Table/TableRow.vue'
import PharmacyOrderForm from '../Forms/PharmacyOrderForm'
import SupplierOfferForm from '../Forms/SupplierOfferForm'
import SelectOptionInput from '../Form/SelectOptionInput'
import ModalOpener from '../Modal/ModalOpener.vue'
import Button from '../Form/Button.vue'
import Modal from '../Modal/Modal.vue'
import {Roles} from '../../constants'
import DropDownMenu from '../DropdownMenu/DropdownMenu'
import DropDownItem from '../DropdownMenu/DropdownItem'
import { getAccountIdFromToken, getRoleFromToken } from '../../utils/token'

import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'

export default {
    props: {
        pharmacyOrders: {},
        pharmacyId: {},
    },
    data: () => {
        return {
            Roles,
            user: {},
            role: null,
            selectedPharmacyOrder: null,
            pharmacyOrderStatusFilter: null,
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
        ModalOpener,
        Button,
        Modal,
        DropDownItem,
        DropDownMenu,
        PharmacyOrderForm,
        SupplierOfferForm,
        SelectOptionInput
    },
    watch: {
        pharmacyOrderStatusFilter() {
            this.$emit('filter', this.pharmacyOrderStatusFilter);
        }
    },
    computed: {
        ...mapGetters({
            supplierOffers: 'supplierOffers/getSupplierOffers'
        })
    },
    methods: {
        ...mapActions({
            fetchSupplierOffersForPharmacyOrder: 'supplierOffers/fetchOffersForPharmacyOrder'
        }),

        formatDateTime(date) {
            return moment(date).format("DD-MMM-YYYY HH:mm");
        },

        formatOrderedMedicines(pharmacyOrder) {
            const maxLength = 100;
            const string = pharmacyOrder.orderedMedicines.map(({medicine, quantity}) => `${medicine.name}: ${quantity}`).join(', ');
            return string.length >= maxLength ? string.substring(0, maxLength - 3) + '...' : string;
        },
    },
}
</script>
