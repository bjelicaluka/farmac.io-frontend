<template>
    <div>
        <ModalCloser>
            <Button>
                OK
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
    }
}
</script>