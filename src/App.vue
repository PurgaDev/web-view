<template>
  <div v-if="isLogin" class="container1">
    <div class="left_nav">
      <div class="icons">
        <i class='bx bxs-home bx-md ' @click="redirect('dashboard')"></i>
        <i class='bx bxs-report bx-md ' @click="redirect('dashboard/reports')"></i>
        <i class='bx bxs-trash bx-md' @click="redirect('dashboard/deposits')"></i>
        <i class='bx bxs-truck bx-md' @click="redirect('dashboard/trucks')"></i>
        <i class='bx bxs-user-pin bx-md' @click="redirect('dashboard/users')"></i>
      </div>
    </div>
    <div class="nav_bar shadow-sm">
      <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
        <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
      </form>

      <div class="icons">
        <i class='bx bxs-bell bx-md' ></i>
        <i class='bx bxs-user-circle bx-md' @click="popup_connextion()"></i>
      </div>

      <div class="connexion" v-if="display_con">
        <button @click="gotogout" class="btn btn-outline-primary fw-bold" >Logout</button>
      </div>
    </div>

    <div class="app">
      <!--    <button type="button" class="btn btn-outline-light me-2" @click="check" :disabled="visiblelogout_btn">logout</button>-->
      <!--    <router-link :to="{name:'sign-in'}"><button type="button" class="btn btn-success">Sign-in</button></router-link>-->

      <logout v-if="displaylogout" @close="close_logout"></logout>
      <router-view class="display"></router-view>

    </div>
  </div>

  <SignIn v-else></SignIn>
</template>

<script setup>
import logout from "./components/Logout.vue";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {isAuthenticated} from "./router/utils.js";
import SignIn from "./views/Sign-in.vue";

let displaylogout = ref(false);
let visiblelogout_btn = ref(true);

let display_con=ref(false);
let state_log=ref(false);
let state_sign=ref(false);
const isLogin = ref(false);

if (localStorage.getItem('user')){
  visiblelogout_btn.value=false
}

onMounted(() => {
  isLogin.value = isAuthenticated()
})

const check = ()=>{
  displaylogout.value=true;
}
const close_logout = ()=>{
  displaylogout.value = false
}

const router = useRouter();
const redirect = (name)=>{
  const destination = '/'+name;
  router.push(destination)
}

const popup_connextion = () => {
  display_con.value=!display_con.value;
}

const gotogout = () => {
  if (isAuthenticated()) {
    displaylogout.value=true;
  }
}

</script>

<style scoped>

  .nav_bar{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: white;

    position: fixed;
    top: 0;
    left: 8%;
    z-index: 1;

    min-width: 92%;
    height: 70px;
    padding-right: 25px;
  }

  .left_nav{
    z-index: 3;
    height: 100vh;
    min-width: 8%;
    background: #235F4E;
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .left_nav .icons{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .left_nav .icons *{
    color: white;
    background: rgba(255, 255, 255, 0.38);
    border-radius: 100%;
    padding: 10px;

    transition-property: background-color,transform;
    transition: .3s ease-in-out;
  }

  .left_nav .icons *:hover{
    background: rgba(255, 255, 255, 0.59);
    transform: scale(1.05);
  }


  .container1{
    width: 100%;
    height: 100vh;

  }

  .display{
    position: relative;
    top: 90px;
    left: 8%;
    height: 90.7vh;
    width: 92%;
  }
</style>
