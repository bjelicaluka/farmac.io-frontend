<template>
  <div class="content">
    <div class="container-fluid">
      <card :title="'Edit profile'" :description="'Uptade profile information'">
        <Form @submit="submitTest($event)">
          <form-group :title="'Test form group'">
            <form-row>
              <div class="col-5">
                <text-input 
                  label="Company"
                  v-model="company"
                  :isValid="!!company"
                  :showErrorMessage="showErrorMessage"
                  errorMessage="Lalapo error message."
                  type="text"
                />
              </div>
              <div class="col-7">
                <div class="form-group">
                  <label class="bmd-label-floating">Username</label>
                  <input type="text" class="form-control">
                </div>
              </div>
            </form-row>
            <form-row>
              <div class="col-12">
              <div class="form-group">
                <label class="bmd-label-floating">Email address</label>
                <input type="email" class="form-control">
              </div>
            </div>
            </form-row>
            <form-row>
              <SelectOptionInput
                label="Select you favourite food"
                :isValid="isValid"
                :onChange="onChange"
                :options="options"
                :showErrorMessage="showErrorMessage"
                errorMessage="That is not food"
              >
              </SelectOptionInput>
            </form-row>
          </form-group>
          <button class="btn btn-primary pull-right" type="submit"> Test </button>
        </Form>

        <Button
        type="button"
        className="btn btn-info"
        @click="toggleError"
        >
          Toggle showErrorMessage! {{showErrorMessage}}
        </Button>

        <ButtonWithIcon
          type="button"
          className="btn btn-primary btn-round"
          iconName="favorite"
          @click="toggleIsValid"
        >
          Toggle isValid! {{isValid}}
        </ButtonWithIcon>
          </card>
        </div>

    <div class="container-fluid">
      <Card>
        <example/>
      </Card>
    </div>

    <Modal
      modalBoxId="exampleModal"
      title="Example modal"
    >
      <div slot="body">
        <p>Do you want save this?</p>
		<img src="https://i.ibb.co/ykn7k1y/New-Project-1.png"/>
      </div>

      <div slot="buttons">
        <OptionModalButtons @yes="onYes"/>
      </div>
    </Modal>

    <ModalOpener modalBoxId="exampleModal">
        <Button>Launch Demo Modal</Button>
    </ModalOpener>

    </div>
</template>

<script>
import Card from '../components/Card/Card.vue'
import Form from '../components/Form/Form.vue'
import FormGroup from '../components/Form/FormGroup.vue';
import FormRow from '../components/Form/FormRow.vue'
import Example from '../components/Table/Example.vue'
import Button from '../components/Form/Button.vue'
import ButtonWithIcon from '../components/Form/ButtonWithIcon.vue'
import SelectOptionInput from '../components/Form/SelectOptionInput.vue'
import Modal from '../components/Modal/Modal.vue'
import ModalOpener from '../components/Modal/ModalOpener.vue'
import OptionModalButtons from '../components/Modal/OptionModalButtons.vue'
import TextInput from '../components/Form/TextInput.vue';

let selectOptions = [
  {
    value: 1,
    label: 'Palacinke'
  },
  {
    value: 2,
    label: 'Rostilj iz leskovac'
  },
  {
    value: 3,
    label: 'Pica'
  }
];

export default {
  data: function() {
    return {
      isValid: false,
      showErrorMessage: false,
      options: selectOptions,
      value: '',
      company: ""
    }
  },
  name: 'Home',
  components: {
    Form,
    Card,
    FormRow,
    FormGroup,
    Example,
    Button,
    ButtonWithIcon,
    SelectOptionInput,
    Modal,
    ModalOpener,
    OptionModalButtons,
    TextInput,
  },
  methods: {
    submitTest(e) {
      console.log(e);
      console.log(this.company)
      this.showErrorMessage = true;
    },

    toggleError(e) {
      e.preventDefault();
      this.showErrorMessage = !this.showErrorMessage;
    },

    toggleIsValid(e) {
      e.preventDefault();
      this.isValid = !this.isValid;
    },

    onChange(e) {
      this.value = e.target.value;
      console.log(this.value);
    },

    onYes(e) {
      console.log("CAOOO");
    }
  }
}
</script>
