import  {createRouter, createWebHistory} from 'vue-router';
import { isAuthenticated } from './utils.js';
import SignIn from "../views/Sign-in.vue";
import Home from "../views/Home.vue";
import Deposits from "../views/Deposits.vue";
import Reports from "../views/Reports.vue";
import Trucks from "../views/Trucks.vue";
import Staffs from "../views/Staffs.vue";
import Users from "../views/Users.vue";


const routes = [
    {path: '/dashboard/', name:'home', component: Home, meta: { requiresAuth: true }},
    {path:'/dashboard/sign-in', component: SignIn, name: 'sign-in', meta: { requiresAuth: false }},
    {path:'/dashboard/deposits', component: Deposits, name:'deposits', meta: { requiresAuth: true }},
    {path:'/dashboard/reports', component: Reports, name:'reports', meta: { requiresAuth: true }},
    {path:'/dashboard/trucks', component: Trucks, name:'trucks', meta: { requiresAuth: true }},
    {path:'/dashboard/staffs', component: Staffs, name:'staffs', meta: { requiresAuth: true }},
    {path:'/dashboard/users', component: Users, name:'users', meta: { requiresAuth: true }}

    // { path: '/:pathMatch(.*)*', component: () => import('./views/NotFound.vue') },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Guard global
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()){
        // if the user isn't authenticated redirect him to sign-in page
        next({name:'sign-in'})
    }else if(to.name=== 'sign-in' && isAuthenticated()){
        next({name:'home'})
    }else{
        next()
    }
});

export default router;