<template>
    <button
        :class="className || 'btn btn-primary'"
        :type="type || 'button'"
        @click="handleClick"
    >
        <slot />
    </button>
</template>

<script>

export default {
    props: ['className', 'type', 'onClick'],
    methods: {
        handleClick(e) {
            if (this.onClick !== undefined && this.onClick !== null) {
                this.onClick(e);
            }
        }
    }
}
</script>