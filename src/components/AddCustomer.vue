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
      <h2>Add Customer</h2>
      <form @submit.prevent="submitCustomer" enctype="multipart/form-data">
        <div>
          <label for="nama">Nama:</label>
          <input required type="text" id="nama" v-model="nama">
        </div>
        <div>
            <label for="contact">contact:</label>
            <input required type="text" id="contact" v-model="contact">
        </div>
        <div>
            <label for="email">email:</label>
            <input required type="text" id="email" v-model="email">
        </div>
        <div>
            <label for="alamat">alamat:</label>
            <input required type="text" id="alamat" v-model="alamat">
        </div>
        <div>
            <label for="diskon">diskon:</label>
            <input required type="text" id="diskon" v-model="diskon">
        </div>
        <div>
          <label for="unit">Tipe Diskon:</label>
          <select id="tipe_diskon" v-model="tipe_diskon" required>
            <option value="fix">Fix</option>
            <option value="persentase">Persentase</option>
          </select>
        </div>
        <div>
          <label for="ktp">KTP:</label>
          <input required type="file" id="ktp" @change="handleFileUpload">
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
        nama: '',
        contact: '',
        email: '',
        alamat: '',
        diskon: '',
        tipe_diskon: '',
        ktp: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.ktp = file;
    },
    submitCustomer() {
      const formData = new FormData();
      formData.append('nama', this.nama);
      formData.append('contact', this.contact);
      formData.append('email', this.email);
      formData.append('alamat', this.alamat);
      formData.append('diskon', this.diskon);
      formData.append('tipe_diskon', this.tipe_diskon);
      formData.append('ktp', this.ktp);

      axios.post(`http://localhost:3000/customers/`, formData)
        .then(response => {
            console.log(response.data);
            this.$router.push('/customers');
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>