<template>
    <button
        :class="className"
        :type="type"
        @click="emitClick"
    >
        <slot />
    </button>
</template>

<script>

export default {
    props: {
        className: {
            type: String,
            default: 'btn btn-primary'
        },
        type: {
            type: String,
            default: 'button'
        }
    },
    methods: {
        emitClick(e) {
            this.$emit('click', e);
        }
    }
}
</script>