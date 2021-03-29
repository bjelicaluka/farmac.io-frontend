<template>
    <div>
        <i :class="`material-icons ${textColor}`">{{icon}}</i>
        <p class="d-lg-none d-md-block">
            {{name}}
        </p>
    </div>
</template>

<script>
export default {
    props: {
        icon: {},
        name: {},
        textColor: {
            default: 'text-gray'
        }
    }
}
</script>

<style>

</style>