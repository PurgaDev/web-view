<script>
import Truck from "../components/Truck.vue";
import axios from 'axios'


export default {
  name: "Trucks",
  components:{Truck},

  data(){
    return{
      trucks: [],
      capacity:0,
      display_update:false
    }
  },

  methods: {
    async getTrucks() {

      const user = JSON.parse(localStorage.getItem("user"));
      const access_token = user.access_token

      try {
        const response = await axios.get(
            "http://127.0.0.1:8000/api/deposit/readtruck/",
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
        )
        this.trucks = response.data
      } catch (err) {
        console.log(err)
      }
    },

    async deletetruck(pk) {

      const user = JSON.parse(localStorage.getItem("user"));
      const access_token = user.access_token

      try {
        const response = await axios.delete(
            "http://127.0.0.1:8000/api/deposit/deletetruck/",
            {
              data: {truck_id: pk},
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
        )
        if (response.status === 200) {
          let i
          for (i = 0; i < this.trucks.length; i++) {
            if (this.trucks[i].id === pk) {
              break
            }
          }
          this.trucks.splice(i, 1)
        }
      } catch (err) {
        console.log(err)
      }
    },

    async updatetruck(truck_id, newcapacity) {
      this.display_update = false

      const user = JSON.parse(localStorage.getItem("user"));
      const access_token = user.access_token

      try {
        const response = await axios.put(
            "http://127.0.0.1:8000/api/deposit/updatetruck/",
            {
              "truck_id": truck_id,
              "capacity": newcapacity
            },
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
        )
        if (response.status === 200) {
          for (let i = 0; i < this.trucks; i++) {
            if (this.trucks[i].id === truck_id) {
              this.trucks[i].capacity = newcapacity
              break
            }
          }
          console.log(response.data)
        }
      } catch (err) {
        console.log(err)
      }
    },

    async creattruck(capacity) {
      this.display_update = false

      const user = JSON.parse(localStorage.getItem("user"));
      const access_token = user.access_token

      try {
        const response = await axios.post(
            "http://127.0.0.1:8000/api/deposit/createtruck/",
            {
              "capacity": capacity,
              "driver": []
            },
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
        )
        if (response.status === 201) {
          this.trucks.push(response.data)
        }
      }catch (err){
        console.log(err)
      }
    },
  },

  mounted() {
    this.getTrucks()
  }
}

</script>

<template>
  <div class="trucks-containers">
    <h3>trucks</h3>
    <i class='bx bxs-plus-circle bx-md' @click="display_update=true"></i>

    <div class="trucks">
      <div v-for='truck in trucks' :key='truck.id' >
        <div v-if="truck.capacity>0">
          <Truck :id="truck.id"
                 :capacity="truck.capacity"
                 :driver="truck.driver"
                 @updatetruck="updatetruck"
                 @deletetruck="deletetruck"
          ></Truck>
        </div>
      </div>
    </div>

    <div class="bg" @click.self="display_update=false" v-if="display_update">
      <div class="logout box">
        <p> enter the capacit of the new vehicule</p>
        <input type="number" placeholder="capacity" v-model="capacity"/>
        <div>
          <button class="btn btn-success" @click="creattruck(capacity)">create</button>
          <button class="btn btn-white" @click="display_update=false">abandon</button>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>
  .trucks-containers {
    position: relative;
    width: 90vw;
    top: 90px;
    left: 10%;
  }

  .trucks{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 20px 0;

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