<script>
import axios from 'axios'
import { API_URL } from "../constante.js"

export default {
  name: "Sign-in",
  data(){
    return {
      formdata:{
        email:"",
        password:"",
      }
    }
  },

  methods:{
    async sign_in(){
      try{
        const response = await axios.post(
            API_URL + "api/user/admin_login/",
            this.formdata,
            // {
            //   withCredentials:true,
            // }
        )

        if (response.status === 200) {
          console.log(response.data)
          localStorage.setItem("user", JSON.stringify(response.data))
          location.reload()
          this.$router.push({name:'home'})
        }

      }catch (e) {
        console.error(e)
      }

    }
  }
}
</script>

<template>

  <div id="tmp" class="bg-body-secondary">
    <div class="container sign_in_form rounded-4 shadow-lg">
      <div class="mb-3">
        <h1 class="h1 fw-bold">Login</h1>
        <p class="text-muted">Bon retour parmi nous, Mr Admin</p>
      </div>
      <form @submit.prevent="sign_in" class="px-3">
        <div class="row">
          <div class="col-12 mb-3">
            <label class="form-label" for="email">Email</label>
            <input type="email" id="email" class="form-control"  placeholder="email"  v-model="this.formdata.email" required>
          </div>
          <div class="col-12 mb-3">
            <label class="form-label" for="password">Password</label>
            <input type="password" id="password" class="form-control" placeholder="password"  v-model="this.formdata.password" required>
          </div>
          <div class="col-12 mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="remenber">
            <label for="remenber" class="form-check-label" >Remenber me</label>
          </div>
          <button type="submit" class="btn btn-primary fw-semibold py-2">Sign in</button>
        </div>
      </form>
      <p class="text-primary mt-3 fs-5 fw-bold">purga</p>
    </div>
  </div>

</template>

<style scoped>
#tmp{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign_in_form{
  width: 30%;
  background: white;
  padding: var(--padding_size);
}

form{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>