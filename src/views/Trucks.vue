<script>
import Truck from "../components/Truck.vue";
import axios from 'axios'
import { API_URL } from "../constante.js"

export default {
  name: "Trucks",
  components:{Truck},

  data(){
    return{
      trucks: [],
      drivers: [],
      capacity:0,
      driver:null,
      display_update:false
    }
  },

  methods: {
    async getTrucks() {

      const user = JSON.parse(localStorage.getItem("user"));
      const access_token = user.access_token

      try {
        const response = await axios.get(
            API_URL + "api/deposit/readtruck/",
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
        )
        console.log(response.data)
        this.trucks = response.data
      } catch (err) {
        console.log(err)
      }
    },

    async deletetruck(pk) {

      const user = JSON.parse(localStorage.getItem("user"));
      const access_token = user.access_token
      console.log(pk)
      try {
        const response = await axios.delete(
            API_URL + "api/deposit/deletetruck/",
            {
              data: {truck_id: pk},
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
        )
        if (response.status === 200) {
          this.trucks = this.trucks.filter(truck => truck.id != pk) 
        }
      } catch (err) {
        console.log(err)
      }
    },

    async updatetruck(truck_id, newcapacity, driver) {
      this.display_update = false

      const user = JSON.parse(localStorage.getItem("user"));
      const access_token = user.access_token

      try {
        const response = await axios.put(
            API_URL + "api/deposit/updatetruck/",
            {
              "truck_id": truck_id,
              "capacity": newcapacity,
              "driver": driver,
            },
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
        )
        if (response.status === 200) {
          // for (let i = 0; i < this.trucks; i++) {
          //   if (this.trucks[i].id === truck_id) {
          //     this.trucks[i].capacity = newcapacity
          //     break
          //   }
          // }
          // console.log(response.data)
          this.trucks = this.trucks.map(truck => {
            if(truck.id == truck_id) {
              truck.capacity = newcapacity
            }
            return truck
          })
        }
      } catch (err) {
        console.log(err)
      }
    },

    async creattruck() {
      this.display_update = false

      const user = JSON.parse(localStorage.getItem("user"));
      const access_token = user.access_token
      if(this.driver == null) return
      console.log(this.driver)

      try {
        const response = await axios.post(
            API_URL + "api/deposit/createtruck/",
            {
              "capacity": this.capacity,
            },
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
        )
        if (response.status === 201) {
          const response2 = await axios.post(
            API_URL + "api/deposit/createdrive/",
            {
              driver_id: this.driver,
              truck_id: response.data.id
            },
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            })

            if(response2.status == 201) {
              console.log("data")
            }
        }
      }catch (err){
        console.log(err)
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
          this.drivers = response.data.filter(user => user.role == 'driver')
          console.log(this.drivers)
        }
      } catch (err) {
        console.log(err)
      }

    },

    async changeDriver(truck_id, driver_id) {
      console.log("driver modified " + driver_id)
      const user = JSON.parse(localStorage.getItem("user"));
      const access_token = user.access_token
      try {
        const response = await axios.post(
            API_URL + "api/deposit/createdrive/",
            {
              "truck_id": truck_id,
              "driver_id": driver_id,
            },
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
        )
        if (response.status == 201) {
          this.trucks = this.trucks.map((truck) => {
            if(truck.id == truck_id) {
              truck.current_driver =  {
                "id": response.data['id'],
                "driver_name": response.data['driver'],
                "assignation_date": response.data['assignation_date'],
              }

              truck.drivers.push({
                "pk": response.data['id'],
                "driver_name": response.data['driver'],
                "assignation_date": response.data['assignation_date'],
              })
            }
            return truck
          })
        }
      }catch (err){
        console.log(err)
      }
    }
  },

  mounted() {
    this.getTrucks()
    this.get_user()
  }
}

</script>

<template>
  <div class="trucks-containers">
    <!-- <h3>trucks</h3>
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
    </div> -->

    <div class="row">
      <div class="col-8">
        <div class="card mx-3 p-3">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-3">
              <h3 class="card-title h3">Trucks</h3>
              <button class="btn btn-outline-primary d-flex align-items-center fw-medium"  @click="display_update=true">Create truck <i class="bx bxs-plus-circle ms-2 bx-sm"></i> </button>
            </div>

            <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Capacity</th>
                    <th scope="col">Driver</th>
                    <th scope="col">Assignation date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  <tr v-for="truck in trucks">
                    <Truck :id="truck.id"
                      :capacity="truck.capacity"
                      :drivers="drivers"
                      :current_driver="truck.current_driver"
                      @updatetruck="updatetruck"
                      @deletetruck="deletetruck"
                      @changedriver="changeDriver"
                    ></Truck>
                  </tr>
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>



    <div class="bg" @click.self="display_update=false" v-if="display_update">
      <div class="logout box bg-white p-5">
        <h3 class="mb-3">Create truck</h3>
        <form class="">
          <div class="row mt-3">
            <div class="col-12 mb-3">
              <label for="capacity" class="form-label">Capacity</label>
              <input class="form-control" type="number" placeholder="capacity" v-model="capacity"/>
            </div>
            <div class="col-12 mb-3">
              <label for="capacity" class="form-label">Driver</label>
              <select class="form-select" v-model="driver">
                <option class="bg-primary-subtle border-b-2" v-for="d in drivers" :value="d.pk">{{ d.first_name }} {{ d.last_name }}</option>
              </select>
            </div>
            <div class="col-12 d-flex justify-content-between">
              <button class="btn btn-secondary px-3 py-2 fw-medium" @click="display_update=false">Discard</button>
              <button class="btn btn-primary px-3 fw-medium" @click="creattruck">Create</button>
            </div>
          </div>
        </form>
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

    /* width: 30%; */

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

  .table{
    margin-top: 3rem;
  }
</style>