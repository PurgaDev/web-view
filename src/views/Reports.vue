<script>
import Report from "../components/Report.vue";
import axios from 'axios';
import { API_URL } from "../constante.js"
import Loader from "../components/Loader.vue";

export default {
  name: "Reports",
  components: {
    Report,
    Loader,
  },
  data(){
    return {
      reports:[],
      isLoading:true,
  }
  },

  methods:{
    async getreports(){

      const user = JSON.parse(localStorage.getItem("user"));
      const access_token = user.access_token

      try{
        const response = await axios.get(
          API_URL + "api/reporting/list/",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )

        if (response.status === 200) {
          this.reports = response.data;

          for ( let i =0;i<this.reports.length;i++) {
            this.reports[i].image=API_URL + `${this.reports[i].image.substring(1)}`
          }
        }
      }catch(erorr){
        console.error("Error fetching deposits", error);
      }finally{
        this.isLoading = false;
      }     
    },

    delete_report(pk){
      for (let i = 0; i < this.reports.length; i++){
        if (this.reports[i].id===pk){
          this.reports[i].description=""
        }
      }
    },

    update_report(pk,new_desc){
      for (let i = 0; i < this.reports.length; i++) {
        if (this.reports[i].id==pk) {
          this.reports[i].description=new_desc
        }
      }
      console.log(this.reports)
    }

  },

  mounted() {
    this.getreports();
  }
}

</script>

<template>
  <div class="main-rep-container">
    <Loader v-if="isLoading" :visible="isLoading" />

    <div v-for="report in this.reports" :key="report.id" v-if="!isLoading" >
      <div v-if="report.description.length>0">
        <Report :description=report.description :img_src=report.image :id="report.id" @delete_report="delete_report" @update_report="update_report"></Report>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main-rep-container {
    position: relative;
    left: 10%;

    display: grid;
    grid-template-columns: repeat(4,auto);
    gap: 20px;
    width: fit-content;
  }
</style>