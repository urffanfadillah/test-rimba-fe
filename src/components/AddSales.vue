<template>
    <div>
      <h1>Add Sales</h1>
      <form @submit.prevent="saveSales">
        <div style="margin-bottom: 8px;">
          <label for="customer-select">Customer</label><br>
          <select name="customer" id="customer-select" v-model="customer" @change="selectCustomer" required>
            <template v-for="customer in listCustomer" :key="customer._id">
              <option :value="customer._id">{{ customer.nama }}</option>
            </template>
          </select>
        </div>
        <div style="margin-bottom: 8px;">
          <label for="tanggal-transaki">Tanggal Transaksi</label><br>
          <input type="date" v-model="tanggalTransaksi" required />
        </div>
        <table border="1">
          <thead>
            <tr>
              <td>Pilih</td>
              <td>Item</td>
              <td>Unit</td>
              <td>Harga Satuan</td>
              <td>Stok</td>
              <td>Qty</td>
            </tr>
          </thead>
          <tbody>
              <template v-for="(item, index) in listItem" :key="item._id">
                  <tr>
                    <td><td><input type="checkbox" v-model="item.checked" @change="handleCheckItem"></td></td>
                    <td>{{ item.nama_item }}</td>
                    <td>{{ item.unit }}</td>
                    <td>{{ item.harga_satuan }}</td>
                    <td>{{ item.stok }}</td>
                    <td>
                      <input type="number" min="0" :max="item.stok"
                        @input="[validateQuantity($event, item.stok, index), handleCheckItem]" 
                      />
                    </td>
                  </tr>
              </template>
          </tbody>
        </table>
        <div>
          Diskon: {{ tipeDiskon }}
        </div><br>
        <div>
          Nilai Diskon: {{ nilaiDiskon }}
        </div><br>
        <div>
          Sub Total: {{ subTotal }}
        </div><br>
        <div>
          Total: {{ tipeDiskon == 'fix' ? subTotal - nilaiDiskon : subTotal - ((subTotal * nilaiDiskon) / 100) }}
        </div><br>
        <button type="submit" :disabled="resultCheckedItems.length < 1">Save</button>
      </form>
    </div>
  </template>
  
  <script>
    import axios from 'axios';
    export default {
        components: 'AddSales',
        data() {
            return {
                listItem: [],
                listCustomer: [],
                customer: '',
                namaCustomer: '',
                tanggalTransaksi: '',
                diskon: '',
                tipeDiskon: '',
                nilaiDiskon: '',
                subTotal: '',
                resultCheckedItems: [],
                total: ''
            }
        },
        methods: {
          selectCustomer() {
            console.log(this.customer);
            axios.get(`http://localhost:3000/customers/${this.customer}`).then((response) => {
              this.namaCustomer = response.data.nama
              this.tipeDiskon = response.data.tipe_diskon
              this.nilaiDiskon = response.data.diskon
            }).catch((error) => {
              console.log(error);
            });
          },
          validateQuantity(event, maxStok, index) {
            if (event.target.value > maxStok) {
              this.listItem[index].qty = maxStok;
              event.target.value = maxStok;
              this.resultCheckedItems = this.listItem.filter((v) => {
                return v.checked == true
              });
              this.subTotal = this.resultCheckedItems.reduce((total, item) => total + (item.harga_satuan * item.qty), 0)
            }else {
              this.listItem[index].qty = event.target.value;
              this.resultCheckedItems = this.listItem.filter((v) => {
                return v.checked == true
              });
              this.subTotal = this.resultCheckedItems.reduce((total, item) => total + (item.harga_satuan * item.qty), 0)
            }
          },
          handleCheckItem(){
            this.resultCheckedItems = this.listItem.filter((v) => {
              return v.checked == true
            });
            this.subTotal = this.resultCheckedItems.reduce((total, item) => total + (item.harga_satuan * item.qty), 0)
          },
          saveSales() {
            let resultSales = {
              tanggal_transaksi: this.tanggalTransaksi,
              customer: this.namaCustomer,
              item: [],
              diskon: this.tipeDiskon == 'fix' ? `(Rp)${this.nilaiDiskon}` : `(%)${this.nilaiDiskon}`,
              sub_total: this.subTotal,
              total: this.tipeDiskon == 'fix' ? this.subTotal - this.nilaiDiskon : this.subTotal - ((this.subTotal * this.nilaiDiskon) / 100)
            }

            resultSales.item = this.listItem.filter((v) => {
              return v.checked == true
            });

            console.log(resultSales);

            axios.post('http://localhost:3000/sales', resultSales).then((response) => {
              this.$router.push('/sales');
            }).catch((error) => {
              console.log(error);
            });
          }
        },
        mounted() {
          axios.get('http://localhost:3000/items').then((response) => {
            const instanceItem = response.data
            instanceItem.forEach((item) => {
              item.checked = false;
              item.qty = 0;
            });
            this.listItem = instanceItem;
          }).catch((error) => {
            console.log(error);
          });
          axios.get('http://localhost:3000/customers').then((response) => {
            this.listCustomer = response.data
          }).catch((error) => {
            console.log(error);
          })
        }
    }
  </script>