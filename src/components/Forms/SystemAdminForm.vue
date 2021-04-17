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

    <AddressFormGroup
      :address="user.address"
      :isEdit="isEdit"
      :showErrorMessage="showErrorMessage"
      modalBoxId="systemAdminModal"
    />

    <Button class="pull-right" @click="showErrorMessage = true" type="submit">{{isEdit ? 'Update' : 'Register'}}</Button>

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
  }
};

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
    reactOnAction: {
      type: Boolean,
      default: true
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
        result: 'systemAdmins/getResult'
      }),
  },

  watch: {
    result({label, ok, message}) {
      if(!this.reactOnAction)
        return;

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
      addSystemAdmin: 'systemAdmins/addSystemAdmin',
      updateSystemAdmin: 'systemAdmins/updateSystemAdmin'
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
      const systemAdminObject = {
        account: {
          ...this.account
        },
        user: {
          ...this.user
        }
      };
      if(!this.isEdit) {
        this.addSystemAdmin(systemAdminObject);
      } else {
        this.updateSystemAdmin(systemAdminObject);
      }
    }
  }
}
</script>

<style>
</style>