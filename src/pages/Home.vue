<template>
  <div class="content">
    <div class="container-fluid">
      <card :title="'Edit profile'" :description="'Uptade profile information'">
        <Form @submit="submitTest($event)">
          <form-group :title="'Test form group'">
            <form-row>
              <div class="col-5">
                <div class="form-group">
                  <label class="bmd-label-floating">Company</label>
                  <input type="text" class="form-control">
                </div>
              </div>
              <div class="col-7">
                <div class="form-group">
                  <label class="bmd-label-floating">Username</label>
                  <input type="text" class="form-control">
                </div>
              </div>
            </form-row>
            <div class="col-12">
              <div class="form-group">
                <label class="bmd-label-floating">Email address</label>
                <input type="email" class="form-control">
              </div>
            </div>
          </form-group>
          <button class="btn btn-primary pull-right" type="submit"> Test </button>
        </Form>
      </card>
    </div>

    <hr/>

    <Button
      type="button"
      className="btn btn-info"
      :onClick="onClick"
    >
      Click me!
    </Button>

    <ButtonWithIcon
      type="button"
      className="btn btn-primary btn-round"
      iconName="favorite"
      :onClick="onClick"
    >
      Favourite me!
    </ButtonWithIcon>

  </div>
</template>

<script>
import Card from '../components/Card/Card.vue'
import Form from '../components/Form/Form.vue'
import FormGroup from '../components/Form/FormGroup.vue';
import FormRow from '../components/Form/FormRow.vue'
import Button from '../components/Form/Button.vue'
import ButtonWithIcon from '../components/Form/ButtonWithIcon.vue'

export default {
  name: 'Home',
  components: {
    Form,
    Card,
    FormRow,
    FormGroup,
    Button,
    ButtonWithIcon
},
  methods: {
    submitTest(e) {
      console.log(e);
    },

    onClick(e) {
      e.preventDefault();
      console.log('hi');
    }
  }
}
</script>
