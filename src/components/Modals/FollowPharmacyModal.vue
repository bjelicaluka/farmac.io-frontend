<template>
    <Modal title="Confirmation" :modalBoxId="modalBoxId" >
        <div slot="body">
            Are you sure that you want to follow {{pharmacyName}}?
            Following pharmacy means that you will get email notification every time there is a new promotion.
        </div>
        <div slot="buttons">
            <OptionModalButtons @yes="$emit('yes')" />
        </div>
    </Modal>
</template>

<script>

import Modal from '../Modal/Modal'
import OptionModalButtons from '../Modal/OptionModalButtons'


export default {

    props: [
        'modalBoxId',
        'pharmacyName'
    ],

    components: {
        Modal,
        OptionModalButtons
    }
}
</script>
