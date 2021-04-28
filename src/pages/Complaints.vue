<template>
    
    <div class="content">
        <div class="container-fluid">
            <div class="row justify-content-center align-items-center">
            <Form @submit="handleSubmit" class="col-7">
                <FormGroup>
                    <SelectOptionInput
                        label="Complaint about"
                        :showLabel=false
                        v-model="selectedComplaintAbout"
                        :options="complaintAboutOptions"
                        :isValid="!!selectedComplaintAbout"
                    />

                    <SelectOptionInput
                        :label="complaintForLabel"
                        :showLabel=false
                        v-model="selectedComplaintFor"
                        :options="complaintForOptions"
                        :isValid="!!selectedComplaintFor"
                    />
                </FormGroup>
                <FormGroup>
                    <TextArea
                        label="Complaint text"
                        placeholder="Write you complaint here."
                        v-model="complaintText"
                        :isValid="!!complaintText"
                        :showErrorMessage="showErrorMessage"
                        errorMessage="Your complaint cannot be empty."
                    >
                    </TextArea>
                
                </FormGroup>

                <Button class="pull-right" @click="showErrorMessage = true" type="submit">Complaint</Button>

            </Form>
            
            </div>
        </div>
    </div>
</template>

<script>

const complaintAboutOptions = [
    {
        label: 'Dermatologist',
        value: 'Dermatologist'
    },
    {
        label: 'Pharmacist',
        value: 'Pharmacist'
    },
    {
        label: 'Pharmacy',
        value: 'Pharmacy'
    }
]

import Form from '../components/Form/Form'
import FormGroup from '../components/Form/FormGroup'
import SelectOptionInput from '../components/Form/SelectOptionInput'
import TextArea from '../components/Form/TextArea'
import Button from '../components/Form/Button'

import { mapActions, mapGetters } from 'vuex'
import { getUserIdFromToken } from '../utils/token'
import toastr from 'toastr'

export default {
    
    components: {
        Form,
        FormGroup,
        SelectOptionInput,
        TextArea,
        Button
    },

    data: function() {
        return {
            complaintAboutOptions,
            selectedComplaintAbout: null,
            complaintForLabel: 'No one to complaint about',
            complaintForOptions: [],
            showErrorMessage: false,
            selectedComplaintFor: null,
            complaintText: '',
            userId: null
        }
    },

    computed: {
        ...mapGetters({
            dermatologistsToComplaintAbout: 'complaints/getDermatologistsToComplaintAbout',
            pharmacistsToComplaintAbout: 'complaints/getPharmacistsToComplaintAbout',
            pharmaciesToComplaintAbout: 'complaints/getPharmaciesToComplaintAbout',
            result: 'complaints/getResult'
        })
    },

    methods: {
        ...mapActions({
            fetchDermatologistsToComplaintAbout: 'complaints/fetchDermatologistsToComplaintAbout',
            fetchPharmacistsToComplaintAbout: 'complaints/fetchPharmacistsToComplaintAbout',
            fetchPharmaciesToComplaintAbout: 'complaints/fetchPharmaciesToComplaintAbout',
            createComplaintAboutDermatologist: 'complaints/createComplaintAboutDermatologist',
            createComplaintAboutPharmacist: 'complaints/createComplaintAboutPharmacist',
            createComplaintAboutPharmacy: 'complaints/createComplaintAboutPharmacy'

        }),

        getFetchComplaintAboutMethod(complaintAbout) {
            const fetchActions = {
                'Dermatologist': this.fetchDermatologistsToComplaintAbout,
                'Pharmacist': this.fetchPharmacistsToComplaintAbout,
                'Pharmacy': this.fetchPharmaciesToComplaintAbout
            }

            return fetchActions[complaintAbout];
        },

        getCreateComplaintAboutMethod(complaintAbout) {
            const createComplaintActions = {
                'Dermatologist': this.createComplaintAboutDermatologist,
                'Pharmacist': this.createComplaintAboutPharmacist,
                'Pharmacy': this.createComplaintAboutPharmacy
            };

            return createComplaintActions[complaintAbout];
        },

        getCreateComplaintRequest() {
            if(this.selectedComplaintAbout === 'Dermatologist') {
                return {
                    writerId: this.userId,
                    text: this.complaintText,
                    dermatologistId: this.selectedComplaintFor
                };
            }

            if(this.selectedComplaintAbout === 'Pharmacist') {
                 return {
                    writerId: this.userId,
                    text: this.complaintText,
                    pharmacistId: this.selectedComplaintFor
                };
            }

            if(this.selectedComplaintAbout === 'Pharmacy') {
                 return {
                    writerId: this.userId,
                    text: this.complaintText,
                    pharmacyId: this.selectedComplaintFor
                };
            }
        },

        handleSubmit() {
            const createComplaintAction = this.getCreateComplaintAboutMethod(this.selectedComplaintAbout);
            const createComplaintRequest = this.getCreateComplaintRequest();
            createComplaintAction(createComplaintRequest);
        }
    },

    watch: {
        complaintForOptions() {
            this.selectedComplaintFor = '';
            if(this.complaintForOptions.length) {
                this.complaintForLabel = 'Complaint for';
            } else {
                this.complaintForLabel = 'No one to complaint about'
            }
        },

        selectedComplaintAbout() {
            this.complaintText = '';
            this.showErrorMessage = false;

            if(this.selectedComplaintAbout) {
                const fetchMethod = this.getFetchComplaintAboutMethod(this.selectedComplaintAbout);
                fetchMethod(this.userId);
            } else {
                this.complaintForOptions = [];
            }
        },

        selectedComplaintFor() {
            this.showErrorMessage = false;
        },

        dermatologistsToComplaintAbout(dermatologists) {
            this.complaintForOptions = dermatologists.map(dermatologist => {
                return {
                    label: `${dermatologist.firstName} ${dermatologist.lastName}`,
                    value: dermatologist.id
                }
            });
        },

        pharmacistsToComplaintAbout(pharmacists) {
            this.complaintForOptions = pharmacists.map(pharmacist => {
                return {
                    label: `${pharmacist.firstName} ${pharmacist.lastName}`,
                    value: pharmacist.id
                }
            });
        },

        pharmaciesToComplaintAbout(pharmacies) {
            this.complaintForOptions = pharmacies.map(pharmacy => {
                return {
                    label: pharmacy.name,
                    value: pharmacy.id
                }
            });
        },

        result({label, ok, message}) {
            if(label !== 'createComplaint')
                return;

            if(ok) {
                toastr.success(message);
                this.showErrorMessage = false;
            } else {
                toastr.error(message);
            }
        }
    },

    mounted() {
        this.userId = getUserIdFromToken();
    }

}
</script>
