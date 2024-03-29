<template>
    <Form @submit="onSubmit($event)">
        <FormGroup>
            <DateTimePicker
                v-model="pharmacyOrder.offersDeadline"
                :isValid="validateOffersDeadline()"
                :showErrorMessage="showErrorMessage"
                label="Offers Deadline"
                errorMessage="Please pick a valid offers deadline."
                type="datetime"
                id="pharmacyOrderOffersDeadline"
                :disabled="disabled"
            />

            <Form v-if="!disabled" @submit="addOrderedMedicine">
                <FormRow>
                    <div class='col-5'>
                        <SelectOptionInput
                            label="Medicine"
                            v-model="orderedMedicine.medicineId"
                            :options="medicines"
                            errorMessage="Please select valid option"
                        />
                    </div>

                    <div class='col-5'>
                        <NumberInput
                            label="Quantity"
                            v-model="orderedMedicine.quantity"
                            :min="0"
                            :max="99999"
                        />
                    </div>
                    
                    <div class='col-2'>
                        <br/>
                        <br/>
                        <Button
                            className="btn btn-primary btn-sm"
                            type="submit"
                        >
                            Add
                        </Button>
                    </div>

                    <div class='col-5'>
                        <small class="form-text text-muted">
                            Medicine must be selected.
                        </small>
                    </div>
                    <div class='col-5'>
                        <small class="form-text text-muted">
                            Quantity be positive round number.
                        </small>
                    </div>
                </FormRow>
            </Form>

            <FormRow>
                <div class='col-12'>
                    <Card title="Ordered Medicines" v-if="pharmacyOrder.orderedMedicines.length !== 0">
                        <Table>
                            <TableHead :columnNames="['Medicine Name', 'Quantity', '']"></TableHead>
                                <TableBody>
                                    <TableRow 
                                        v-for="(orderedMedicine, i) in pharmacyOrder.orderedMedicines"
                                        :key="i"
                                        :values="[getMedicineName(orderedMedicine.medicineId), orderedMedicine.quantity]"
                                    >
                                        <RoundButton  v-if="!disabled" @click="removeOrderedMedicine(orderedMedicine.medicineId)" type="btn-primary" iconName="clear"/>
                                    </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </FormRow>
            <InputErrorMessage
                :isValid="showErrorMessage ? pharmacyOrder.orderedMedicines.length !== 0 : true"
            >
                Please pick medicines to order.
            </InputErrorMessage>
        </FormGroup>
        <Button v-if="!disabled" class="pull-right" @click="showErrorMessage = true" type="submit">{{ isEdit ? 'Update' : 'Create' }}</Button>
    </Form>
</template>

<script>

import Card from '../Card/Card'
import Form from '../Form/Form'
import FormGroup from '../Form/FormGroup'
import FormRow from '../Form/FormRow'
import Button from '../Form/Button'
import SelectOptionInput from '../Form/SelectOptionInput'
import Table from '../Table/Table.vue'
import TableHead from '../Table/TableHead.vue'
import TableBody from '../Table/TableBody.vue'
import TableRow from '../Table/TableRow.vue'
import DateTimePicker from '../Form/DateTimePicker.vue'

import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'
import moment from 'moment'
import InputErrorMessage from '../Form/InputErrorMessage.vue'
import RoundButton from '../Form/RoundButton.vue'
import NumberInput from '../Form/NumberInput.vue'

const initialOrderedMedicine = {
    medicineId: '',
    quantity: 0
}

const initialPharmacyOrder = {
    offersDeadline: null,
    orderedMedicines: []
};

export default {
    components: {
        Card,
        Form,
        FormGroup,
        FormRow,
        Button,
        SelectOptionInput,
        Table,
        TableHead,
        TableBody,
        TableRow,
        DateTimePicker,
        InputErrorMessage,
        RoundButton,
        NumberInput
    },

    props: {
        isEdit: {
            type: Boolean,
            default: false
        },
        disabled: {
            type:Boolean,
            default: false
        },
        existingPharmacyOrder: {
            type: Object
        },
        pharmacyId: {},
        pharmacyAdminId: {}
    },


    data: () => {
        return {
            orderedMedicine: {...initialOrderedMedicine},
            pharmacyOrder: {...initialPharmacyOrder},
            medicines: [],

            showErrorMessage: false
        }
    },
    
    computed: {
        ...mapGetters({
            getMedicines: 'medicines/getMedicineOptions',
            result: 'pharmacyOrders/getResult'
        })
    },

    watch: {
        getMedicines(medicines) {
            this.medicines = medicines.map(m => { return { value: m.id, label: m.name } });
        },

        result({label, ok, message}) {
            if(label !== 'add' && label !== 'update')
                return;

            if(ok) {
                toastr.success(message);
            } else {
                toastr.error(message);
            }
        },

        isEdit() {
            this.setEdit();
        },
        existingPharmacyOrder() {
            this.setEdit();
        }
    },

    mounted() {
        this.fetchMedicines();
    },

    methods: {
        ...mapActions({
            addPharmacyOrder: 'pharmacyOrders/addPharmacyOrder',
            updatePharmacyOrder: 'pharmacyOrders/updatePharmacyOrder',
            fetchMedicines: 'medicines/fetchMedicineOptions'
        }),

        getMedicineName(medicineId) {
            return this.medicines.find(medicineOption => medicineOption.value === medicineId)?.label;
        },

        setEdit() {
            if(!this.isEdit) {
                this.pharmacyOrder = {...initialPharmacyOrder};
                return;
            }
            
            if(this.existingPharmacyOrder) {
                this.pharmacyOrder.offersDeadline = moment(this.existingPharmacyOrder.offersDeadline);
                this.pharmacyOrder.orderedMedicines = [...this.existingPharmacyOrder.orderedMedicines];
            } 
        },

        validateOffersDeadline() {
            return !!this.pharmacyOrder.offersDeadline && this.pharmacyOrder.offersDeadline.isAfter(moment());
        },

        validateOrderedMedicine() {
            return  this.orderedMedicine.medicineId.trim().length === 0 ||
                    isNaN(this.orderedMedicine.quantity) ||
                    parseInt(this.orderedMedicine.quantity) <= 0;
        },

        addOrderedMedicine() {
            if(this.validateOrderedMedicine()) return;

            const existingOrderedMedicine = this.pharmacyOrder.orderedMedicines.find(m => m.medicineId === this.orderedMedicine.medicineId);
            if(existingOrderedMedicine) {
                existingOrderedMedicine.quantity = parseFloat(existingOrderedMedicine.quantity) + parseFloat(this.orderedMedicine.quantity)
            } else {
                this.pharmacyOrder.orderedMedicines.push({...this.orderedMedicine});
            }

            this.orderedMedicine = {...initialOrderedMedicine};
        },

        removeOrderedMedicine(id) {
            this.pharmacyOrder.orderedMedicines = this.pharmacyOrder.orderedMedicines.filter(m => m.medicineId !== id);
        },

        onSubmit(e) {
            e.preventDefault();
            const pharmacyOrderObject = {
                orderedMedicines: this.pharmacyOrder.orderedMedicines,
                offersDeadline: moment(this.pharmacyOrder.offersDeadline).format(),
                pharmacyId: this.pharmacyId,
                pharmacyAdminId: this.pharmacyAdminId,
            };

            if(!this.isEdit) {
                this.addPharmacyOrder(pharmacyOrderObject); 
            } else {
                pharmacyOrderObject.id = this.existingPharmacyOrder.id;
                this.updatePharmacyOrder(pharmacyOrderObject);
            }
        }
    }

}
</script>