<template>
    <div>
        <Table>
            <TableHead :columnNames="['Requester', 'Date From', 'Date To', '']"></TableHead>
            <TableBody>
                <TableRow 
                    v-for="(absenceRequest, i) in absenceRequests" 
                    :key="i" 
                    :values="[getFullNameOfRequester(absenceRequest.requester), formatDate(absenceRequest.fromDate), formatDate(absenceRequest.toDate)]"
                >
                    <div class="pull-right text-gray">
                        <DropDownMenu v-if="user.role === Roles.PharmacyAdmin">
                            <ModalOpener
                                v-if="user.role === Roles.PharmacyAdmin"
                                :modalBoxId="'acceptAbsenceRequestModal'"
                            >
                                <DropDownItem @click="selectedAbsenceRequest = absenceRequest">Accept</DropDownItem>
                            </ModalOpener>

                            <ModalOpener
                                v-if="user.role === Roles.PharmacyAdmin"
                                :modalBoxId="'declineAbsenceRequestModal'"
                            >
                                <DropDownItem @click="selectedAbsenceRequest = absenceRequest">Decline</DropDownItem>
                            </ModalOpener>
                        </DropDownMenu>
                    </div>
                </TableRow>
            </TableBody>
        </Table>

        <Modal
            v-if="user.role === Roles.PharmacyAdmin"
            modalBoxId="acceptAbsenceRequestModal"
            title="Accept Absence Request"
        >
            <div slot="body">
                <p v-if="selectedAbsenceRequest">Are you sure that you want to accept absence request from {{getFullNameOfRequester(selectedAbsenceRequest.requester)}}?</p>
            </div>

            <div slot="buttons">
                <OptionModalButtons @yes="onAcceptSubmit"/>
            </div>
        </Modal>

        <Modal
            v-if="user.role === Roles.PharmacyAdmin"
            modalBoxId="declineAbsenceRequestModal"
            title="Decline Absence Request"
        >
            <div slot="body">
                <p v-if="selectedAbsenceRequest">Are you sure that you want to decline absence request from {{getFullNameOfRequester(selectedAbsenceRequest.requester)}}?</p>
            </div>

            <div slot="buttons">
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

export default {
    props: {
        absenceRequests: {},
    },
    data: () => {
        return {
            Roles,
            user: {},
            selectedAbsenceRequest: null
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
    },
    computed: {
        ...mapGetters({
            result: 'pharmacies/getResult'
        })
    },
    watch: {
        result({label, ok, message}) {
            if(label !== '') {
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
            acceptAbsenceRequest: 'pharmacies/removeMedicineFromPharmacy',
        }),
        formatDate(d) {
            return moment(d).format('ll');
        },
        onAcceptSubmit() {
            this.acceptAbsenceRequest({pharmacyId: this.adminPharmacyId, medicineId: this.selectedAbsenceRequest.id});
        },
        getFullNameOfRequester(requester) {
            return `${requester.firstName} ${requester.lastName}`
        }
    }
}
</script>
