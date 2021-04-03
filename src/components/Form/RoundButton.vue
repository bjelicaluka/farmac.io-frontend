<template>
    <Button
        :title="title"
        :className="'btn btn-primary btn-sm btn-just-icon btn-round btn ' + type"
        @click="emitClick"
    >
        <i class="material-icons">{{iconName}}</i>
    </Button>
</template>

<script>

import Button from './Button.vue'

export default {
    components: {
        Button
    },
    props: ['title', 'iconName', 'type'],
    methods: {
        emitClick(e) {
            this.$emit('click', e);
        }
    }
}
</script>
