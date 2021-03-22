<template>
    <div>
        <div class="form-group">
            <label class="form-control-label text-white center">{{label}}</label>
            <select
                @change="emitChange"
                class="selectpicker form-control"
                data-style="btn btn-primary btn-round"
            >
                <option value='' selected>{{label}}</option>
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
    props: {
        label: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        },
        isValid: {
            type: Boolean,
            default: true
        },
        options: {
            type: Array,
            default: () => []
        },
        showErrorMessage: {
            type: Boolean,
            default: false
        },
        errorMessage: {
            type: String,
            default: 'You have to select a valid option.'
        }
    },

    methods: {
        emitChange(e) {
            this.$emit('input', e.target.value);
        }
    }
}
</script>

<style>

</style>