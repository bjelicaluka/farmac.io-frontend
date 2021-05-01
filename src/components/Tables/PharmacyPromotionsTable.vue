<template>
    <div>
        <ModalOpener
            modalBoxId="pharmacyPromotionModal"
            v-if="user.role === Roles.PharmacyAdmin"
        >
            <Button class="mt-4" @click="selectedPharmacyPromotion = null">Create Pharmacy Promotion</Button>
        </ModalOpener>

        <Table>
            <TableHead :columnNames="['Discount', 'Start Date', 'End Date', '']"></TableHead>
            <TableBody>
                <TableRow 
                    v-for="(pharmacyPromotion, i) in pharmacyPromotions" 
                    :key="i" 
                    :values="[
                        pharmacyPromotion.discount,
                        formatDate(pharmacyPromotion.from),
                        formatDate(pharmacyPromotion.to),
                    ]"
                >
                    <div class="pull-right text-gray">
                        <DropDownMenu>
                            <ModalOpener
                                v-if="user.role === Roles.PharmacyAdmin"
                                modalBoxId="pharmacyPromotionModal"
                            >
                                <DropDownItem @click="selectedPharmacyPromotion = pharmacyPromotion">Edit</DropDownItem>
                            </ModalOpener>

                            <ModalOpener
                                v-if="user.role === Roles.PharmacyAdmin"
                                modalBoxId="deletePharmacyPromotionModal"
                            >
                                <DropDownItem @click="selectedPharmacyPromotion = pharmacyPromotion">Delete</DropDownItem>
                            </ModalOpener>

                        </DropDownMenu>
                    </div>
                </TableRow>
            </TableBody>
        </Table>

        <Modal
            v-if="user.role === Roles.PharmacyAdmin"
            modalBoxId="pharmacyPromotionModal"
            title="Pharmacy Medicines Order"
            sizeClass="modal-lg"
        >
            <div slot="body">
                <PharmacyPromotionForm
                    :isEdit="!!selectedPharmacyPromotion" 
                    :existingPromotion="selectedPharmacyPromotion" 
                    :pharmacyId="pharmacyId"
                />
            </div>
        </Modal>

        <Modal
            modalBoxId="deletePharmacyPromotionModal"
            title="Delete Promotion"
        >
            <div slot="body">
            <p v-if="selectedPharmacyPromotion">Are you sure that you want to delete promotion?</p>
            </div>

            <div slot="buttons">
                <OptionModalButtons @yes="onDeleteSubmit"/>
            </div>
        </Modal>

    </div>
</template>

<script>

import Table from '../Table/Table.vue'
import TableHead from '../Table/TableHead.vue'
import TableBody from '../Table/TableBody.vue'
import TableRow from '../Table/TableRow.vue'
import PharmacyPromotionForm from '../Forms/PharmacyPromotionForm'
import ModalOpener from '../Modal/ModalOpener.vue'
import Button from '../Form/Button.vue'
import Modal from '../Modal/Modal.vue'
import {Roles} from '../../constants'
import DropDownMenu from '../DropdownMenu/DropdownMenu'
import DropDownItem from '../DropdownMenu/DropdownItem'
import { getAccountIdFromToken, getRoleFromToken } from '../../utils/token'
import { mapActions, mapGetters } from 'vuex'

import toastr from 'toastr'
import moment from 'moment'
import OptionModalButtons from '../Modal/OptionModalButtons.vue'

export default {
    props: {
        pharmacyPromotions: {},
        pharmacyId: {},
    },
    data: () => {
        return {
            Roles,
            user: {},
            selectedPharmacyPromotion: null,
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
        Button,
        Modal,
        DropDownItem,
        DropDownMenu,
        PharmacyPromotionForm,
        OptionModalButtons,
    },
    watch: {
        result({ok, label, message}) {
            if(label !== 'delete') return;
        
            if(ok) {
                toastr.success(message);
            } else {
                toastr.error(message);
            }
        }
    },
    computed: {
        ...mapGetters({
            result: 'pharmacyPromotions/getResult'
        })
    },
    methods: {
        ...mapActions({
            deletePharmacyPromotion: 'pharmacyPromotions/deletePharmacyPromotion'
        }),

        formatDate(date) {
            return moment(date).format('ll');
        },

        onDeleteSubmit() {
            this.deletePharmacyPromotion({pharmacyId: this.pharmacyId, pharmacyPromotionId: this.selectedPharmacyPromotion.id})
        }
    },
}
</script>