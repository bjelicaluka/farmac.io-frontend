<template>
    <div>
        <i class="material-icons text-gray">{{icon}}</i>
        <p class="d-lg-none d-md-block">
            {{name}}
        </p>
    </div>
</template>

<script>
export default {
    props: ["icon", "name"]
}
</script>

<style>

</style>