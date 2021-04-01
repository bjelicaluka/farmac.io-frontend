<template>
  <Form @submit="onSubmit($event)">

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

    <AddressFormGroup
      :address="user.address"
      :isEdit="isEdit"
      :showErrorMessage="showErrorMessage"
      modalBoxId="pharmacistModal"
    />

    <Button @click="showErrorMessage = true" type="submit">{{isEdit ? 'Update' : 'Register'}}</Button>
  </Form>
</template>

<script>

import Form from '../Form/Form'
import AccountInfoFormGroup from '../FormGroups/AccountInfoFormGroup'
import PersonalInfoFormGroup from '../FormGroups/PersonalInfoFormGroup'
import AddressFormGroup from '../FormGroups/AddressFormGroup'
import Button from '../Form/Button.vue';
import toastr from 'toastr'
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';

const initialUser = {
  firstName: null,
  lastName: null,
  dateOfBirth: null,
  pid: null,
  phoneNumber: null,
  pharmacyId: null,
  address: {
    lat: null,
    lng: null,
    state: null,
    city: null,
    streetName: null,
    streetNumber: null,
  }
};

const initialAccount = {
  username: null,
  email: null,
  password: null,
  confirmPassword: null,
}

export default {
  components: { Form, Button, AccountInfoFormGroup, PersonalInfoFormGroup, AddressFormGroup },

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
    },
    pharmacyId: {
      type: String
    }
  },

  data: () => {
    return {
      account: {...initialAccount},

      user: {...initialUser},
      
      showErrorMessage: false,
    }
  },

  computed: {
    ...mapGetters({
      result: 'pharmacist/getResult'
    })
  },

  watch: {
    result({label, ok, message}) {
      if(label === 'add' || label === 'update') {
        if(ok) {
          toastr.success(message);
        } else {
          toastr.error(message);
        }
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
    },
    pharmacyId() {
      this.user.pharmacyId = this.pharmacyId;
    }
  },

  methods: {
    ...mapActions({
      addPharmacist: 'pharmacist/addPharmacist',
      updatePharmacist: 'pharmacist/updatePharmacist',
    }),

    onSubmit(e) {
      e.preventDefault();
      this.showErrorMessage = true;
      const pharmacistObject = {
        account: {
          ...this.account
        },
        user: {
          ...this.user
        }
      };

      if(!this.isEdit) {
        pharmacistObject.user.pharmacyId = this.pharmacyId;
        this.addPharmacist(pharmacistObject);
      } else {
        this.updatePharmacist(pharmacistObject);
      }
    },

    setEdit() {
      if(!this.isEdit) {
        this.account = {...initialAccount};
        this.user = {...initialUser, pharmacyId: this.pharmacyId};
        return;
      }

      if(this.existingAccount) {
        this.account = this.existingAccount;
        this.account.confirmPassword = this.existingAccount.password;
      }
      if(this.existingUser) {
        this.user = this.existingUser;
        this.user.dateOfBirth = moment(this.existingUser.dateOfBirth).toDate();
      }
    }
  }
}
</script>

<style>

</style>