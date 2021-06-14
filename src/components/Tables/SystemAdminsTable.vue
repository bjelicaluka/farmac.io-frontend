<template>
    <div>
        <ModalOpener modalBoxId="systemAdminModal">
            <Button @click="handleRegisterClick" class="pull-right">Register system admin</Button>
        </ModalOpener>

        <Table>
            <TableHead :columnNames="['Name', 'Username', 'Email', 'Phone Number', '']" />
            <TableBody>
                <TableRow
                    v-for="(systemAdmin, index) in systemAdmins"
                    :key="index"
                    :values="[
                            systemAdmin.user.firstName + ' ' + systemAdmin.user.lastName,
                            systemAdmin.username,
                            systemAdmin.email,
                            systemAdmin.user.phoneNumber
                ]">
                            <div class="pull-right text-gray">
                                <DropdownMenu name="Account">
                                    <ModalOpener modalBoxId="systemAdminModal">
                                        <DropdownItem @click="handleEditClick(systemAdmin)">Edit</DropdownItem>
                                    </ModalOpener>
                                    <ModalOpener modalBoxId="deleteSystemAdminModal">
                                        <DropdownItem @click="handleDeleteClick(systemAdmin)">Delete</DropdownItem>
                                    </ModalOpener>
                                </DropdownMenu>
                            </div>
                </TableRow>
                <Pagination @pageChange="$emit('pageChange', $event)" />
            </TableBody>
        </Table>

        <Modal
            title="System Admin"
            modalBoxId="systemAdminModal"
            sizeClass="modal-lg"
        >
            <div slot="body">
                <SystemAdminForm
                    :isEdit="isEdit"
                    :existingAccount="selectedSystemAdmin"
                    :existingUser="selectedSystemAdmin && selectedSystemAdmin.user"
                />
            </div>
        </Modal>


        <Modal
            modalBoxId="deleteSystemAdminModal"
            title="Delete System Admin"
        >
            <div slot="body">
                <p v-if="selectedSystemAdmin">Are you sure that you want to delete system admin {{selectedSystemAdmin.user.firstName}} {{selectedSystemAdmin.user.lastName}}?</p>
            </div>

            <div slot="buttons">
                <OptionModalButtons @yes="onDeleteSubmit"/>
            </div>
        </Modal>
    </div>    
</template>

<script>

import Table from '../Table/Table'
import TableHead from '../Table/TableHead'
import TableBody from '../Table/TableBody'
import TableRow from '../Table/TableRow'
import DropdownMenu from '../DropdownMenu/DropdownMenu'
import DropdownItem from '../DropdownMenu/DropdownItem'
import Modal from '../Modal/Modal'
import ModalOpener from '../Modal/ModalOpener'
import OptionModalButtons from '../Modal/OptionModalButtons'
import SystemAdminForm from '../Forms/SystemAdminForm'
import Button from '../Form/Button'
import Pagination from '../Table/Pagination.vue'

import { getAccountIdFromToken } from '../../utils/token'
import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'

export default {
    props: ['systemAdmins'],

    components: {
        Table,
        TableHead,
        TableBody,
        TableRow,
        DropdownMenu,
        DropdownItem,
        Modal,
        ModalOpener,
        OptionModalButtons,
        SystemAdminForm,
        Button,
        Pagination
    },

    data: function() {
        return {
            selectedSystemAdmin: null,
            isEdit: false
        }
    },

    computed: {
        ...mapGetters({result: 'systemAdmins/getResult'})
    },

    watch: {
        result({label, ok, message}) {
            if(label !== 'delete')
                return;

            if(this.selectedSystemAdmin.id === getAccountIdFromToken()) {
                this.$store.dispatch('authentication/logOut');
                this.$router.push('/auth');
            }

            if(ok) {
                toastr.success(message);
            } else {
                toastr.error(message);
            }
        }
    },

    methods: {
        ...mapActions({
            deleteSystemAdmin: 'systemAdmins/deleteSystemAdmin'
        }),

        handleRegisterClick() {
            this.isEdit = false;
            this.selectedSystemAdmin = null;
        },

        handleDeleteClick(systemAdmin) {
            this.selectedSystemAdmin = systemAdmin;
        },

        onDeleteSubmit() {
            if(this.selectedSystemAdmin) {
                this.deleteSystemAdmin(this.selectedSystemAdmin.id);
            }
        },

        handleEditClick(systemAdmin) {
            this.isEdit = true;
            this.selectedSystemAdmin = systemAdmin;
        }
    }
}

</script> 
