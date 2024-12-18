<script>
import axios from 'axios'
import logout from "./Logout.vue";
export default {
  name: "Report",
  props:{
    description:"",
    cleaned:false,
    longitude:"",
    latitude:"",
    id:"",
    size:""
  },
  data(){
    return{
      display_update:false,
      new_description:"",
      new_cleaned:"",
      tmp:this.description
    }
  },

  methods:{
    async delete_deposit(){
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.refresh_token || !user.access_token) {
        console.error("Tokens manquants");
        return;
      }
      console.log(this.id)
      const access_token = user.access_token
      try{
        const response = await axios.post(
            "http://127.0.0.1:8000/api/deposit/delete/",
            {
              pk: this.id
            },
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
        );

        if (response.status === 200) {
          this.$emit("delete_deposit", this.id);
          console.log('deposit deleted successfully');
        }

      }catch(err){
        console.error(err)
      }

    },

    async update_deposit(){
      if (this.new_description.length>0){

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.refresh_token || !user.access_token) {
          console.error("Tokens manquants");
          return;
        }

        const access_token = user.access_token

        try{
          const response = await axios.post(
              "http://127.0.0.1:8000/api/deposit/update/",
              {
                pk: this.id ,
                description: this.new_description,
                cleaned: this.new_cleaned,
              },

              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
              }
          );

          if (response.status === 200) {
            // update into bd
            this.$emit("update_deposit", this.id,this.new_description,this.new_cleaned);
            this.display_update=false;
            this.tmp=this.new_description;

            console.log('update deposit successfully');
          }

        }catch(err){
          console.error(err)
        }
      }
    },
  }
}
</script>

<template>
  <div class="de_container">
    <div class="description">
      <div>{{tmp}}</div>
    </div>
    <div class="position">
      <p>Longitude:{{longitude}}</p>
      <p>Longitude:{{latitude}}</p>
      <input type="checkbox" :checked="cleaned" disabled>
      <p>Taille : {{size}}</p>
    </div>
    <div class="actionbutton">
      <input type="button" value="!"  @click="display_update=true"/>
      <input type="button" value="delete" @click="delete_deposit"/>
    </div>
  </div>

  <div class="bg" @click.self="display_update=false" v-if="display_update">
    <div class="logout box">
      <p> enter the new description</p>
      <input type="text" placeholder="description" v-model="new_description"/>
      <input type="checkbox" :checked="cleaned"  v-model="new_cleaned">

      <div>
        <button class="btn btn-danger" @click="update_deposit">validate</button>
        <button class="btn btn-white" @click="display_update=false">abandon</button>
      </div>
    </div>
  </div>

</template>

<style scoped>


.de_container{
  position: relative;
  left: 10%;

  background: white;
  overflow: hidden;
  padding: 20px;

  width: 300px;
  height: 400px;
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  transition: .3s ease-in-out;
}

.de_container:hover {
  transform: scale(1.01);
}

.image{
  height: 60%;

  border-radius: 30px;
  background: #f3f3f3;
}

.de_container .actionbutton{
  display: flex;
  justify-content: end;
  gap: 10px;
}

.de_container .actionbutton input{
  border: none;
  border-radius: 20px;
  padding: 6px;
  color: white;
  height: 40px;

}

.de_container .actionbutton input:hover{
  filter: brightness(110%);
  transform: scale(1.01);
}

.de_container .actionbutton input:nth-child(1){
  background: #ffd503;
  width: 40px;
  border-radius: 50%;
  font-weight:bolder;
}

.de_container .actionbutton input:nth-child(2){
  background: #da0000;
}

.position, .actionbutton{
  border-radius: 30px;
  padding:10px;
  background: rgba(0, 0, 0, 0.01);
}

.position{
  padding: 30px;
}

.description{
  padding: 0;
  margin: 0;
  width: 100%;
  height: 20%;

  display: flex;
  align-items: center;

  background: rgba(0, 255, 51, 0.09);
  border-radius: 30px;
  color: #003C37;

  font-weight: bolder;
  font-family: padmaa-Bold.1.1;
  font-size: 14px;
}

.description div{
  text-align: center;
  width: 100%;
  overflow: auto;
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