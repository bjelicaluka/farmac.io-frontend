<template>
    <button
        :class="className || 'btn btn-primary'"
        :type="type || 'button'"
        @click="onClick"
    >
        <slot />
    </button>
</template>

<script>

export default {
    props: ['className', 'type', 'onClick']
}
</script>
