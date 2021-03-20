<template>
    <Button
        :type="type"
        :className="className"
        :onClick="onClick"
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
    props: ['className', 'type', 'iconName', 'onClick']
}
</script>
