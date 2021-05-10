<template>
    <div>
        <ModalOpener modalBoxId="loyaltyProgramModal">
            <Button @click="handleRegisterClick" class="pull-right">Register loyalty program</Button>
        </ModalOpener>

        <Table>
            <TableHead :columnNames="['Name', 'Minimum points', 'Discount', '']" />
            <TableBody>
                <TableRow
                    v-for="(loyaltyProgram, index) in loyaltyPrograms"
                    :key="index"
                    :values="[
                            loyaltyProgram.name,
                            loyaltyProgram.minPoints,
                            loyaltyProgram.discount + '%'
                ]">
                            <div class="pull-right text-gray">
                                <DropdownMenu>
                                    <ModalOpener modalBoxId="loyaltyProgramModal">
                                        <DropdownItem @click="handleEditClick(loyaltyProgram)">Edit</DropdownItem>
                                    </ModalOpener>
                                    <ModalOpener modalBoxId="deleteLoyaltyProgramModal">
                                        <DropdownItem @click="handleDeleteClick(loyaltyProgram)">Delete</DropdownItem>
                                    </ModalOpener>
                                </DropdownMenu>
                            </div>
                </TableRow>
            </TableBody>
        </Table>

        <Modal
            title="Loyalty Program"
            modalBoxId="loyaltyProgramModal"
            sizeClass="modal-lg"
        >
            <div slot="body">
                <LoyaltyProgramForm
                    :isEdit="isEdit"
                    :existingLoyaltyProgram="selectedLoyaltyProgram"
                />
            </div>
        </Modal>


        <Modal
            modalBoxId="deleteLoyaltyProgramModal"
            title="Delete Loyalty Program"
        >
            <div slot="body">
                <p v-if="selectedLoyaltyProgram">Are you sure that you want to delete {{selectedLoyaltyProgram.name}}?</p>
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
import LoyaltyProgramForm from '../Forms/LoyaltyProgramForm'
import Button from '../Form/Button'

import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'

export default {
    props: ['loyaltyPrograms'],

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
        Button,
        LoyaltyProgramForm
    },

    data: function() {
        return {
            selectedLoyaltyProgram: null,
            isEdit: false
        }
    },

    computed: {
        ...mapGetters({result: 'loyaltyPrograms/getResult'})
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
            deleteLoyaltyProgram: 'loyaltyPrograms/deleteLoyaltyProgram'
        }),

        handleRegisterClick() {
            this.isEdit = false;
            this.selectedSupplier = null;
        },

        handleDeleteClick(loyaltyProgram) {
            this.selectedLoyaltyProgram = loyaltyProgram;
        },

        onDeleteSubmit() {
            if(this.selectedLoyaltyProgram) {
                this.deleteLoyaltyProgram(this.selectedLoyaltyProgram.id);
            }
        },

        handleEditClick(loyaltyProgram) {
            this.isEdit = true;
            this.selectedLoyaltyProgram = loyaltyProgram;
        }
    }
}

</script> 
