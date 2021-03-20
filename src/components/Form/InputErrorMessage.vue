<template>
    <div v-if="!isValid" align="center">
        <p class="text-danger mb-0">
            <small>
                <slot />
            </small>
        </p>
    </div>
</template>

<script>

export default {
    props: ['isValid']
}
</script>

<style>

</style>