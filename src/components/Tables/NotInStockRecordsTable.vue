<template>
    <div>
        <SelectOptionInput
            class="pull-right"
            label="All Records"
            v-model="notInStockRecordSeenFilter"
            :options="[{label: 'Seen', value: true}, {label: 'Not Seen', value: false}]"
        />
        <Table>
            <TableHead :columnNames="['Medicine', 'Date', 'Seen', '']"></TableHead>
            <TableBody>
                <TableRow 
                    v-for="(notInStockRecord, i) in notInStockRecords" 
                    :key="i" 
                    :values="[notInStockRecord.medicine.name, formatDate(notInStockRecord.createdAt), notInStockRecord.isSeen ? 'Seen' : 'Not seen']"
                >
                    <div class="pull-right text-gray">
                        <DropDownMenu v-if="user.role === Roles.PharmacyAdmin && !notInStockRecord.isSeen">
                            <ModalOpener
                                v-if="user.role === Roles.PharmacyAdmin"
                                :modalBoxId="'acceptNotInStockRecordModal'"
                            >
                                <DropDownItem @click="selectedNotInStockRecord = notInStockRecord">Mark Seen</DropDownItem>
                            </ModalOpener>
                        </DropDownMenu>
                    </div>
                </TableRow>
                <Pagination @pageChange="$emit('pageChange', $event)" />
            </TableBody>
        </Table>

        <Modal
            v-if="user.role === Roles.PharmacyAdmin"
            modalBoxId="acceptNotInStockRecordModal"
            title="Mark as Seen"
        >
            <div slot="body">
                <p v-if="selectedNotInStockRecord">Are you sure that you want to mark as seen not in stock record for {{selectedNotInStockRecord.medicine.name}} medicine on {{formatDate(selectedNotInStockRecord.createdAt)}}?</p>
            </div>

            <div slot="buttons">
                <OptionModalButtons @yes="onSeenSubmit"/>
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
import Modal from '../Modal/Modal.vue'
import {Roles} from '../../constants'
import DropDownMenu from '../DropdownMenu/DropdownMenu'
import DropDownItem from '../DropdownMenu/DropdownItem'
import OptionModalButtons from '../Modal/OptionModalButtons.vue'
import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'
import moment from 'moment'
import { getAccountIdFromToken, getRoleFromToken } from '../../utils/token'
import Pagination from '../Table/Pagination.vue'
import SelectOptionInput from '../Form/SelectOptionInput.vue'

export default {
    props: {
        notInStockRecords: {},
    },
    data: () => {
        return {
            Roles,
            user: {},
            selectedNotInStockRecord: null,
            notInStockRecordSeenFilter: null,
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
        Modal,
        DropDownItem,
        DropDownMenu,
        OptionModalButtons,
        Pagination,
        SelectOptionInput
    },
    computed: {
        ...mapGetters({
            result: 'notInStockRecords/getResult'
        })
    },
    watch: {
        result({label, ok, message}) {
            if(label !== 'markSeen') {
                return;
            }
            if(ok) {
                toastr.success(message);
            } else {
                toastr.error(message);
            }
        },
        notInStockRecordSeenFilter() {
            this.$emit('filter', this.notInStockRecordSeenFilter);
        }
    },
    methods: {
        ...mapActions({
            markNotInStockRecordAsSeen: 'notInStockRecords/markNotInStockRecordAsSeen',
        }),
        formatDate(d) {
            return moment(d).format('lll');
        },
        onSeenSubmit() {
            this.markNotInStockRecordAsSeen(this.selectedNotInStockRecord.id);
        },
    }
}
</script>
