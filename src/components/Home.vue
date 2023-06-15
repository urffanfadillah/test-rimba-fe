<template>
  <div>
    <h1>Item Page</h1>
    <!-- Konten halaman Home -->
    <a href="/items/add">Add</a>
    <table border="1">
      <thead>
        <tr>
          <td>Id</td>
          <td>Nama Item</td>
          <td>Unit</td>
          <td>Stok</td>
          <td>Harga Satuan</td>
          <td>Barang</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in items" :key="item._id">
          <tr>
            <td>{{ item._id }}</td>
            <td><a :href="'/items/'+item._id">{{ item.nama_item }}</a></td>
            <td>{{ item.unit }}</td>
            <td>{{ item.stok }}</td>
            <td>{{ item.harga_satuan }}</td>
            <td>
              <img :src="'http://localhost:3000/'+item.barang" width="60" />
            </td>
            <td>
              <a :href="'/items/edit/'+item._id">Edit</a> |
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
      axios.get('http://localhost:3000/items')
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