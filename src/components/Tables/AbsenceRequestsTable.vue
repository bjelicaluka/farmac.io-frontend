<template>
    <div>
        <Table>
            <TableHead :columnNames="['Requester', 'Date From', 'Date To', 'Status', '']"></TableHead>
            <TableBody>
                <TableRow 
                    v-for="(absenceRequest, i) in absenceRequests" 
                    :key="i" 
                    :values="[getFullNameOfRequester(absenceRequest.requester), formatDate(absenceRequest.fromDate), formatDate(absenceRequest.toDate), formatStatus(absenceRequest.status)]"
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
                <TextArea
                    label="Reason"
                    rows="4"
                    v-model="reason"
                    :isValid="isReasonValid()"
                    :showErrorMessage="showErrorMessage"
                    errorMessage="Please provide a reason that is longer than 5 characters."
                />
            </div>

            <div slot="buttons">
                <ModalCloser id="declineAbsenceRequestModalCloser">
                    <Button className="btn btn-secondary">
                        No
                    </Button>
                </ModalCloser>

                <Button @click="onDeclineSubmit">
                    Yes
                </Button>
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
import ModalCloser from '../Modal/ModalCloser.vue'
import Modal from '../Modal/Modal.vue'
import {Roles} from '../../constants'
import DropDownMenu from '../DropdownMenu/DropdownMenu'
import DropDownItem from '../DropdownMenu/DropdownItem'
import OptionModalButtons from '../Modal/OptionModalButtons.vue'
import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'
import moment from 'moment'
import { getAccountIdFromToken, getRoleFromToken } from '../../utils/token'
import TextArea from '../Form/TextArea.vue'
import Button from '../Form/Button.vue'

export default {
    props: {
        absenceRequests: {},
    },
    data: () => {
        return {
            Roles,
            user: {},
            selectedAbsenceRequest: null,
            reason: null,
            
            showErrorMessage: false
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
        TextArea,
        ModalCloser,
        Button
    },
    computed: {
        ...mapGetters({
            result: 'medicalStaff/getResult'
        })
    },
    watch: {
        result({label, ok, message}) {
            if(label !== 'acceptAbsenceRequest' && label !== 'declineAbsenceRequest') {
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
            acceptAbsenceRequest: 'medicalStaff/acceptAbsenceRequest',
            declineAbsenceRequest: 'medicalStaff/declineAbsenceRequest',
        }),
        formatDate(d) {
            return moment(d).format('ll');
        },
        formatStatus(status) {
            const statuses = ['Accepted', 'Declined', 'Waiting for Response']
            return statuses[status];
        },
        isReasonValid() {
            return !!this.reason && this.reason.length >= 5;
        },
        onAcceptSubmit() {
            this.acceptAbsenceRequest(this.selectedAbsenceRequest.id);
        },
        onDeclineSubmit() {
            this.showErrorMessage = true;
            
            if(this.isReasonValid()) {
                this.declineAbsenceRequest({absenceRequestId: this.selectedAbsenceRequest.id, reason: this.reason});
                document.getElementById('declineAbsenceRequestModalCloser').click();
            }
        },
        getFullNameOfRequester(requester) {
            return `${requester.firstName} ${requester.lastName}`
        }
    }
}
</script>
