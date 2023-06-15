<template>
    <div style="display: flex; flex-direction: column; gap: 4px;">
        <h1>Data</h1>
        <div>
            nama item: {{ this.nama_item }}
        </div>
        <div>
            unit: {{ this.unit }}
        </div>
        <div>
            stok: {{ this.stok }}
        </div>
        <div>
            harga_satuan: {{ this.harga_satuan }}
        </div>
        <div>
            gambar <br>
            <img :src="'http://localhost:3000/' + barang" width="120" />
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name: 'DetailItem',
        data() {
            return {
                nama_item: '',
                unit: '',
                stok: 0,
                harga_satuan: 0,
                barang: '',
            };
        },
        mounted() {
            axios.get(`http://localhost:3000/items/${this.$route.params.id}`).then(response => {
                this.nama_item = response.data.nama_item;
                this.unit = response.data.unit;
                this.stok = response.data.stok;
                this.harga_satuan = response.data.harga_satuan;
                this.barang = response.data.barang;
            }).catch(error => {
                console.log(error);
            })
        },
    }
</script>