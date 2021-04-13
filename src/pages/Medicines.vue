<template>
    <div class="content">
        <div class="container-fluid">

        <MedicineSearch />

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
                            <Stars :numOfStars="medicine.averageGrade" />
                        </div>
                        <div slot="buttons">
                            <RoundButton title="Download specification" iconName="subject" type="btn-info"></RoundButton>
                            <RoundButton title="Check availability" iconName="add_shopping_cart" type="btn-success" @click="onDisplaySelected(medicine.id, medicine.name)"></RoundButton>
                            
                            <ModalOpener modalBoxId="medicineModal">
                            <RoundButton title="Delete medicine" iconName="edit" type="btn-warning" @click="onEditSelected(medicine.id)"></RoundButton>
                            </ModalOpener>
                            
                            <RoundButton title="Delete medicine" iconName="delete" type="btn-danger" @click="onDeleteSelected(medicine.id, medicine.name)"></RoundButton>

                             </div>
                    </RotatingCard>
                </template>
            </div>
        </div>

        <Modal
            modalBoxId="medicineModal"
            title="Medicine"
            sizeClass="modal-lg"
        >
            <div slot="body">
                <MedicineForm
                    :isEdit="isEdit"
                    :existingMedicine="selectedMedicine"
                />
            </div>
        </Modal>

        <ModalOpener modalBoxId="medicineModal">
            <Button @click="handleRegisterClick" class="pull-right">Create Medicine</Button>
        </ModalOpener>
    </div>
</template>

<script>
import MedicineSearch from '../components/Searchs/MedicineSearch'
import FormGroup from '../components/Form/FormGroup'
import MedicineForm from '../components/Forms/MedicineForm'
import Button from '../components/Form/Button'
import RotatingCard from '../components/Card/RotatingCard.vue';
import Stars from '../components/Rating/Stars'
import Modal from '../components/Modal/Modal.vue'
import ModalOpener from '../components/Modal/ModalOpener.vue'
import OptionModalButtons from '../components/Modal/OptionModalButtons'
import ShopingCartCard from '../components/Card/ShoppingCartCard.vue'
import Card from '../components/Card/Card.vue'
import RoundButton from '../components/Form/RoundButton.vue'
import { mapGetters, mapActions } from 'vuex'
import toastr from 'toastr'

export default {
    components: {
        MedicineSearch,
        FormGroup,
        MedicineForm,
        Button,
        RotatingCard,
        Stars,
        Modal,
        ModalOpener,
        OptionModalButtons,
        ShopingCartCard,
        Card,
        RoundButton
    },

    data: function() {
        return {
            medicines: [],
            selectedMedicineId: null,
            selectedMedicineName: null,
            selectedMedicine: null,
            pharmaciesForMedicines: [],
            isEdit: false
        }
    },

    computed: {
        ...mapGetters({
            getMedicines: 'medicines/getMedicines',
            getMedicine: 'medicines/getMedicine',
            getPharmaciesForMedicines: 'medicines/getPharmaciesForMedicine',
            result: 'medicines/getResult'
        })
    },

    methods: {
        ...mapActions({
            fetchMedicines: 'medicines/fetchMedicinesForHomePage',
            fetchMedicinesByName: 'medicines/fetchMedicinesByName',
            fetchMedicine: 'medicines/fetchMedicineById',
            fetchPharmaciesForMedicine: 'medicines/fetchPharmaciesForMedicineById',
            reserveMedicine: 'shoppingCart/addReservation',
            deleteMedicine: 'medicines/deleteMedicine'
        }), 

        handleSearch(name) {
            this.fetchMedicinesByName(name);
        },

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
        },

        handleRegisterClick() {
            this.isEdit = false;
            this.selectedMedicine = null;
        },

        onEditSelected(medicineId) {
            this.isEdit = true;
            this.fetchMedicine(medicineId);
        }
    },

    watch: {
        getMedicines(medicines) {
            this.medicines = medicines;
        },

        getMedicine(medicine) {
            this.selectedMedicine = {
                ...medicine.medicine,
                replacements: medicine.replacements.map(r => r.replacementMedicineId),
                ingridients: medicine.ingredients.map(i => { return { name: i.name, mass: i.massInMilligrams} })
            }
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

            if(label === 'add' || label === 'update') {
                if(ok) {
                    this.fetchMedicines();
                }
            }
        }
        
    },

    mounted() {
      this.fetchMedicines();
    }
};

</script>