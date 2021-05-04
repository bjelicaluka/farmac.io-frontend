<template>
    <Modal title="Scan QR Code" :modalBoxId="modalBoxId">
        <div slot="body">

            <div class="content">
                <div class="container-fluid">
                    <div class="row justify-content-center align-items-center">
                        <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                            <div class="fileinput-new thumbnail img-raised">
                                <img src="https://via.placeholder.com/250" rel="nofollow" alt="...">
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
                </div>
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

import QrcodeDecoder from 'qrcode-decoder';

const $ = window.$;

export default {
    
    components: {
        Modal,
        ModalCloser,
        Button
    },

    props: [
        'modalBoxId'
    ],
    
    methods: {
         scanQrCodeImage() {
            const qrScanner = new QrcodeDecoder();
            const image = document.querySelector('div .fileinput-preview img');
            image.crossOrigin = "Anonymous";

            qrScanner.decodeFromImage(image)
            .then(res => {
                console.log(res);
                if(res) {
                    console.log('some logic goes here.');
                }
            });
    
        }
    }
}

</script>
