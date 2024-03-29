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
                        pharmacyOrder.isProcessed ? 'Processed' : (hasDatePassed(pharmacyOrder.offersDeadline) ? 'Waiting to be processed' : 'Waiting for offers')
                    ]"
                >
                    <div class="pull-right text-gray">
                        <DropDownMenu v-if="user.role === Roles.PharmacyAdmin || (user.role === Roles.Supplier && !pharmacyOrder.isProcessed && !hasDatePassed(pharmacyOrder.offersDeadline))">
                            <ModalOpener
                                v-if="user.role === Roles.PharmacyAdmin && !pharmacyOrder.isProcessed && !hasDatePassed(pharmacyOrder.offersDeadline)"
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

                            <ModalOpener
                                v-if="user.role === Roles.PharmacyAdmin"
                                modalBoxId="supplierOffersModal"
                            >
                                <DropDownItem @click="fetchSupplierOffersFor(pharmacyOrder.id)">See offers</DropDownItem>
                            </ModalOpener>

                        </DropDownMenu>
                    </div>
                </TableRow>
                <Pagination @pageChange="$emit('pageChange', $event)" />
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
                    :pharmacyAdminId="user && user.userId"
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

        <Modal
            v-if="user.role === Roles.PharmacyAdmin"
            modalBoxId="supplierOffersModal"
            title="Supplier Offers"
            sizeClass="modal-lg"
        >
            <div slot="body">
                <SupplierOffersTable
                    :forPharmacyAdmin=true
                    :supplierOffers="supplierOffers || []"
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
import SupplierOffersTable from '../Tables/SupplierOffersTable'
import PharmacyOrderForm from '../Forms/PharmacyOrderForm'
import SupplierOfferForm from '../Forms/SupplierOfferForm'
import SelectOptionInput from '../Form/SelectOptionInput'
import ModalOpener from '../Modal/ModalOpener.vue'
import Button from '../Form/Button.vue'
import Modal from '../Modal/Modal.vue'
import {Roles} from '../../constants'
import DropDownMenu from '../DropdownMenu/DropdownMenu'
import DropDownItem from '../DropdownMenu/DropdownItem'
import { getAccountIdFromToken, getRoleFromToken, getUserIdFromToken } from '../../utils/token'

import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
import Pagination from '../Table/Pagination.vue'

export default {
    props: {
        pharmacyOrders: {},
        pharmacyId: {},
    },
    data: () => {
        return {
            Roles,
            user: {},
            selectedPharmacyOrder: null,
            selectedOrderId: null,
            pharmacyOrderStatusFilter: null,
        }
    },
    mounted() {
        this.user = {
            id: getAccountIdFromToken(),
            userId: getUserIdFromToken(),
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
        SelectOptionInput,
        SupplierOffersTable,
        Pagination
    },
    watch: {
        pharmacyOrderStatusFilter() {
            this.$emit('filter', this.pharmacyOrderStatusFilter);
        },

        supplierOffersResult({ok, label}) {
            if(label === 'accept' && ok) {
                this.fetchSupplierOffersForPharmacyOrder(this.selectedOrderId);
            }
        }
    },
    computed: {
        ...mapGetters({
            supplierOffers: 'supplierOffers/getSupplierOffers',
            supplierOffersResult: 'supplierOffers/getResult'
        })
    },
    methods: {
        ...mapActions({
            fetchSupplierOffersForPharmacyOrder: 'supplierOffers/fetchOffersForPharmacyOrder'
        }),

        fetchSupplierOffersFor(orderId) {
            this.selectedOrderId = orderId;
            this.fetchSupplierOffersForPharmacyOrder(this.selectedOrderId);
        },

        formatDateTime(date) {
            return moment(date).format("DD-MMM-YYYY HH:mm");
        },

        formatOrderedMedicines(pharmacyOrder) {
            const maxLength = 100;
            const string = pharmacyOrder.orderedMedicines.map(({medicine, quantity}) => `${medicine.name}: ${quantity}`).join(', ');
            return string.length >= maxLength ? string.substring(0, maxLength - 3) + '...' : string;
        },

        hasDatePassed(date) {
            return moment().isAfter(date);
        }
    },
}
</script>
