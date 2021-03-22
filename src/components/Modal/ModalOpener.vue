<template>
    <span data-toggle="modal" :data-target="'#' + modalBoxId">
        <slot />
    </span>
</template>

<script>

export default {
    props: ['modalBoxId']
}

</script>
