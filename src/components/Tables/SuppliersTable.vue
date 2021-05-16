<template>
    <div>
        <ModalOpener modalBoxId="supplierModal">
            <Button @click="handleRegisterClick" class="pull-right">Register supplier</Button>
        </ModalOpener>

        <Table>
            <TableHead :columnNames="['Name', 'Username', 'Email', 'Phone Number', '']" />
            <TableBody>
                <TableRow
                    v-for="(supplier, index) in suppliers"
                    :key="index"
                    :values="[
                            supplier.user.firstName + ' ' + supplier.user.lastName,
                            supplier.username,
                            supplier.email,
                            supplier.user.phoneNumber
                ]">
                            <div class="pull-right text-gray">
                                <DropdownMenu name="Account">
                                    <ModalOpener modalBoxId="supplierModal">
                                        <DropdownItem @click="handleEditClick(supplier)">Edit</DropdownItem>
                                    </ModalOpener>
                                    <ModalOpener modalBoxId="deleteSupplierModal">
                                        <DropdownItem @click="handleDeleteClick(supplier)">Delete</DropdownItem>
                                    </ModalOpener>
                                </DropdownMenu>
                            </div>
                </TableRow>
                <Pagination @pageChange="$emit('pageChange', $event)" />
            </TableBody>
        </Table>

        <Modal
            title="Supplier"
            modalBoxId="supplierModal"
            sizeClass="modal-lg"
        >
            <div slot="body">
                <SupplierForm
                    :isEdit="isEdit"
                    :existingAccount="selectedSupplier"
                    :existingUser="selectedSupplier && selectedSupplier.user"
                />
            </div>
        </Modal>


        <Modal
            modalBoxId="deleteSupplierModal"
            title="Delete Supplier"
        >
            <div slot="body">
                <p v-if="selectedSupplier">Are you sure that you want to delete supplier {{selectedSupplier.user.firstName}} {{selectedSupplier.user.lastName}}?</p>
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
import SupplierForm from '../Forms/SupplierForm'
import Button from '../Form/Button'
import Pagination from '../Table/Pagination.vue'

import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'

export default {
    props: ['suppliers'],

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
        SupplierForm,
        Button,
        Pagination
    },

    data: function() {
        return {
            selectedSupplier: null,
            isEdit: false
        }
    },

    computed: {
        ...mapGetters({result: 'suppliers/getResult'})
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
            deleteSupplier: 'suppliers/deleteSupplier'
        }),

        handleRegisterClick() {
            this.isEdit = false;
            this.selectedSupplier = null;
        },

        handleDeleteClick(supplier) {
            this.selectedSupplier = supplier;
        },

        onDeleteSubmit() {
            if(this.selectedSupplier) {
                this.deleteSupplier(this.selectedSupplier.id);
            }
        },

        handleEditClick(supplier) {
            this.isEdit = true;
            this.selectedSupplier = supplier;
        }
    }
}

</script> 
