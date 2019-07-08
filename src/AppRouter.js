import VueRouter from "vue-router";
import LoginPage from "./containers/LoginPage/LoginPage";
import Container from "./containers/Container/Container";
import FilteredItems from "./components/FilteredItems/FilteredItems";
import ListWrapper from "./containers/ListWrapper/ListWrapper";
import SelectCategory from "./components/FilteredItems/SelectCategory/SelectCategory";

export default new VueRouter({
  routes: [
   { path: '', beforeEnter: (to, from, next) => next('/login')},
   {path: '/login', component: LoginPage},
   { path: "/",
     component: Container,
     children: [
       {
         path: 'sortByDate',
         component: ListWrapper
       },
       {
         path: 'sortByName',
         component: FilteredItems
       },
       {
         path: ':category',
         component: SelectCategory
       }
     ]
   }
 ]
});
