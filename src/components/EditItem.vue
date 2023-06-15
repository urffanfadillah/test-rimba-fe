<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  form button {
    width: fit-content;
  }
</style>
<template>
    <div>
      <h2>Edit Item</h2>
      <form @submit.prevent="() => editItem($route.params.id)" enctype="multipart/form-data">
        <div>
          <label for="nama_item">Nama Item:</label>
          <input required type="text" id="nama_item" v-model="nama_item">
        </div>
        <div>
          <label for="unit">Unit:</label>
          <select id="unit" v-model="unit" required>
            <option value="kg">Kg</option>
            <option value="pcs">Pcs</option>
          </select>
        </div>
        <div>
          <label for="stok">Stok:</label>
          <input required type="number" id="stok" v-model="stok">
        </div>
        <div>
          <label for="harga_satuan">Harga Satuan:</label>
          <input required type="number" id="harga_satuan" v-model="harga_satuan">
        </div>
        <div>
          <label for="barang">Barang:</label>
          <input required type="file" id="barang" @change="handleFileUpload">
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nama_item: '',
      unit: '',
      stok: 0,
      harga_satuan: 0,
      barang: null,
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
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.barang = file;
    },
    editItem(id) {
      const formData = new FormData();
      formData.append('nama_item', this.nama_item);
      formData.append('unit', this.unit);
      formData.append('stok', this.stok);
      formData.append('harga_satuan', this.harga_satuan);
      formData.append('barang', this.barang);

      axios.put(`http://localhost:3000/items/${id}`, formData)
        .then(response => {
            console.log(response.data);
            this.$router.push('/');
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>