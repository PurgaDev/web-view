<script>
import User from "../components/User.vue";
import axios from 'axios'
import { API_URL } from "../constante.js"
import Loader from "../components/Loader.vue";


export default {
  name: "Users",
  components:{
    User,
    Loader,
  },

  data(){
    return {
      users:[],
      drivers: [],
      display_update: false,
      formdata: {
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        role: "driver"
      },
      isLoading:true,
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
            API_URL + "api/user/userdelete/",
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
          this.users = this.users.filter(user => user.pk != id)
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
              API_URL + "api/user/userupdate/",
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
            this.users = this.users.map(user => {
              if(user.pk == id){
                user.first_name = first_name_up
                user.last_name = last_name_up
                user.phone_number = phone_number_up
                user.email = email_up
              }
              return user
            })
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
            API_URL + "api/user/userlist/",
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
      }finally{
        this.isLoading=false;
      }

    },

    async createdriver() {
      const user = JSON.parse(localStorage.getItem("user"));
      const access_token = user.access_token
      this.formdata.phone_number = `+237${this.formdata.phone_number}`
      try {
        const response = await axios.post(
          API_URL + "api/user/register/",
          this.formdata,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            }
          }
        )

        if(response.status == 200) {
          console.log(response.data)
          this.users = this.users.unshift(response.data)
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
    <Loader v-if="isLoading" :visible="isLoading" />

    <!-- <div class="header">
      <h3>Driver</h3>
      <i class='bx bxs-plus-circle bx-md' @click="display_update=true"></i>
    </div> -->

    <!-- <div v-for="user in this.users" :key="user.id" v-if="!isLoading">
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
    </div> -->

    <div class="card p-3 m-4 mt-4 bg-white">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h3 class="card-title">Drivers</h3>
          <button class="btn btn-outline-primary px-3 py-2 fw-medium d-flex align-items-center" @click="display_update=true">Create driver <i class="ms-2 bx bxs-plus-circle text-center fs-5"></i></button>
        </div>
        <table class="table caption-top"> 
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone number</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr v-for="user in this.users" class="py-3" :key="user.id">
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="bg" @click.self="display_update=false" v-if="display_update">
      <div class="logout box bg-white p-5 rounded-4">
        <h3 class="mb-3">Create driver</h3>
        <form class="">
          <div class="row mt-3">
            <div class="col-12 col-lg-6 mb-3">
              <label class="form-label">First name</label>
              <input class="form-control" type="text" placeholder="first name" v-model="formdata.first_name"/>
            </div>
            <div class="col-12 col-lg-6 mb-3">
              <label class="form-label">Last name</label>
              <input class="form-control" type="text" placeholder="first name" v-model="formdata.last_name"/>
            </div>
            <div class="col-12 mb-3">
              <label class="form-label">Email</label>
              <input class="form-control" type="email" placeholder="email" v-model="formdata.email"/>
            </div>
            <div class="col-12 mb-3"> 
              <label class="form-label">Phone number</label>
              <div class="row ms-1">
                <label class="col-2 bg-primary text-center p-2 text-white fw-bold rounded-3">+237</label>
                <div class="col-10">
                  <input class="form-control" type="text" placeholder="phone number" v-model="formdata.phone_number"/>
                </div>
              </div>
            </div>
            <div class="col-12 d-flex justify-content-between">
              <button class="btn btn-secondary px-3 py-2 fw-medium" @click="display_update=false">Discard</button>
              <button class="btn btn-primary px-3 fw-medium" @click="createdriver">Create</button>
            </div>
          </div>
        </form>
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

.table{
  margin-top: 3rem;
}
.box{
  display: flex;
  align-items: center;
  justify-content: center;

  width: 30%;

  flex-direction: column;
}

.bg {
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.33);
    position: absolute;
    top: -100px;
    left: -230px;
    width: 110vw;
    height: 110vh;
    min-width: 100vh;

    z-index: 100;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: backdrop-filter 0.5s ease;
  }
</style>