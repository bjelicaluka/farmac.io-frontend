<template>
    <div>
        <ModalCloser>
            <Button className="btn btn-secondary">
                No
            </Button>
        </ModalCloser>

        <ModalCloser>
            <Button @click="emitYes">
                Yes
            </Button>
        </ModalCloser>
    </div>
</template>

<script>

import ModalCloser from './ModalCloser.vue';
import Button from '../Form/Button.vue';

export default {
    components: {
        ModalCloser,
        Button
    },
    methods: {
        emitYes(e) {
            e.preventDefault();
            this.$emit('yes', e);
        }
    }
}
</script>