<template>
    <div class="col-lg-2 col-md-6 col-sm-3">
        <div class="form-group">
            <label class="form-control-label text-white center">{{label}}</label>
            <select
                @change="onChange"
                class="selectpicker form-control"
                data-style="btn btn-primary btn-round"
            >
                <option value="''" selected>{{label}}</option>
                <option v-for="(option, index) in options" :value="option.value" :key="index">{{option.label}}</option>
            </select>
        </div>
        <InputErrorMessage
            :isValid="showErrorMessage ? isValid : true"
        >
            {{errorMessage}}
        </InputErrorMessage>
    </div>

</template>
    
<script>
import InputErrorMessage from './InputErrorMessage.vue'

export default {
    components: {
        InputErrorMessage
    },
    props: ['label', 'isValid', 'onChange', 'options', 'showErrorMessage', 'errorMessage']
    
}
</script>

<style>

</style>