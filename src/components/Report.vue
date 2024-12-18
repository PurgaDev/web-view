<script>
import  axios from 'axios'
import Update from "./Update_report.vue";

export default {
  name: "Report",
  components: {Update},
  data(){
    return {
      display_update:false,
      description_update:"",
      tmp:this.description
    }
  },

  props:{
    description:"",
    img_src:"",
    id:0,
  },

  methods:{
    async delete_report(){
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.refresh_token || !user.access_token) {
        console.error("Tokens manquants");
        return;
      }

      const access_token = user.access_token
      try{
        const response = await axios.delete(
            "http://127.0.0.1:8000/api/reporting/delete/",
            {
              data: { pk: this.id },
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
        );

        if (response.status === 204) {
          this.$emit("delete_report", this.id);
          console.log('delete report successfully');
        }

      }catch(err){
        console.error(err)
      }

    },

    info_report(){
      this.display_update=!this.display_update;
    },

    async update_report(){
      if (this.description_update.length>0){

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.refresh_token || !user.access_token) {
          console.error("Tokens manquants");
          return;
        }

        const access_token = user.access_token

        try{
          const response = await axios.put(
              "http://127.0.0.1:8000/api/reporting/update/",
              {
                reporting_id: this.id ,
                description: this.description_update,
              },

              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
              }
          );

          if (response.status === 200) {
            // update into bd
            this.$emit("update_report", this.id,this.description_update);
            this.display_update=false;
            this.tmp=this.description_update;

            console.log('update report successfully');
          }

        }catch(err){
          console.error(err)
        }
      }
    },

    async validate_report(){
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.refresh_token || !user.access_token) {
        console.error("Tokens manquants");
        return;
      }

      const access_token = user.access_token

      try{
        const response = await axios.post(
            "http://127.0.0.1:8000/api/reporting/validate/",
            {
              reporting_id: this.id ,
              decision: "validate",
            },

            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
        );

        if (response.status === 201) {
          console.log(response.data);
        }

        if (response.status === 200) {
          alert(response.data.message);
        }

      }catch(err){
        console.error(err)
      }
    },

    }
}

</script>

<template>
  <div class="bg" @click.self="display_update=false" v-if="display_update">
    <div class="logout box">
      <p> enter the new description</p>
      <input type="text" placeholder="Description" v-model="description_update" />
      <div>
        <button class="btn btn-danger" @click="update_report">validate</button>
        <button class="btn btn-white" @click="display_update=false">abandon</button>
      </div>
    </div>
  </div>

  <div class="recontainer">
    <div class="image"><img :src=img_src></div>
    <div class="description">{{tmp}}</div>
      <div class="actionbutton">
        <input type="button" value="!"  @click="info_report" @close="info_report()"/>
        <input type="button" value="delete" @click="delete_report"/>
        <input type="button" value="validate" @click="validate_report" />
      </div>
  </div>
</template>

<style scoped>


  .recontainer{
    background: white;
    overflow: hidden;
    padding: 10px;

    width: 300px;
    height: 400px;
    border-radius: 30px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    transition: .3s ease-in-out;
  }
  .recontainer:hover {
    transform: scale(1.01);
  }

  .description{
    overflow: hidden;
  }
  .image{
    height: 60%;
    border-radius: 30px;
    background: #f3f3f3;
    overflow: hidden;
  }

  .image img {
    width: 400px;
  }

  .recontainer .actionbutton{
    display: flex;
    justify-content: end;
    gap: 10px;
  }

  .recontainer .actionbutton input{
    border: none;
    border-radius: 20px;
    padding: 6px;
    color: white;
    height: 40px;

    transition-property: background;
    transition: .1s ease-in;
  }

  .recontainer .actionbutton input:nth-child(1){
    background: #ffd503;
    width: 40px;
    border-radius: 50%;
    font-weight:bolder;
  }

  .recontainer .actionbutton input:nth-child(2){
    background: #da0000;
  }

  .recontainer .actionbutton input:nth-child(3){
    background: #10bf2d;
  }

  .recontainer .actionbutton input:hover{
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