<template>
    <div>
        <Table>
            <TableHead :columnNames="['For', 'Deadline', 'Delivery date', 'Total price', 'Status', ...(user.role === Roles.PharmacyAdmin ? [''] : [])]"></TableHead>
            <TableBody>
                <TableRow 
                    v-for="(supplierOffer, i) in supplierOffers" 
                    :key="i" 
                    :values="[
                        supplierOffer.pharmacyOrder && supplierOffer.pharmacyOrder.pharmacy.name,
                        supplierOffer.pharmacyOrder && formatDateTime(supplierOffer.pharmacyOrder.offersDeadline),
                        formatDateTime(supplierOffer.deliveryDeadline),
                        supplierOffer.totalPrice + ' RSD',
                        formatStatus(supplierOffer.status)
                    ]"
                >
                    <div class="pull-right text-gray">
                        <DropDownMenu v-if="supplierOffer.status === 2 && user.role === Roles.Supplier">
                            <ModalOpener modalBoxId="supplierOfferModal" >
                                <DropDownItem @click="handleEditClick(supplierOffer)">Update Offer</DropDownItem>
                            </ModalOpener>
                        </DropDownMenu>
                        
                        <RoundButton
                            v-if="user.role === Roles.PharmacyAdmin"
                            :title="'Accept Offer'"
                            :iconName="'check'"
                            @click="handleAcceptOffer(supplierOffer.id)"
                        />
                    </div>
                </TableRow>
            </TableBody>
        </Table>

        <Modal modalBoxId="supplierOfferModal" title="Update Offer">
            <div slot="body">
                <SupplierOfferForm
                    :isEdit=true
                    :existingSupplierOffer="selectedSupplierOffer"
                    :existingPharmacyOrder="selectedSupplierOffer && selectedSupplierOffer.pharmacyOrder"
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
import Modal from '../Modal/Modal.vue'
import ModalOpener from '../Modal/ModalOpener'
import SupplierOfferForm from '../Forms/SupplierOfferForm'
import DropDownMenu from '../DropdownMenu/DropdownMenu'
import DropDownItem from '../DropdownMenu/DropdownItem'

import moment from 'moment'
import { getAccountIdFromToken, getRoleFromToken } from '../../utils/token'
import { Roles } from '../../constants'
import RoundButton from '../Form/RoundButton.vue'
import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'

export default {
    props: {
        supplierOffers: {}
    },

    data: () => {
        return {
            selectedSupplierOffer: null,
            supplierId: null,
            user: {},
            Roles
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
        Modal,
        ModalOpener,
        SupplierOfferForm,
        DropDownMenu,
        DropDownItem,
        RoundButton
    },

    computed: {
        ...mapGetters({result: 'supplierOffers/getResult'})
    },

    watch: {
        result({label, ok, message}) {
            if(label !== 'delete' && label !== 'accept')
                return;

            if(ok) {
                toastr.success(message);
            } else {
                toastr.error(message);
            }
        }
    },

    methods: {
        ...mapActions({
            acceptSupplierOffer: 'supplierOffers/acceptSupplierOffer'
        }),

         handleEditClick(supplierOffer) {
            this.selectedSupplierOffer = supplierOffer;
        },

        handleAcceptOffer(supplierOfferId) {
            this.acceptSupplierOffer(supplierOfferId);
        },

        formatDateTime(date) {
            return moment(date).format("DD-MMM-YYYY HH:mm");
        },

        formatStatus(status) {
            const descriptiveStatuses = ['Accepted', 'Refused', 'Waiting for answer'];

            return descriptiveStatuses[status]
        }
    }
}
</script>
