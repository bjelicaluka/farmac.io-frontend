<template>
    <Form @submit="onSubmit($event)">
        <Collapse>
            <CollapseItem
                label="General informations"
                id="generalInfo"
            >
                <div class="container-fluid">
                    <FormGroup>
                        <FormRow>
                            <div class='col-7'>
                            <TextInput
                                label="Name"
                                v-model="medicine.name"
                                :isValid="!!medicine.name"
                                :showErrorMessage="showErrorMessage"
                                errorMessage="Name must be provided."
                            />
                            </div>
                            <div class='col-5'>
                            <TextInput
                                label="Code"
                                v-model="medicine.uniqueId"
                                :isValid="validateCode(medicine.uniqueId)"
                                :showErrorMessage="showErrorMessage"
                                errorMessage="Code must be 10 characters alphanumerical word."
                            />
                            </div>
                        </FormRow>

                        <FormRow>
                            <div class='col-7'>
                                <TextInput
                                    label="Manufacturer"
                                    v-model="medicine.manufacturer"
                                    :isValid="!!medicine.manufacturer"
                                    :showErrorMessage="showErrorMessage"
                                    errorMessage="Manufacturer must be provided."
                                />
                            </div>
                            <div class='col-5'>
                                <label class="bmd-label-floating">Only for recipe?</label>
                                <br/>
                                <br/>
                                <div class="togglebutton">
                                    <label>
                                        <input v-model="medicine.isRecipeOnly" type="checkbox">
                                        <span class="toggle"></span>
                                        {{medicine.isRecipeOnly ? 'Yes' : 'No'}}
                                    </label>
                                </div>
                            </div>
                        </FormRow>
                        
                        <FormRow>
                            <div class='col-7'>
                            <TextInput
                                label="Type"
                                v-model="medicine.type"
                                :isValid="!!medicine.type"
                                :showErrorMessage="showErrorMessage"
                                errorMessage="Type must be provided."
                            />
                            </div>
                            <div class='col-5'>
                                <SelectOptionInput 
                                    label="Form"
                                    v-model="medicine.form"
                                    :isValid="!!medicine.form"
                                    :options="formOptions"
                                    :showErrorMessage="showErrorMessage"
                                    errorMessage="Please select valid option"
                                />

                            </div>
                        </FormRow>
                    </FormGroup>
                </div>
            </CollapseItem>

            <CollapseItem
                label="Informations about consuming"
                id="consumingInfo"
            >
                <div class="container-fluid">
                    <FormGroup>
                        <FormRow>
                            <div class='col-12'>
                                <TextInput
                                    label="Recommended dose"
                                    v-model="medicine.recommendedDose"
                                    :isValid="!!medicine.recommendedDose"
                                    :showErrorMessage="showErrorMessage"
                                    errorMessage="Recommended dose must be provided."
                                />
                            </div>
                        </FormRow>

                        <FormRow>
                            <div class='col-12'>
                                <TextArea
                                    label="Contraindications"
                                    rows="7"
                                    v-model="medicine.contraindications"
                                    :isValid="!!medicine.contraindications"
                                    :showErrorMessage="showErrorMessage"
                                    errorMessage="Contraindications must be provided."
                                />
                            </div>
                        </FormRow>
                        
                        <FormRow>
                            <div class='col-12'>
                                <TextArea
                                    label="Additional informations"
                                    rows="5"
                                    v-model="medicine.additionalInfo"
                                    :isValid="!!medicine.additionalInfo"
                                    :showErrorMessage="showErrorMessage"
                                    errorMessage="Additional informations must be provided."
                                />
                            </div>
                        </FormRow>
                    </FormGroup>
                </div>
            </CollapseItem>

            <CollapseItem
                label="Composition and replacements"
                id="compositionInfo"
            >
                <div class="container-fluid">
                    <FormGroup>
                        <Form @submit="addIngridient">
                            <FormRow>
                                <div class='col-5'>
                                    <TextInput
                                        label="Ingridient name"
                                        v-model="ingridient.name"
                                    />
                                </div>

                                <div class='col-5'>
                                    <TextInput
                                        label="Mass (mg)"
                                        v-model="ingridient.mass"
                                    />
                                </div>
                                
                                <div class='col-2'>
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
                                        Name must be provided.
                                    </small>
                                </div>
                                <div class='col-5'>
                                    <small class="form-text text-muted">
                                        Mass must be positive number.
                                    </small>
                                </div>
                            </FormRow>
                        </Form>

                        <FormRow>
                            <div class='col-12'>
                                <Card title="Ingridients" v-if="medicine.ingridients.length !== 0">
                                    <Table>
                                        <TableHead :columnNames="['Ingridient name', 'Mass (mg)', '']"></TableHead>
                                            <TableBody>
                                                <TableRow v-for="(ingridient, index) in medicine.ingridients" :key="index" :values="[ingridient.name, ingridient.mass]">
                                                    <a class="btn btn-primary btn-sm btn-just-icon btn-round btn" rel="tooltip" title="Remove" @click="removeIngridient(ingridient.name)">
                                                        <i class="material-icons">clear</i>
                                                    </a>
                                                </TableRow>
                                        </TableBody>
                                    </Table>
                                </Card>
                            </div>
                        </FormRow>

                        <FormRow>
                            <div class='col-12'>
                                <MultiSelectOptionInput
                                    label="Select replacements"
                                    :options="medicines"
                                    v-model="medicine.replacements"
                                />
                            </div>
                        </FormRow>

                    </FormGroup>
                </div>
            </CollapseItem>

        </Collapse>
        <br/>
        <br/>
        <Button class="pull-right" @click="showErrorMessage = true" type="submit">Create</Button>
    </Form>
