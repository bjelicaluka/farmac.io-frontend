<template>    
    <div class="modal fade " :id="modalBoxId" tabindex="-1" role="dialog" aria-hidden="true">
        <div :class="'modal-dialog ' + sizeClass" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{title}}</h5>
                    <ModalCloser>
                        <span class="close" aria-label="Close" aria-hidden="true">&times;</span>
                    </ModalCloser>
                </div>
                <div class="modal-body">
                    <slot name="body" />
                </div>
                <div class="modal-footer">
                    <slot name="buttons" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import ModalCloser from './ModalCloser.vue'

export default {
    components: {
        ModalCloser
    },
    props: {
        modalBoxId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        sizeClass: {
            size: String,
            default: ''
        }
    }
}

</script>
