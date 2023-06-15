<template>
    <div>
      <h1>Customer Page</h1>
      <!-- Konten halaman Home -->
      <a href="/customers/add">Add</a>
      <table border="1">
        <thead>
          <tr>
            <td>Id</td>
            <td>Nama</td>
            <td>Kontak</td>
            <td>Email</td>
            <td>Alamat</td>
            <td>Diskon</td>
            <td>Tipe Diskon</td>
            <td>KTP</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in items" :key="item._id">
            <tr>
              <td>{{ item._id }}</td>
              <td><a :href="'/customers/'+item._id">{{ item.nama }}</a></td>
              <td>{{ item.contact }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.alamat }}</td>
              <td>{{ item.diskon }}</td>
              <td>{{ item.tipe_diskon }}</td>
              <td>
                <img :src="'http://localhost:3000/'+item.ktp" width="60" />
              </td>
              <td>
                <a :href="'/customers/edit/'+item._id">Edit</a> |
                <a @click="() => deleteItem(item._id)" href="#">Delete</a>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
    import axios from 'axios'
    export default {
      name: 'Home',
      methods: {
        deleteItem(id) {
          axios.delete('http://localhost:3000/items/' + id)
          .then(response => {
            console.log(response);
            this.$router.go(0);
          }).catch((error) => {
            console.log(error);
          })
        }
      },
      data() {
        return {
          items: []
        };
      },
      mounted() {
        axios.get('http://localhost:3000/customers')
        .then(response => {
          // Tangani respons sukses
          this.items = response.data
        })
        .catch(error => {
          // Tangani respons error
          console.error(error);
        });
      }
    }
  </script>