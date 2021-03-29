<template>
    <div>
        <div class="form-group">
            <label class="form-control-label text-white center">{{label}}</label>
            <select
                @change="emitChange"
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
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        emitChange(e) {
            this.$emit('input', e.target.value);
        }
    },

    watch: {
        options(opts) {
            this.options = opts;
            this.$nextTick(function() { $('.selectpicker').selectpicker('refresh'); });

        },

        value(val) {
            if(val) {
                const optionLabel = this.options.filter(p => { return p.value === val})[0].label;
                this.$nextTick(function() { $('.filter-option-inner-inner').text(optionLabel) });
            } else {
                $('.filter-option-inner-inner').text(this.label);
            }
            this.$nextTick(function() { $('.selectpicker').val(val) });
            this.value = val;
        }
    }
}
</script>

<style>

</style>