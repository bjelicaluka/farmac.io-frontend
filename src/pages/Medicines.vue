<template>
    <div class="content">
        <div class="container-fluid">

        <Modal
            modalBoxId="deleteMedicineModal"
            title="Confirmation"
        >
            <div slot="body">
                <p>Are you sure that you want to delete {{this.selectedMedicineName}} medicine?</p>
            </div>
            <div slot="buttons">
                <OptionModalButtons @yes="handleDelete">
                </OptionModalButtons>
            </div>
        </Modal>
        <ModalOpener id="deleteMedicineModalOpener" class="d-none" modalBoxId="deleteMedicineModal" />


        <Modal
            modalBoxId="displayPharmaciesModal"
            title="Choose pharmacy"
        >
            <div slot="body">
                <Card title="Availability of the medicine in pharmacies">
                    <div v-for="(pharmacy,index) in pharmaciesForMedicines" :key="index">
                        <FormGroup>
                            <ShopingCartCard  @addMedicineToCart="addMedicineToCart" :pharmacyName="pharmacy.name" :pharmacyStreet="pharmacy.address.streetName + ' ' + pharmacy.address.streetNumber"
                            :pharmacyCity="pharmacy.address.city" :price="pharmacy.price" :id="pharmacy.id"></ShopingCartCard>
                        </FormGroup>
                    </div>
                </Card>
            </div>
        </Modal>
        <ModalOpener id="displayPharmaciesModalOpener" class="d-none" modalBoxId="displayPharmaciesModal" />
            <div class="row">
                <template v-for="(medicine,index) in medicines">
                    <RotatingCard :key="index" :category="'©' + medicine.manufacturer" :title="medicine.name" label="Download specification or check availability.">
                        <div slot="description">
                            <p style="font-size: 20px;">Type: {{medicine.type.typeName}}</p>
                            <div>
                                <span style="font-size: 15px;" class="fa fa-star checked"></span>
                                <span style="font-size: 15px;" class="fa fa-star checked"></span>
                                <span style="font-size: 15px;" class="fa fa-star checked"></span>
                                <span style="font-size: 15px;" class="fa fa-star"></span>
                                <span style="font-size: 15px;" class="fa fa-star"></span>
                            </div>
                        </div>
                        <div slot="buttons">
                            <a class="btn btn-info btn-just-icon btn-fill btn-round" rel="tooltip" title="Download specification">
                                <i class="material-icons">subject</i>
                            </a>
                            <a class="btn btn-success btn-just-icon btn-fill btn-round btn-wd" rel="tooltip" title="Check availability" 
                                @click="onDisplaySelected(medicine.id, medicine.name)">
                                <i class="material-icons">add_shopping_cart</i>
                            </a>
                            <a class="btn btn-danger btn-just-icon btn-fill btn-round btn-wd" rel="tooltip" title="Delete medicine" 
                                @click="onDeleteSelected(medicine.id, medicine.name)">
                                <i class="material-icons">delete</i>
                            </a>

                        </div>
                    </RotatingCard>
                </template>
            </div>
        </div>

        <Modal
            modalBoxId="medicineModal"
            title="Create medicine"
            sizeClass="modal-lg"
        >
            <div slot="body">
                <MedicineForm />
            </div>
        </Modal>

        <ModalOpener modalBoxId="medicineModal">
            <Button class="pull-right">Create Medicine</Button>
        </ModalOpener>
    </div>
</template>

<script>
import FormGroup from '../components/Form/FormGroup'
import MedicineForm from '../components/Forms/MedicineForm'
import Button from '../components/Form/Button'
import RotatingCard from '../components/Card/RotatingCard.vue';
import Modal from '../components/Modal/Modal.vue'
import ModalOpener from '../components/Modal/ModalOpener.vue'
import OptionModalButtons from '../components/Modal/OptionModalButtons'
import ShopingCartCard from '../components/Card/ShoppingCartCard.vue'
import Card from '../components/Card/Card.vue'
import { mapGetters, mapActions } from 'vuex'
import toastr from 'toastr'

export default {
    components: {
        FormGroup,
        MedicineForm,
        Button,
        RotatingCard,
        Modal,
        ModalOpener,
        OptionModalButtons,
        ShopingCartCard,
        Card
    },

    data: function() {
    return {
            medicines: [],
            selectedMedicineId: null,
            selectedMedicineName: null,
            pharmaciesForMedicines: []
        }
    },

    computed: {
        ...mapGetters({
            getMedicines: 'medicines/getMedicines',
            getPharmaciesForMedicines: 'medicines/getPharmaciesForMedicine',
            result: 'medicines/getResult'
        })
    },

    methods: {
        ...mapActions({
            fetchMedicines: 'medicines/fetchMedicinesForHomePage',
            fetchPharmaciesForMedicine: 'medicines/fetchPharmaciesForMedicineById',
            reserveMedicine: 'shoppingCart/addReservation',
            deleteMedicine: 'medicines/deleteMedicine'
        }), 

        onDisplaySelected(id, name){
            if(this.selectedMedicineId != id){
                this.selectedMedicineId = id;
                this.selectedMedicineName = name
                this.pharmaciesForMedicines = []
                this.fetchPharmaciesForMedicine(this.selectedMedicineId);
            }
            document.getElementById('displayPharmaciesModalOpener').click();
        },
        
        addMedicineToCart(e, pharmacyId, quantity, price, pharmacyName, pharmacyStreet, pharmacyCity){
            let reservation = {};
            reservation['pharmacyId'] = pharmacyId;
            reservation['medicineId'] = this.selectedMedicineId;
            reservation['medicineName'] = this.selectedMedicineName;
            reservation['quantity'] = quantity;
            reservation['price'] = price;
            reservation['pharmacyName'] = pharmacyName;
            reservation['city'] = pharmacyCity;
            reservation['street'] = pharmacyStreet;
            this.reserveMedicine(reservation);
            toastr.success("You have successfully added the medicine to the shopping cart.")
        },

        onDeleteSelected(id, name) {
            this.selectedMedicineId = id;
            this.selectedMedicineName = name
            document.getElementById('deleteMedicineModalOpener').click();
        },

        handleDelete(e) {
            e.preventDefault();
            this.deleteMedicine(this.selectedMedicineId);
        }
    },

    watch: {
      getMedicines(medicines) {
        this.medicines = medicines;
      },
      getPharmaciesForMedicines(pharmaciesForMedicines){
          this.pharmaciesForMedicines = pharmaciesForMedicines;
      },
      result({label, ok, message}) {
          if(label === 'delete') {
            if(ok) {
                toastr.success(message);
                this.fetchMedicines();
            } else {
                toastr.error(message);
            }
          }

          if(label === 'add' && ok) {
              this.fetchMedicines();
          }
      }
    },

    mounted() {
      this.fetchMedicines();
    }

}
</script>

<style scoped>
.checked {
  color: orange;
}

</style>