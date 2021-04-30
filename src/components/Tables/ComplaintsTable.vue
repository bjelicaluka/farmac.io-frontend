<template>
    
    <div>
        <div v-for="(complaint, index) in complaints" :key="index">
            <ComplaintCard :complaint="complaint" />
        </div>
    </div>

</template>

<script>

import ComplaintCard from '../Card/ComplaintCard'

export default {
    
    components: {
        ComplaintCard
    },

    props: {
        complaints: {
            type: Array
        }
    }
}
</script>