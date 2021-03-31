<template>
    <div>
        <div class="form-group">
            <label class="bmd-label-floating">{{label}}</label>
            <select
                multiple data-role="tagsinput"
                v-model="selectedValues"
                class="selectpicker form-control"
                data-style="btn btn-primary btn-round"
            >
                <option v-for="(option, index) in options" :value="option.value" :key="index">{{option.label}}</option>
            </select>
        </div>
    </div>

</template>
    
<script>

const $ = window.$;

export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        value: {
            type: Array,
            default: () => []
        },
        options: {
            type: Array,
            default: () => []
        }
    },

    data: function() {
        return {
            selectedValues: []
        }
    },
    
    watch: {
        options(opts) {
            this.options = opts;
            this.$nextTick(function() { $('.selectpicker').selectpicker('refresh'); });

        },
        selectedValues(values) {
            this.$emit('input', values);
        }
    }
}
</script>

<style>

</style>