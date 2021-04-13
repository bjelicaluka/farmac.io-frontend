<template>
    <Form @submit="handleChangePassword">
        <form-row>
            <div class="col-1" />
            <div class="col-10">
                <text-input 
                    label="Current password"
                    v-model="currentPassword"
                    type="password"
                />
            </div>
            <div class="col-1" />
        </form-row>

        <form-row>
            <div class="col-1" />
            <div class="col-5">
                <text-input 
                    label="New Password"
                    v-model="newPassword"
                    :isValid="validatePassword(newPassword)"
                    :showErrorMessage="showErrorMessage"
                    errorMessage="Password must have at least 8 characters, special character and a number."
                    type="password"
                />
            </div>

            <div class="col-5">
                <text-input 
                    label="Confirm New Password"
                    v-model="repeatedPassword"
                    :isValid="newPassword === repeatedPassword"
                    :showErrorMessage="showErrorMessage"
                    errorMessage="Passwords don't match."
                    type="password"
                />
            </div>
            <div class="col-1" />

        </form-row>

        <Button @click="showErrorMessage = true" type="submit">Change</Button>

    </Form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { validatePassword,  } from '../../utils/validation'
import { removeToken, getAccountIdFromToken } from '../../utils/token'

import Button from '../Form/Button.vue'
import Form from '../Form/Form.vue'
import FormRow from '../Form/FormRow.vue'
import TextInput from '../Form/TextInput.vue'

import { getShouldChangePassword } from '../../utils/token'
import toastr from 'toastr'

export default {
   components: {
       Form,
       FormRow,
       TextInput,
       Button
    },

    data: function() {
        return {
            currentPassword: '',
            newPassword: '',
            repeatedPassword: '',
            showErrorMessage: false
        }
    },

    computed: {
        ...mapGetters({result: 'authentication/getResult'})
    },

    watch: {
        result({ok, message, label}) {
            if(label !== 'changePassword') 
                return;

            if(ok) {
                toastr.success(message);
                this.$store.dispatch('authentication/logOut');
                this.$router.push('/auth');
            } else {
                toastr.error(message);
            }
            
        }
    },

    methods: {
        ...mapActions({ changePassword: 'authentication/changePassword' }),

        handleChangePassword() {
            const id = getAccountIdFromToken();
            const newPassword = this.newPassword;
            const currentPassword = this.currentPassword;

            this.changePassword({id, newPassword, currentPassword});
        },

        validatePassword(password) {
            return validatePassword(password);
        }
    },

    mounted() {
        if(getShouldChangePassword()) {
            toastr.info("You have to change your password since this is your first login.");
        }
    }
}

</script>
