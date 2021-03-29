<template>
    <div class="col-md-3 ml-auto mr-auto">
        <div class="rotating-card-container">
            <div class="card card-rotate card-background">
                <div class="front front-background" style="background-image: url('https://i.ibb.co/qnVs5SQ/New-Project-3.png'); color: white;">
                    <div class="card-body">
                        <h4 class="card-category">{{category}}</h4>
                        <h2 class="card-title">{{title}}</h2>
                        <slot name="description" />
                    </div>
                </div>

                <div class="back back-background" style="background-image: url('https://i.ibb.co/qnVs5SQ/New-Project-3.png'); color: white;">
                    <div class="card-body">
                        <h5 class="card-title">
                            {{label}}
                        </h5>
                        <div class="footer justify-content-center">
                            <slot name="buttons"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['category', 'title', 'label']
}
</script>

<style>

</style>