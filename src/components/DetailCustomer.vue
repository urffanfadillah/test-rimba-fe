<template>
    <div style="display: flex; flex-direction: column; gap: 4px;">
        <h1>Data</h1>
        <div>
            nama: {{ this.nama }}
        </div>
        <div>
            contact: {{ this.contact }}
        </div>
        <div>
            email: {{ this.email }}
        </div>
        <div>
            alamat: {{ this.alamat }}
        </div>
        <div>
            diskon: {{ this.diskon }}
        </div>
        <div>
            tipe_diskon: {{ this.tipe_diskon }}
        </div>
        <div>
            ktp <br>
            <img :src="'http://localhost:3000/' + ktp" width="120" />
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name: 'DetailCustomer',
        data() {
            return {
                nama: '',
                contact: '',
                email: '',
                alamat: '',
                diskon: '',
                tipe_diskon: '',
                ktp: null,
            };
        },
        mounted() {
            axios.get(`http://localhost:3000/customers/${this.$route.params.id}`).then(response => {
                this.nama = response.data.nama;
                this.contact = response.data.contact;
                this.email = response.data.email;
                this.alamat = response.data.alamat;
                this.diskon = response.data.diskon;
                this.tipe_diskon = response.data.tipe_diskon;
                this.ktp = response.data.ktp;
            }).catch(error => {
                console.log(error);
            })
        },
    }
</script>