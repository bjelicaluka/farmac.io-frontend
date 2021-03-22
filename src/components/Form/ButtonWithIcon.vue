<template>
    <Button
        :type="type"
        :className="className"
        @click="emitClick"
    >
        <i class="material-icons">{{iconName}}</i>
        <slot />
    </Button>
</template>

<script>

import Button from './Button.vue'

export default {
    components: {
        Button
    },
    props: ['className', 'type', 'iconName'],
    methods: {
        emitClick(e) {
            this.$emit('click', e);
        }
    }
}
</script>
