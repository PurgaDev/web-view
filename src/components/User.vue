<script>
import  axios from 'axios'

export default {
  name: "User",
  components: {},
  data(){
    return {
      display_update:false,

      first_name_up:this.first_name,
      last_name_up:this.last_name,
      email_up:this.email,
      phone_number_up:this.phone_number,

      tmp:""
    }
  },

  props:{
    first_name:"",
    last_name:"",
    email:"",
    id:"",
    phone_number:"",
    role:"",
  },

  methods:{
    delete_user(){
      this.phone_number_up=""
      this.$emit('delete_user',this.id)
    },

    update_user(){
      this.$emit('update_user',this.id,this.first_name_up,this.last_name_up,this.email_up,this.phone_number_up)
      this.display_update=false
    }
  }
}

</script>

<template>
  <div class="bg" @click.self="display_update=false" v-if="display_update">
    <div class="logout box">
      <form class="bg-white p-5 rounded-4 shadow-sm">
        <h3 class="h3 mb-3">Enter the new informations</h3>
        <div class="row">
          <div class="col-12 mb-3">
            <label for="first_name" class="form-label">First name</label>
            <input type="text" id="first_name" class="form-control" placeholder="first_name" v-model="first_name_up" />
          </div>
          <div class="col-12 mb-3">
            <label for="last_name" class="form-label">Last name</label>
            <input type="text" id="last_name" class="form-control" placeholder="last_name" v-model="last_name_up" />
          </div>
          <div class="col-12 mb-3">
            <label for="phone_number" class="form-label">Phone number</label>
            <input type="text" id="phone_number" class="form-control" placeholder="phone number" v-model="phone_number_up" maxlength="9"/>
          </div>
          <div class="col-12 mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" class="form-control" placeholder="email" v-model="email_up"/>
          </div>
          <hr class="divider my-3">
          <div class="d-flex justify-content-between">
            <button class="btn btn-secondary px-3 py-2 fw-medium" @click="display_update=false">Discard</button>
            <button class="btn btn-primary px-3 py-2 fw-medium" @click="update_user">Update</button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <!-- <div class="usercontainer" v-if="phone_number_up.length>0">

    <div class="userdata">
      <p>first name : {{first_name_up}}</p>
      <p>last name : {{last_name_up}}</p>
      <p>email : {{email_up}}</p>
      <p>phone number : {{phone_number_up}}</p>
      <p>role : {{role}}</p>
    </div>
    <div class="actionbutton">
      <input type="button" value="x" @click="delete_user"/>
      <input type="button" value="update" @click="display_update=true" />
    </div>
  </div> -->

  <th scope="row">{{ id }}</th>
  <td>{{ first_name }}</td>
  <td>{{ last_name }}</td>
  <td>{{ email }}</td>
  <td>{{ phone_number }}</td>
  <td>{{ role }}</td>
  <td class="actionbutton d-flex gap-3">
    <button class="btn btn-outline-danger" type="button"  @click="delete_user"> <i class="bx bxs-trash"></i> </button>
    <input class="btn btn-outline-primary" type="button" value="Update" @click="display_update=true" />
  </td>
</template>

<style scoped>


.usercontainer{
  position: relative;
  top: 90px;
  left: 10%;
  
  background: white;
  padding: 10px;

  width: 80%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: space-between;
  transition-delay: .2s;

}


.userdata{
  width: 90%;
  display: grid;
  grid-template-columns: repeat(5,1fr);
  justify-content: space-between;
}

.usercontainer:hover {
  transform: scale(1.003);
}



.usercontainer .actionbutton{
  display: flex;
  justify-content: end;
  gap: 10px;

}

.usercontainer .actionbutton input{
  border: none;
  border-radius: 20px;
  padding: 6px;
  color: white;
  height: 40px;

  transition-property: background;
  transition: .1s ease-in;
}

.usercontainer .actionbutton input:nth-child(1){
  background: #c50000;
  width: 40px;
  border-radius: 50%;
  font-weight:bolder;
}

.usercontainer .actionbutton input:nth-child(2){
  background: #10bf2d;
}

.usercontainer .actionbutton input:hover{
  filter: brightness(110%);
}


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