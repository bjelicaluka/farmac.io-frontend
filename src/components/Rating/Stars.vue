<template>
    <div>
        <span
            v-for="rate in ratings"
            :key="rate"
            :class="{'fa' : true,'fa-star' : true, 'checked': rate <= numOfStars}"
        />
    </div>
</template>


<script>
export default {
    props: ['numOfStars'],

    data: function() {
        return {
            ratings: [1, 2, 3, 4, 5]
        }
    }
}
</script>


<style scoped>
.checked {
  color: orange;
}

span {
    font-size: 15px;
}

</style>