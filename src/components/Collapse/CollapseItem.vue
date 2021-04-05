<template>
    <div class="card card-collapse">
        <div class="card-header" role="tab">
        <h5 class="mb-0">
            <a data-toggle="collapse" :href="'#' + id" aria-expanded="true" :aria-controls="id">
            {{label}}
            <i class="material-icons">keyboard_arrow_down</i>
            </a>
        </h5>
        </div>

        <div :id="id" class="collapse show" role="tabpanel">
        <div class="card-body">
            <slot />
        </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        id: {
            type: String
        },
        label: {
            type: String
        }
    }
}
</script>
