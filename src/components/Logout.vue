<script>
import axios from 'axios'
import { API_URL } from "../constante.js"
export default {
  name: "Logout",
  data(){
    return {
    }
  },

  methods:{
    async logout(){
      this.$emit('close');

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.refresh_token || !user.access_token) {
        console.error("Tokens manquants");
        return;
      }

      const refresh_token = user.refresh_token
      const access_token = user.access_token

      const response = await axios.post(
          API_URL + "api/user/logout/",
          {
            refresh_token:refresh_token,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }

      )

      if (response.status === 200) {
        localStorage.removeItem("user")
      }
      this.$router.push("/sign-in")
    },

    close(){
      this.$emit('close');
    }
  },
}
</script>

<template>
  <div class="bg" @click.self="close">
    <div class="logout box">
        <p> are you sure that you want to leave ?</p>
        <div>
          <button class="btn btn-danger" @click="logout">yes</button>
          <button class="btn btn-white" @click="close">no</button>
        </div>
    </div>
  </div>
</template>

<style scoped>
.box{
  background: #eaeaea;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 30%;
  height: 20%;


  flex-direction: column;
}

.bg{
  background: rgba(0, 0, 0, 0.52);
  backdrop-filter: blur(0px);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: backdrop-filter 0.5s ease;

}

.bg:hover{
  backdrop-filter: blur(10px); /* Appliquer un flou de 10px au hover */
}

</style>