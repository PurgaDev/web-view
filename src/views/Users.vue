<script>
import User from "../components/User.vue";
import axios from 'axios'

export default {
  name: "Users",
  components:{User},

  data(){
    return {
      users:[]
    }
  },

  methods:{

    async delete_user(id){
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.refresh_token || !user.access_token) {
        console.error("Tokens manquants");
        return;
      }

      const access_token = user.access_token
      try{
        const response = await axios.delete(
            "http://127.0.0.1:8000/api/user/userdelete/",
            {
              data: { id: id },
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
        );

        let i
        if (response.status === 200) {
          console.log('delete user successfully');
          for (i=0; i < this.users.length; i++) {
            if (this.users[i].id === id) {
              this.users[i].phone_number=""
              break
            }
          }
          this.users.splice(i, 1)
        }
      }catch(err){
        console.error(err)
      }
    },

    async update_user(id,first_name_up,last_name_up,email_up,phone_number_up){
      if (first_name_up.length>0 && phone_number_up.length>0){

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.refresh_token || !user.access_token) {
          console.error("Tokens manquants");
          return;
        }

        const access_token = user.access_token

        try{
          const response = await axios.post(
              "http://127.0.0.1:8000/api/user/userupdate/",
              {
                "id": id,
                "first_name": first_name_up,
                "last_name": last_name_up,
                "email": email_up,
                "phone_number": phone_number_up,
              },

              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
              }
          );

          if (response.status === 200) {

            console.log('update user successfully');
          }

        }catch(err){
          console.error(err)
        }
      }
    },

    async get_user(){
      const user = JSON.parse(localStorage.getItem("user"));
      const access_token = user.access_token

      try {
        const response = await axios.get(
            "http://127.0.0.1:8000/api/user/userlist/",
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
        )
        if (response.status === 200) {
          this.users = response.data
        }
      } catch (err) {
        console.log(err)
      }

    },
  },
  mounted() {
    this.get_user();
  }
}
</script>

<template>
  <div class="users">

    <div class="header">
      <h3>Driver</h3>
      <i class='bx bxs-plus-circle bx-md' @click="display_update=true"></i>
    </div>

    <div v-for="user in this.users" :key="user.id">
      <div>
        <User
            :first_name="user.first_name"
            :last_name="user.last_name"
            :email="user.email"
            :id="user.pk"
            :phone_number="user.phone_number"
            :role="user.role"
            @delete_user="delete_user"
            @update_user="update_user"
        ></User>
      </div>
    </div>
  </div>

</template>

<style scoped>
.users{
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.header{
  position: relative;
  width: 90vw;
  top: 90px;
  left: 10%;
}
</style>