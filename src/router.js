import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import AddItem from './components/AddItem.vue';
import EditItem from './components/EditItem.vue';
import DetailItem from './components/DetailItem.vue';
import Customers from './components/Customers.vue';
import EditCustomer from './components/EditCustomer.vue';
import DetailCustomer from './components/DetailCustomer.vue';
import AddCustomer from './components/AddCustomer.vue';
import Sales from './components/Sales.vue';
import AddSales from './components/AddSales.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/items/add',
        component: AddItem
      },
      {
        path: '/items/edit/:id',
        component: EditItem
      },
      {
        path: '/items/:id',
        component: DetailItem
      },
      {
        path: '/customers',
        component: Customers
      },
      {
        path: '/customers/:id',
        component: DetailCustomer
      },
      {
        path: '/customers/add',
        component: AddCustomer
      },
      {
        path: '/customers/edit/:id',
        component: EditCustomer
      },
      {
        path: '/sales',
        component: Sales
      },
      {
        path: '/sales/add',
        component: AddSales
      }
    ]
});

export default router;