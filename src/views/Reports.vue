<script>
import Report from "../components/Report.vue";
import axios from 'axios';


export default {
  name: "Reports",
  components: {Report},
  data(){
    return {
      reports:[]
  }
  },

  methods:{
    async getreports(){

      const user = JSON.parse(localStorage.getItem("user"));
      const access_token = user.access_token

      const response = await axios.get(
          "http://127.0.0.1:8000/api/reporting/list/",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }

      )

      if (response.status === 200) {
        this.reports = response.data;

        for ( let i =0;i<this.reports.length;i++) {
          this.reports[i].image=`http://127.0.0.1:8000${this.reports[i].image}`
        }
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
    <div v-for="report in this.reports" :key="report.id" >
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