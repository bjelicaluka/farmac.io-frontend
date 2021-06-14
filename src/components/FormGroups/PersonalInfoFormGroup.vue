<template>
    <form-group :title="'Personal Info'">
        <form-row>
            <div class="col-4">
            <text-input
                label="First Name"
                v-model="user.firstName"
                :isValid="validateText(user.firstName)"
                :showErrorMessage="showErrorMessage"
                errorMessage="Please insert valid name."
            />
            </div>
            <div class="col-4">
            <text-input
                label="Last Name"
                v-model="user.lastName"
                :isValid="validateText(user.lastName)"
                :showErrorMessage="showErrorMessage"
                errorMessage="Please insert valid surname."
            />
            </div>
            <div class="col-4">
            <date-time-picker
                v-model="user.dateOfBirth"
                :isValid="validateDateOfBirth()"
                :showErrorMessage="showErrorMessage"
                label="Date of Birth"
                :errorMessage="dateOfBirthErrorMessage"
                type="date"
                id="patientDateOfBirth"
            />
            </div>
        </form-row>
        <form-row>
            <div class="col-7">
            <text-input
                label="PID"
                v-model="user.pid"
                :isValid="!!user.pid && user.pid.length === 13 && !isNaN(user.pid)"
                :showErrorMessage="showErrorMessage"
                errorMessage="Please insert valid PID."
            />
            </div>
            <div class="col-5">
            <text-input
                label="Phone Number"
                v-model="user.phoneNumber"
                :isValid="!!(user.phoneNumber) && !isNaN(user.phoneNumber)"
                :showErrorMessage="showErrorMessage"
                errorMessage="Please insert valid phone number."
            />
            </div>
        </form-row>
    </form-group>
</template>

<script>

import FormGroup from '../Form/FormGroup.vue'
import FormRow from '../Form/FormRow.vue'
import TextInput from '../Form/TextInput.vue'
import DateTimePicker from '../Form/DateTimePicker'
import { validateText } from '../../utils/validation'
import moment from 'moment';

export default {
    components: {
        FormGroup,
        FormRow,
        TextInput,
        DateTimePicker
    },

    props: {
        user: {
            type: Object,
            default: () => { return {
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                pid: '',
                phoneNumber: '',
            } }
        },
        isEdit: {
            type: Boolean,
            default: false
        },
        showErrorMessage: {
            type: Boolean,
            default: false
        }
    },

    data: function() {
        return {
            dateOfBirthErrorMessage: ''
        }
    },

    methods: {
        validateText(text) {
            return validateText(text);
        },
        validateDateOfBirth() {
            if(!this.user.dateOfBirth || moment().diff(this.user.dateOfBirth, 'years', false) < 13) {
                this.dateOfBirthErrorMessage = "You must be at least 13 years old.";
                return false;
            }

            if(moment('01 01 1900').isAfter(moment(this.user.dateOfBirth))) {
                this.dateOfBirthErrorMessage = "Date of birth must be after 1900.";
                return false;

            }
            this.dateOfBirthErrorMessage = '';
            return true;
        }
    }
}
</script>
