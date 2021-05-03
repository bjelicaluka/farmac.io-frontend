<template>
    <Form @submit="onSubmit($event)">
        <FormGroup>
            <FormRow>
                <div class='col-6'>
                    <NumberInput
                        label="Consultation points"
                        v-model="loyaltyPoints.consultationPoints"
                        :isValid="!isNaN(loyaltyPoints.consultationPoints)"
                        :showErrorMessage="showErrorMessage"
                        errorMessage="Consultation points must be greater or equal to 0."
                        :min=0
                        :max=100
                    />
                </div>

                <div class='col-6'>
                    <NumberInput
                        label="Examination points"
                        v-model="loyaltyPoints.examinationPoints"
                        :isValid="!isNaN(loyaltyPoints.examinationPoints)"
                        :showErrorMessage="showErrorMessage"
                        errorMessage="Examination points must be greater or equal to 0."
                        :min=0
                        :max=100
                    />
                </div>
            </FormRow>

            <Form @submit="addMedicinePoints">
                <FormRow>
                    <div class='col-5'>
                        <SelectOptionInput
                            label="Medicine"
                            v-model="medicinePoints.medicineId"
                            :options="medicines"
                        />
                    </div>

                    <div class='col-5'>
                        <NumberInput
                            label="Points"
                            v-model="medicinePoints.points"
                            :min=1
                            :max=100
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
                            Medicine points must be greater than 0.
                        </small>
                    </div>
                </FormRow>
            </Form>

            <FormRow>
                <div class='col-12'>
                    <Card title="Medicine Points" v-if="loyaltyPoints.medicinePointsList.length !== 0">
                        <Table>
                            <TableHead :columnNames="['Name', 'Points']"></TableHead>
                                <TableBody>
                                    <TableRow 
                                        v-for="(medicinePoints, i) in loyaltyPoints.medicinePointsList"
                                        :key="i"
                                        :values="[getMedicineName(medicinePoints.medicineId), medicinePoints.points]"
                                    >
                                        <div class="pull-right text-gray">
                                            <DropdownMenu name="Delete">
                                                <DropdownItem @click="deletePoints(medicinePoints.medicineId)">Delete</DropdownItem>
                                            </DropdownMenu>
                                        </div>
                                    </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </FormRow>
        </FormGroup>
        <Button class="pull-right" @click="showErrorMessage = true" type="submit">Save</Button>
    </Form>
</template>

<script>

import Card from '../Card/Card'
import Form from '../Form/Form'
import FormGroup from '../Form/FormGroup'
import FormRow from '../Form/FormRow'
import NumberInput from '../Form/NumberInput'
import Button from '../Form/Button'
import SelectOptionInput from '../Form/SelectOptionInput'
import Table from '../Table/Table.vue'
import TableHead from '../Table/TableHead.vue'
import TableBody from '../Table/TableBody.vue'
import TableRow from '../Table/TableRow.vue'
import DropdownMenu from '../DropdownMenu/DropdownMenu'
import DropdownItem from '../DropdownMenu/DropdownItem'


import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'

const initialMedicinePoints = {
    medicineId: '',
    points: 0
}

const initialLoyaltyPoints = {
    consultationPoints: 0,
    examinationPoints: 0,
    medicinePointsList: []
}

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
        NumberInput,
        DropdownMenu,
        DropdownItem
    },

    props: {
        existingLoyaltyPoints: {
            type: Object
        }
    },


    data: () => {
        return {
            medicinePoints: {...initialMedicinePoints},
            loyaltyPoints: {...initialLoyaltyPoints},
            medicines: [],
            showErrorMessage: false
        }
    },
    
    computed: {
        ...mapGetters({
            getMedicines: 'medicines/getMedicineOptions',
            result: 'loyaltyPoints/getResult'
        })
    },

    watch: {
        getMedicines(medicines) {
            this.medicines = medicines.map(m => { return { value: m.id, label: m.name } });
        },

        result({label, ok, message}) {
            if(label !== 'update')
                return;

            if(ok) {
                toastr.success(message);
            } else {
                toastr.error(message);
            }
        },

        existingLoyaltyPoints() {
            if(this.existingLoyaltyPoints) {
                this.loyaltyPoints = this.existingLoyaltyPoints;
            }
        }
    },

    methods: {
        ...mapActions({
            updateLoyaltyPoints: 'loyaltyPoints/updateLoyaltyPoints',
            fetchMedicines: 'medicines/fetchMedicineOptions'
        }),

        getMedicineName(medicineId) {
            return this.medicines.find(medicineOption => medicineOption.value === medicineId)?.label;
        },

        validateMedicinePoints() {
            const number = this.medicinePoints.points;
            return !!number && !(isNaN(number) || parseInt(number) <= 0)
        },

        addMedicinePoints() {
            if(!this.validateMedicinePoints()) return;

            const existingMedicinePoints = this.loyaltyPoints.medicinePointsList.find(m => m.medicineId === this.medicinePoints.medicineId);
            if(existingMedicinePoints) {
                existingMedicinePoints.points = this.medicinePoints.points;
            } else {
                this.loyaltyPoints.medicinePointsList.push({...this.medicinePoints});
            }

            this.medicinePoints = {...initialMedicinePoints};
        },

        deletePoints(medicineId) {
            this.loyaltyPoints.medicinePointsList = this.loyaltyPoints.medicinePointsList.filter(medicinePoints => medicinePoints.medicineId != medicineId);
        },

        onSubmit(e) {
            e.preventDefault();
           
            this.updateLoyaltyPoints({
                medicinePointsList: this.loyaltyPoints.medicinePointsList,
                examinationPoints: this.loyaltyPoints.examinationPoints,
                consultationPoints: this.loyaltyPoints.consultationPoints
            });
        }
    },

    mounted() {
        this.fetchMedicines();
    },
}
</script>