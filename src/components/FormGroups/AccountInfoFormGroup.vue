<template>
    <form-group :title="'Account Info'">
        <form-row>
            <div class="col-6">
            <text-input
                label="Username"
                v-model="account.username"
                :isValid="validateUsername(account.username)"
                :showErrorMessage="showErrorMessage"
                errorMessage="Username must be alphanumerical word."
                :disabled="isEdit"
            />
            </div>
            <div class="col-6">
            <text-input
                label="Email"
                v-model="account.email"
                :isValid="validateEmail(account.email)"
                :showErrorMessage="showErrorMessage"
                errorMessage="Please insert valid email."
                :disabled="isEdit"
            />
            </div>
        </form-row>

        <form-row v-if="!isEdit">
            <div class="col-6">
            <text-input
                label="Password"
                v-model="account.password"
                :isValid="validatePassword(account.password)"
                :showErrorMessage="showErrorMessage"
                errorMessage="Password must have at least 8 characters, special character and a number."
                type="password"
            />
            </div>
            <div class="col-6">
            <text-input
                label="Confirm Password"
                v-model="account.confirmPassword"
                :isValid="account.confirmPassword === account.password"
                :showErrorMessage="showErrorMessage"
                errorMessage="Passwords don't match."
                type="password"
            />
            </div>
        </form-row>
    </form-group>
</template>

<script>

import FormGroup from '../Form/FormGroup.vue'
import FormRow from '../Form/FormRow.vue'
import TextInput from '../Form/TextInput.vue'
import { validateAlphanumericalWord, validateEmail, validatePassword,  } from '../../utils/validation'

export default {
    components: {
        FormGroup,
        FormRow,
        TextInput
    },

    props: {
        account: {
            type: Object,
            default: () => { return {
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
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

    methods: {
        validateEmail(email) {
            return validateEmail(email);
        },
        validatePassword(password) {
            return validatePassword(password);
        },
        validateUsername(username) {
            return validateAlphanumericalWord(username);
        }
    }
}
</script>
