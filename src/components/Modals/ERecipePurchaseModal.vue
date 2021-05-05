<template>

    <Modal sizeClass="modal-lg" title="Scan QR Code" :modalBoxId="modalBoxId">
        <div slot="body">
            <div class="card">
                <div class="card card-nav-tabs card-plain" >
                    <div class="card-header card-header-primary">
                        <div class="nav-tabs-navigation">
                            <div class="nav-tabs-wrapper">
                                <ul class="nav nav-tabs" data-tabs="tabs">
                                    <li @click="switchedToUpload" class="nav-item">
                                        <a class="nav-link active" href="#upload" data-toggle="tab"><i class="material-icons">file_upload</i>Upload</a>
                                    </li>
                                    <li @click="switchedToCamera" class="nav-item">
                                        <a class="nav-link" href="#camera" data-toggle="tab"><i class="material-icons">videocam</i>Camera</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="tab-content text-center">
                            <div class="tab-pane active" id="upload">
                                <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                                    <div class="fileinput-new thumbnail img-raised">
                                        <img src="https://via.placeholder.com/240" rel="nofollow" alt="...">
                                    </div>
                                    <div class="fileinput-preview fileinput-exists thumbnail img-raised"></div>
                                    <div>
                                        <span class="btn btn-raised btn-round btn-default btn-file">
                                            <span class="fileinput-new">Select image</span>
                                            <span class="fileinput-exists">Change</span>
                                            <input type="file" name="..." />
                                        </span>
                                        <Button class="btn-round fileinput-exists" @click="scanQrCodeImage">Scan</Button>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="camera">
                                <div class=" justify-content-center align-items-center">
                                    <video id="webcam" autoplay playsinline width="320" height="240"></video><br/>
                                    <Button class="btn-round" @click="scanQrCodeCamera">Start scanning</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <PharmaciesForERecipeTable :pharmacies="pharmacies" :eRecipeId="eRecipeId" />
            </div>
        </div>

        <div slot="buttons">
            <ModalCloser>
                <Button>Close</Button>
            </ModalCloser>            
        </div>

    </Modal>
    
</template>

<script>

import Modal from '../Modal/Modal'
import ModalCloser from '../Modal/ModalCloser'
import Button from '../Form/Button'
import PharmaciesForERecipeTable from '../Tables/PharmaciesForERecipeTable'

import { mapActions, mapGetters } from 'vuex'
import QrcodeDecoder from 'qrcode-decoder';
import Webcam from 'webcam-easy';
import toastr from 'toastr'

export default {
    
    components: {
        Modal,
        ModalCloser,
        Button,
        PharmaciesForERecipeTable
    },

    props: [
        'modalBoxId'
    ],
    
    data: function() {
        return { 
            camera: null,
            qrDecoder: new QrcodeDecoder(),
            eRecipeId: ''
        }
    },


    computed: {
        ...mapGetters({
            pharmacies: 'eRecipes/getPharmaciesForERecipe',
            result: 'eRecipes/getResult'
        }),
    },

    watch: {
        result({label, ok}) {
            if(!ok && label === 'fetch') {
                toastr.error(`Given QR Code does not contain valid eRecipe.`);
            }
        }
    },

    methods: {
        ...mapActions({
            fetchPharmaciesForERecipe: 'eRecipes/fetchPharmaciesForERecipe'
        }),

        switchedToUpload() {
            this.qrDecoder.stop();
            this.camera?.stop();
        },

        switchedToCamera() {
            this.qrDecoder.stop();
            if(!this.camera) {
                const cameraElement = document.getElementById('webcam');
                this.camera = new Webcam(cameraElement, 'user', null, null);
            }
            this.camera.start();
        },

        scanQrCodeImage() {
            const image = document.querySelector('div .fileinput-preview img');
            image.crossOrigin = "Anonymous";

            this.qrDecoder.decodeFromImage(image)
            .then(result => {
                this.handleQrDecoredResult(result);
            });
        },

        scanQrCodeCamera() {
            if (!this.qrDecoder.isCanvasSupported()) {
                return;
            }

            var video = document.querySelector('#webcam');
            this.qrDecoder.decodeFromVideo(video)
            .then(result => {
                this.handleQrDecoredResult(result);
            });
        },

        handleQrDecoredResult(result) {
            if(result) {
                this.fetchPharmaciesForERecipe(result.data);
                this.eRecipeId = result.data;
            } else {
                toastr.error(`Given image does not contain valid QR Code.`);
            }
        }
    }
}

</script>