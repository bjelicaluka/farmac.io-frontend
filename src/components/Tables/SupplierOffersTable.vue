<template>
    <div>
        <Table>
            <TableHead :columnNames="['For', 'Deadline', 'Delivery date', 'Total price', 'Status', '']"></TableHead>
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
                    </div>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>

<script>

import Table from '../Table/Table.vue'
import TableHead from '../Table/TableHead.vue'
import TableBody from '../Table/TableBody.vue'
import TableRow from '../Table/TableRow.vue'

import moment from 'moment'

export default {
    props: {
        supplierOffers: {}
    },

    data: () => {
        return {
            supplierId: null
        }
    },

    components: {
        Table,
        TableHead,
        TableBody,
        TableRow
    },

    methods: {
        formatDateTime(date) {
            return moment(date).format("DD-MMM-YYYY HH:mm");
        },

        formatStatus(status) {
            const descriptiveStatuses = {
                '0': 'Accepted',
                '1': 'Refused',
                '2': 'Waiting for answer'
            }

            return descriptiveStatuses[status]
        }
    }
}
</script>