</template>

<script>

import Collapse from '../Collapse/Collapse'
import CollapseItem from '../Collapse/CollapseItem'
import Card from '../Card/Card'
import Form from '../Form/Form'
import FormGroup from '../Form/FormGroup'
import FormRow from '../Form/FormRow'
import TextInput from '../Form/TextInput'
import Button from '../Form/Button'
import SelectOptionInput from '../Form/SelectOptionInput'
import MultiSelectOptionInput from '../Form/MultiSelectOptionInput'
import TextArea from '../Form/TextArea'
import Table from '../Table/Table.vue'
import TableHead from '../Table/TableHead.vue'
import TableBody from '../Table/TableBody.vue'
import TableRow from '../Table/TableRow.vue'

import { validateAlphanumericalWord } from '../../utils/validation'
import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'

const formOptions = [
    { value: 'Powder', label: 'Powder' },
    { value: 'Capsule', label: 'Capsule' },
    { value: 'Tablet', label: 'Tablet' },
    { value: 'Mast', label: 'Mast' },
    { value: 'Pasta', label: 'Pasta' },
    { value: 'Gel', label: 'Gel' },
    { value: 'Syrup', label: 'Syrup' },
    { value: 'Solution', label: 'Solution' },
    { value: 'Other', label: 'Other' }
]

const initialMedicine = {
    name: '',
    uniqueId: '',
    type: '',
    form: '',
    manufacturer: '',
    isRecipeOnly: false,
    recommendedDose: '',
    contraindications: '',
    additionalInfo: '',
    replacements: [],
    ingridients: []
};

export default {
    components: {
        Collapse,
        CollapseItem,
        Card,
        Form,
        FormGroup,
        FormRow,
        TextInput,
        Button,
        SelectOptionInput,
        MultiSelectOptionInput,
        TextArea,
        Table,
        TableHead,
        TableBody,
        TableRow
    },

    data: function() {
        return {
            medicine: {...initialMedicine},

            formOptions: formOptions,

            ingridient: {
                name: '',
                mass: ''
            },

            medicines: [],

            showErrorMessage: false
        }
    },
    
    computed: {
        ...mapGetters({
            getMedicines: 'medicines/getMedicines',
            result: 'medicines/getResult'
        })
    },

    watch: {
        getMedicines(medicines) {
            this.medicines = medicines.map(m => { return { value: m.id, label: m.name } });
        },

        result({label, ok, message}) {
            if(label !== 'add')
                return;

            if(ok) {
                toastr.success(message);
            } else {
                toastr.error(message);
            }
        }
    },

    methods: {
        ...mapActions({ addMedicine: 'medicines/addMedicine'}),

        validateCode(word) {
            return validateAlphanumericalWord(word) && word.length === 10;
        },

        addIngridient() {
            if(this.ingridient.name.trim().length === 0 || this.ingridient.mass.trim().length === 0 || isNaN(this.ingridient.mass) || parseFloat(this.ingridient.mass) <= 0) {
                return;
            }

            const existingIngridient = this.medicine.ingridients.filter(i => i.name === this.ingridient.name);
            if(existingIngridient.length !== 0) {
                existingIngridient[0].mass = parseFloat(existingIngridient[0].mass) + parseFloat(this.ingridient.mass)
            } else {
                this.medicine.ingridients.push({name: this.ingridient.name, massInMilligrams: this.ingridient.mass });
            }
            this.ingridient.name = '';
            this.ingridient.mass = '';
            this.showIngridientErrorMessage = false;
        },

        removeIngridient(name) {
            this.medicine.ingridients = this.medicine.ingridients.filter(i => i.name !== name );
        },

        onSubmit(e) {
            e.preventDefault();
            const medicineObject = {
                name: this.medicine.name,
                uniqueId: this.medicine.uniqueId,
                type: {
                    typeName: this.medicine.type
                },
                form: this.medicine.form,
                manufacturer: this.medicine.manufacturer,
                isRecipeOnly: this.medicine.isRecipeOnly,
                recommendedDose: this.medicine.recommendedDose,
                contraindications: this.medicine.contraindications,
                additionalInfo: this.medicine.additionalInfo,
                medicineIngredients: this.medicine.ingridients,
                replacements: this.medicine.replacements.map(repId => { return { ReplacementMedicineId: repId } } )
            };

            this.addMedicine(medicineObject);   
        }
    }
}
</script>