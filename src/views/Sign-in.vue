<script>
import axios from 'axios'

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
            "http://127.0.0.1:8000/api/user/admin_login/",
            this.formdata,
            {
              withCredentials:true,
            }
        )

        if (response.status === 200) {
          console.log(response.data)
          localStorage.setItem("user", JSON.stringify(response.data))
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

  <div id="tmp">
    <div class="container sign_in_form rounded-3">
      <form @submit.prevent="sign_in">
        <input type="email"  placeholder="email"  v-model="this.formdata.email" required>
        <input type="password" placeholder="password"  v-model="this.formdata.password" required>
        <div>
          <input type="radio" id="remenber">
          <label for="remenber" >Remenber me</label>
        </div>
        <button type="submit" class="btn btn-primary">Sign in</button>
      </form>
      <p>purga</p>
    </div>
  </div>

</template>

<style scoped>
#tmp{
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign_in_form{
  width: 40%;
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