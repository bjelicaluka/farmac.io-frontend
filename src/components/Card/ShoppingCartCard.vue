<template>
        <div class="item">
            <div class="description">
            <span>{{pharmacyName}}</span>
            <span>{{pharmacyStreet}}</span>
            <span>{{pharmacyCity}}</span>
            </div>
        
            <div class="quantity">
            <button @click="increment" class="plus-btn" type="button" name="button">
                <i class="material-icons">add</i>
            </button>
            <input type="text" name="name" value="0" :id="id">
            <button @click="decrement" class="minus-btn" type="button" name="button">
                <i class="material-icons">remove</i>
            </button>
            </div>
            <div class="total-price">{{price}}</div>
            <div>
                <a @click="reserveMedicine" href="#pablo" class="btn btn-success btn-just-icon btn-fill btn-round btn-wd" rel="tooltip" title="Add to cart">
                    <i class="material-icons">add_shopping_cart</i>
                </a>  
            </div>

        </div>
</template>

<script>
export default {
  props: ['pharmacyName', 'pharmacyStreet', 'pharmacyCity', 'price', 'id'],
  components: {
  },
  methods:{
      increment(){
          document.getElementById(this.id).value++;
      },
      decrement(){
          if(document.getElementById(this.id).value > 0){
              document.getElementById(this.id).value--;
          }
      },
      reserveMedicine(e){
        e.preventDefault();
        this.$emit('addMedicineToCart', e, this.id, document.getElementById(this.id).value, this.price, this.pharmacyName, this.pharmacyStreet, this.pharmacyCity);
      }
  }
}

</script>

<style scoped>
* {
  box-sizing: border-box;
}

.item {
  padding: 20px 30px;
  height: 120px;
  display: flex;
}
 
.item:nth-child(3) {
  border-top:  1px solid #E1E8EE;
  border-bottom:  1px solid #E1E8EE;
}

.image {
  margin-right: 50px;
}

.description {
  padding-top: 10px;
  margin-right: 60px;
  width: 115px;
}
 
.description span {
  display: block;
  font-size: 14px;
  color: #43484D;
  font-weight: 400;
}
 
.description span:first-child {
  margin-bottom: 5px;
}
.description span:last-child {
  font-weight: 300;
  margin-top: 8px;
  color: #86939E;
}

.quantity input {
  -webkit-appearance: none;
  border: none;
  text-align: center;
  width: 32px;
  font-size: 16px;
  color: #43484D;
  font-weight: 300;
}
 
button[class*=btn] {
  width: 30px;
  height: 30px;
  background-color: #E1E8EE;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
.minus-btn img {
  margin-bottom: 3px;
}
.plus-btn img {
  margin-top: 2px;
}
 
button:focus,
input:focus {
  outline:0;
}

.total-price {
  width: 83px;
  padding-top: 27px;
  text-align: center;
  font-size: 16px;
  color: #43484D;
  font-weight: 300;
}

@media (max-width: 800px) {
  .shopping-cart {
    width: 100%;
    height: auto;
    overflow: hidden;
  }
  .item {
    height: auto;
    flex-wrap: wrap;
    justify-content: center;
  }
  .image img {
    width: 50%;
  }
  .image,
  .quantity,
  .description {
    width: 100%;
    text-align: center;
    margin: 6px 0;
  }
  .buttons {
    margin-right: 20px;
  }
}

</style>