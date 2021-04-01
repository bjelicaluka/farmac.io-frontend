<template>
  <Form @submit="onSubmit">
      
    <AccountInfoFormGroup
      :account="account"
      :isEdit="isEdit"
      :showErrorMessage="showErrorMessage"
    />

    <PersonalInfoFormGroup
      :user="user"
      :isEdit="isEdit"
      :showErrorMessage="showErrorMessage"
    />

    <form-group :title="'Work place'">
      <form-row>
        <div class="col-12">
          <SelectOptionInput 
            label="Works in"
            v-model="user.pharmacyId"
            :options="pharmacies"
            :isValid="!!user.pharmacyId"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please select valid option"
            :disabled="isEdit"
          />
        </div>
      </form-row>
    </form-group>

    <AddressFormGroup
      :address="user.address"
      :isEdit="isEdit"
      :showErrorMessage="showErrorMessage"
      modalBoxId="pharmacyAdminModal"
    />

    <Button class="pull-right" @click="showErrorMessage = true" type="submit">{{isEdit ? 'Update' : 'Register'}}</Button>

  </Form>
</template>

<script>

import Form from '../Form/Form'
import FormGroup from '../Form/FormGroup.vue'
import FormRow from '../Form/FormRow.vue'
import SelectOptionInput from '../Form/SelectOptionInput'
import AccountInfoFormGroup from '../FormGroups/AccountInfoFormGroup'
import PersonalInfoFormGroup from '../FormGroups/PersonalInfoFormGroup'
import AddressFormGroup from '../FormGroups/AddressFormGroup'
import Button from '../Form/Button.vue';
import toastr from 'toastr'
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';

const initialAccount = {
  username: null,
  email: null,
  password: null,
  confirmPassword: null,
}

const initialUser = {
  firstName: null,
  lastName: null,
  dateOfBirth: null,
  pid: null,
  phoneNumber: null,
  address: {
    lat: null,
    lng: null,
    state: null,
    city: null,
    streetName: null,
    streetNumber: null,
  },
  pharmacyId: ''
};

export default {
  components: { Form, FormGroup, FormRow, SelectOptionInput, Button, AccountInfoFormGroup, PersonalInfoFormGroup, AddressFormGroup },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    existingAccount: {
      type: Object
    },
    existingUser: {
      type: Object
    }
  },

  data: () => {
    return {
      account: {...initialAccount},
      
      user: {...initialUser},

      pharmacies: [],

      showErrorMessage: false,
    }
  },

  computed: {
    ...mapGetters({
        getPharmacies: 'pharmacies/getPharmacies',
        result: 'pharmacyAdmins/getResult'
      }),

  },

  watch: {
    getPharmacies(pharmacies) {
      this.pharmacies = [ ...pharmacies.map(p => { return { value: p.id, label: p.name }; } ) ];
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
    existingAccount() {
      this.setEdit();
    },
    existingUser() {
      this.setEdit();
    }
  },

  methods: {
    ...mapActions({
      fetchPharmacies: 'pharmacies/fetchPharmacies',
      addPharmacyAdmin: 'pharmacyAdmins/addPharmacyAdmin',
      updatePharmacyAdmin: 'pharmacyAdmins/updatePharmacyAdmin'
    }),

    setEdit() {
      if(!this.isEdit) {
        this.account = {...initialAccount};
        this.user = {...initialUser};
        return;
      }
      
      if(this.existingAccount) {
        this.account = this.existingAccount;
        this.account.confirmPassword = this.existingAccount.password;
      }
      if(this.existingUser) {
        this.user = {
          ...this.existingUser,
          dateOfBirth: moment(this.existingUser.dateOfBirth).toDate()
        };
      }
    },

    onSubmit(e) {
      e.preventDefault();
      const pharmacyAdminObject = {
        account: {
          ...this.account
        },
        user: {
          ...this.user
        }
      };
      if(!this.isEdit) {
        this.addPharmacyAdmin(pharmacyAdminObject);
      } else {
        this.updatePharmacyAdmin(pharmacyAdminObject);
      }
    }
  },

  created() {
    this.fetchPharmacies();
    
  }
}
</script>

<style>
</style>