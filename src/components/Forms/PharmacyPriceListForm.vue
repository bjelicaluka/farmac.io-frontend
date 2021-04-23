<template>
    <Form @submit="onSubmit($event)">
        <FormGroup>
            <FormRow>
                    <div class='col-6'>
                        <TextInput
                            label="Consultation price"
                            v-model="priceList.consultationPrice"
                            :isValid="validateFloat(priceList.consultationPrice)"
                            :showErrorMessage="showErrorMessage"
                            errorMessage="Please enter a valid consultation price"
                        />
                    </div>

                    <div class='col-6'>
                        <TextInput
                            label="Examination price"
                            v-model="priceList.examinationPrice"
                            :isValid="validateFloat(priceList.examinationPrice)"
                            :showErrorMessage="showErrorMessage"
                            errorMessage="Please enter a valid examination price"
                        />
                    </div>
                </FormRow>
            <Form @submit="addMedicinePrice">
                <FormRow>
                    <div class='col-5'>
                        <SelectOptionInput
                            label="Medicine"
                            v-model="medicinePrice.medicineId"
                            :options="medicines"
                            errorMessage="Please select valid option"
                        />
                    </div>

                    <div class='col-5'>
                        <TextInput
                            label="Price"
                            v-model="medicinePrice.price"
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
                            Price be positive number.
                        </small>
                    </div>
                </FormRow>
            </Form>

            <FormRow>
                <div class='col-12'>
                    <Card title="Medicine Prices" v-if="priceList.medicinePriceList.length !== 0">
                        <Table>
                            <TableHead :columnNames="['Medicine Name', 'Price']"></TableHead>
                                <TableBody>
                                    <TableRow 
                                        v-for="(medicinePrice, i) in priceList.medicinePriceList"
                                        :key="i"
                                        :values="[getMedicineName(medicinePrice.medicineId), medicinePrice.price]"
                                    >
                                    </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </FormRow>
            <InputErrorMessage
                :isValid="showErrorMessage ? priceList.medicinePriceList.length !== 0 : true"
            >
                Please enter medicine prices.
            </InputErrorMessage>
        </FormGroup>
        <Button class="pull-right" @click="showErrorMessage = true" type="submit">Save</Button>
    </Form>
</template>

<script>

import Card from '../Card/Card'
import Form from '../Form/Form'
import FormGroup from '../Form/FormGroup'
import FormRow from '../Form/FormRow'
import TextInput from '../Form/TextInput'
import Button from '../Form/Button'
import SelectOptionInput from '../Form/SelectOptionInput'
import Table from '../Table/Table.vue'
import TableHead from '../Table/TableHead.vue'
import TableBody from '../Table/TableBody.vue'
import TableRow from '../Table/TableRow.vue'

import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'
import moment from 'moment'
import InputErrorMessage from '../Form/InputErrorMessage.vue'

const initialMedicinePrice = {
    medicineId: '',
    price: ''
}

const initialPharmacyPriceList = {
    consultationPrice: '',
    examinationPrice: '',
    medicinePriceList: []
};

export default {
    components: {
        Card,
        Form,
        FormGroup,
        FormRow,
        TextInput,
        Button,
        SelectOptionInput,
        Table,
        TableHead,
        TableBody,
        TableRow,
        InputErrorMessage
    },

    props: {
        isEdit: {
            type: Boolean,
            default: false
        },
        existingPharmacyPriceList: {
            type: Object
        },
        pharmacyId: {},
    },


    data: () => {
        return {
            medicinePrice: {...initialMedicinePrice},
            priceList: {...initialPharmacyPriceList},
            medicines: [],

            showErrorMessage: false
        }
    },
    
    computed: {
        ...mapGetters({
            getMedicines: 'medicines/getMedicineOptions',
            result: 'pharmacyPriceLists/getResult'
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
        existingPharmacyPriceList() {
            this.setEdit();
        }
    },

    mounted() {
        this.fetchMedicines();
    },

    methods: {
        ...mapActions({
            addPharmacyPriceList: 'pharmacyPriceLists/addPharmacyPriceList',
            updatePharmacyPriceList: 'pharmacyPriceLists/updatePharmacyPriceList',
            fetchMedicines: 'medicines/fetchMedicineOptions'
        }),

        getMedicineName(medicineId) {
            return this.medicines.find(medicineOption => medicineOption.value === medicineId)?.label;
        },

        setEdit() {
            if(!this.isEdit) {
                this.priceList = {...initialPharmacyPriceList};
                return;
            }
            
            if(this.existingPharmacyPriceList) {
                this.priceList.consultationPrice = this.existingPharmacyPriceList.consultationPrice;
                this.priceList.examinationPrice = this.existingPharmacyPriceList.examinationPrice;
                this.priceList.medicinePriceList = [...this.existingPharmacyPriceList.medicinePriceList];
            }
        },

        validateMedicinePrice() {
            return  this.medicinePrice.price.trim().length === 0 ||
                    this.medicinePrice.medicineId.trim().length === 0 ||
                    !this.validateFloat(this.medicinePrice.price);
        },

        validateFloat(number) {
            return !!number && !(isNaN(number) || parseFloat(number) <= 0)
        },

        addMedicinePrice() {
            if(this.validateMedicinePrice()) return;

            const existingMedicinePrice = this.priceList.medicinePriceList.find(m => m.medicineId === this.medicinePrice.medicineId);
            if(existingMedicinePrice) {
                existingMedicinePrice.price = this.medicinePrice.price;
            } else {
                this.priceList.medicinePriceList.push({...this.medicinePrice});
            }

            this.medicinePrice = {...initialMedicinePrice};
        },

        onSubmit(e) {
            e.preventDefault();
            const priceListObject = {
                medicinePriceList: this.priceList.medicinePriceList,
                examinationPrice: this.priceList.examinationPrice,
                consultationPrice: this.priceList.consultationPrice,
                pharmacyId: this.pharmacyId,
            };

            if(!this.isEdit) {
                this.addPharmacyPriceList(priceListObject); 
            } else {
                priceListObject.id = this.existingPharmacyPriceList.id;
                this.updatePharmacyPriceList(priceListObject);
            }
        }
    }
}
</script>