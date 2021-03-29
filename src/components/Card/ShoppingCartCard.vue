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
        <input type="text" name="name" :value="amount" :id="id">
        <button @click="decrement" class="minus-btn" type="button" name="button">
            <i class="material-icons">remove</i>
        </button>
      </div>
      <div class="total-price">{{amount === 0 ? price : amount * price}} RSD</div>
      <div class="add-to-card">
        <button @click="reserveMedicine" class="btn btn-success btn-just-icon btn-fill btn-round btn-wd" rel="tooltip" title="Add to cart">
            <i class="material-icons">add_shopping_cart</i>
        </button>  
      </div>
  </div>
</template>

<script>

export default {
  props: ['pharmacyName', 'pharmacyStreet', 'pharmacyCity', 'price', 'id'],

  components: {
  },

  data: function() {
    return {
      amount: 0
    }
  },

  methods:{
      increment(){
          this.amount++;
      },
      decrement(){
          if(this.amount > 0){
              this.amount--;
          }
      },
      reserveMedicine(e){
        e.preventDefault();
        if(this.amount > 0)
          this.$emit('addMedicineToCart', e, this.id, this.amount, this.price, this.pharmacyName, this.pharmacyStreet, this.pharmacyCity);
      }
  }
}

</script>

<style scoped>
* {
  box-sizing: border-box;
}

.item {
  height: 120px;
  display: flex;
}

.description {
  padding-top: 10px;
  margin-right: 60px;
  width: 110px;
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

.quantity {
  padding-top: 35px;
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
  width: 35px;
  height: 30px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
 
button:focus,
input:focus {
  outline:0;
}

.total-price {
  width: 83px;
  padding-top: 39px;
  text-align: center;
  font-size: 16px;
  color: #43484D;
  font-weight: 300;
}

.add-to-card {
    padding-top: 25px;
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