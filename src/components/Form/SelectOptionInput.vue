<template>
    <div>
        <div :id="id" class="form-group">
            <label v-if="showLabel" class="form-control-label text-white center">{{label}}</label>
            <select
                v-model="selectedValue"
                class="selectpicker form-control"
                data-style="btn btn-primary btn-round"
                :disabled="disabled"
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

const $ = window.$;

export default {
    components: {
        InputErrorMessage
    },

    props: {
        id: {
            type: String,
            default: 'single'
        },
        label: {
            type: String,
            default: ''
        },
        value: {
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
        },
        disabled: {
            type: Boolean,
            default: false
        },
        showLabel: {
            type: Boolean,
            default: true,
        }
    },

    data: function() {
        return {
            selectedValue: ''
        }
    },

    watch: {
        options(opts) {
            this.options = opts;
            this.$nextTick(function() { $(`#${this.id} .selectpicker`).selectpicker('refresh'); });

        },

        selectedValue(value) {
            this.$emit('input', value);
        },

        value(val) {
            this.selectedValue = val;
            this.$nextTick(function() { $(`#${this.id} .selectpicker`).selectpicker('refresh'); });
        },
    }
}
</script>

<style>

</style>