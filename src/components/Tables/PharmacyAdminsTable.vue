<template>
    <div>
        <ModalOpener modalBoxId="pharmacyAdminModal">
            <Button @click="handleRegisterClick" class="pull-right">Register pharmacy admin</Button>
        </ModalOpener>

        <Table>
            <TableHead :columnNames="['Name', 'Username', 'Email', 'Phone Number', 'Employed At', '']" />
            <TableBody>
                <TableRow
                    v-for="(pharmacyAdmin, index) in pharmacyAdmins"
                    :key="index"
                    :values="[
                            pharmacyAdmin.user.firstName + ' ' + pharmacyAdmin.user.lastName,
                            pharmacyAdmin.username,
                            pharmacyAdmin.email,
                            pharmacyAdmin.user.phoneNumber,
                            pharmacyAdmin.user.pharmacy.name
                ]">
                            <div class="pull-right text-gray">
                                <DropdownMenu name="Account" icon="person">
                                    <ModalOpener modalBoxId="pharmacyAdminModal">
                                        <DropdownItem @click="handleEditClick(pharmacyAdmin)">Edit</DropdownItem>
                                    </ModalOpener>
                                    <ModalOpener modalBoxId="deletePharmacyAdminModal">
                                        <DropdownItem @click="handleDeleteClick(pharmacyAdmin)">Delete</DropdownItem>
                                    </ModalOpener>
                                </DropdownMenu>
                            </div>
                </TableRow>
            </TableBody>
        </Table>

        <Modal
            title="Pharmacy Admin"
            modalBoxId="pharmacyAdminModal"
            sizeClass="modal-lg"
        >
            <div slot="body">
                <PharmacyAdminForm
                    :isEdit="isEdit"
                    :existingAccount="selectedPharmacyAdmin"
                    :existingUser="selectedPharmacyAdmin && selectedPharmacyAdmin.user"
                />        
            </div>
        </Modal>


        <Modal
            modalBoxId="deletePharmacyAdminModal"
            title="Delete Pharmacy Admin"
        >
            <div slot="body">
                <p v-if="selectedPharmacyAdmin">Are you sure that you want to delete pharmacy admin {{selectedPharmacyAdmin.user.firstName}} {{selectedPharmacyAdmin.user.lastName}}?</p>
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
import PharmacyAdminForm from '../Forms/PharmacyAdminForm'
import OptionModalButtons from '../Modal/OptionModalButtons'
import Button from '../Form/Button'
import {mapActions, mapGetters} from 'vuex'
import toastr from 'toastr'

export default {
    props: ['pharmacyAdmins'],

    components: {
        Table,
        TableHead,
        TableBody,
        TableRow,
        DropdownMenu,
        DropdownItem,
        Modal,
        ModalOpener,
        PharmacyAdminForm,
        OptionModalButtons,
        Button
    },

    data: function() {
        return {
            selectedPharmacyAdmin: null,
            isEdit: false
        }
    },

    computed: {
        ...mapGetters({result: 'pharmacyAdmins/getResult'})
    },

    watch: {
        result({label, ok, message}) {
            if(label !== 'delete')
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
            deletePharmacyAdmin: 'pharmacyAdmins/deletePharmacyAdmin'
        }),

        handleRegisterClick() {
            this.isEdit = false;
            this.selectedPharmacyAdmin = null;
        },

        handleDeleteClick(p) {
            this.selectedPharmacyAdmin = p;
        },

        onDeleteSubmit() {
            if(this.selectedPharmacyAdmin) {
                this.deletePharmacyAdmin(this.selectedPharmacyAdmin.id);
            }
        },

        handleEditClick(p) {
            this.isEdit = true;
            this.selectedPharmacyAdmin = p;
        }
    }
}

</script> 
