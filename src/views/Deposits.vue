<script>
import Deposit from "../components/Deposit.vue";
import axios from 'axios'
import { API_URL } from "../constante.js"
import Loader from "../components/Loader.vue";

export default {
  name: "Deposits",
  components:{
    Deposit,
    Loader,
  },
  data(){
    return{
      deposits:[],
      isLoading:true,
    }
  },

  methods:{
    async getdeposit(){

      const user = JSON.parse(localStorage.getItem("user"));
      const access_token = user.access_token

      try{
        const response = await axios.get(
            API_URL + "api/deposit/read/",
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }

        )

        if (response.status === 200) {
          console.log(response.data);
          this.deposits = response.data;
        }
      }catch(erorr){
        console.error("Error fetching deposits", error);
      }finally{
        this.isLoading = false;
      }     
    },

    delete_deposit(pk){
      for (let i = 0; i < this.deposits.length; i++){
        if (this.deposits[i].id==pk){
          this.deposits[i].description=""
        }
      }
      console.log(this.deposits);
    },

    update_deposit(pk,new_desc,cleaned){
      for (let i = 0; i < this.deposits.length; i++) {
        if (this.deposits[i].id==pk) {
          this.deposits[i].description=new_desc
          this.deposits[i].cleaned=cleaned
        }
      }
      console.log(this.deposits)
    }

  },

  mounted() {
    this.getdeposit();
  }

}
</script>

<template>

  <div class="deposits mt-3">
    <Loader v-if="isLoading" :visible="isLoading" />

    <div v-for="deposit in deposits" :key="deposit.id" v-if="!isLoading">
      <!--div v-if="deposit.description.length>0" -->
        <Deposit :id="deposit.id"
                 :cleaned="deposit.cleaned"
                 :description="deposit.description"
                 :latitude="deposit.latitude"
                 :longitude="deposit.longitude"
                 :size="deposit.size"
                 @delete_deposit="delete_deposit"
                 @update_deposit="update_deposit"
        ></Deposit>
      <!--/div -->
    </div>
  </div>

</template>

<style scoped>
  .deposits {
    display: grid;
    grid-template-columns: repeat(4,auto);
    gap: 20px;
    width: fit-content;

    position: relative;
    left: 10%;
  }

</style>