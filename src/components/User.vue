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
      <p> enter the new informations</p>
      <input type="text" placeholder="first_name" v-model="first_name_up" />
      <input type="text" placeholder="last_name" v-model="last_name_up" />
      <input type="text" placeholder="phone_number" v-model="phone_number_up" maxlength="9"/>
      <input type="email" placeholder="email" v-model="email_up"/>

      <div>
        <button class="btn btn-danger" @click="update_user">update</button>
        <button class="btn btn-white" @click="display_update=false">abandon</button>
      </div>
    </div>
  </div>

  <div class="usercontainer" v-if="phone_number_up.length>0">

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
  </div>
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