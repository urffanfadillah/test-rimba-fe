<template>
    <div>
      <h1>Sales Page</h1>
      <!-- Konten halaman Home -->
      <a href="/sales/add">Add</a>
      <table border="1">
        <thead>
          <tr>
            <td>Kode Transaksi</td>
            <td>Tanggal transaksi</td>
            <td>Customer</td>
            <td>Item</td>
            <td>Diskon</td>
            <td>Subtotal</td>
            <td>Total Bayar</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
            <template v-for="sales in listSales" :key="sales._id">
                <tr>
                  <td>{{ sales._id }}</td>
                  <td>{{ new Date(sales.tanggal_transaksi).getDate() }}-{{ new Date(sales.tanggal_transaksi).getMonth() }}-{{ new Date(sales.tanggal_transaksi).getFullYear() }}</td>
                  <td>{{ sales.customer }}</td>
                  <td>
                    <template v-for="item in sales.item">
                        <span>{{ item.nama_item }} ({{ item.qty }})</span>
                    </template>
                  </td>
                  <td>
                    {{ sales.diskon  }}
                  </td>
                  <td>{{ sales.sub_total }}</td>
                  <td>{{ sales.total }}</td>
                  <td>
                    <a href="#" @click="() => deleteSales(sales._id)">Delete</a>
                  </td>
                </tr>
            </template>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
    import axios from 'axios';
    export default {
        components: 'Sales',
        data() {
            return {
                listSales: []
            }
        },
        methods: {
            deleteSales(id) {
                axios.delete('http://localhost:3000/sales/' + id)
                .then(response => {
                    console.log(response);
                    this.$router.go(0);
                }).catch((error) => {
                    console.log(error);
                })
            }
        },
        mounted() {
            axios.get('http://localhost:3000/sales').then((response) => {
                this.listSales = response.data
            }).catch((error) => {
                console.log(error);
            });
        }
    }
  </script>