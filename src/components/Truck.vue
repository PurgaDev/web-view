<script>
export default {
  name: "Truck",

  data(){
    return {
      display_update:false,
      newcapacity:this.capacity,
      tmpcapacity:this.capacity,
      driver:this.current_driver?.id,
    }
  },

  props: {
    id:Number,
    capacity:Number,
    current_driver:{},
    drivers:[],
  },
  methods:{
    deletetruck(){
      this.$emit('deletetruck',this.id)
    },

    updatetruck(){
      if (this.newcapacity<=0) return
      this.display_update=false
      this.tmpcapacity=this.newcapacity
      this.$emit("updatetruck",this.id,this.newcapacity)
      if (this.driver != this.current_driver?.id) {
        this.$emit('changedriver',this.id ,this.driver)
      }
    },

    formatDate(date) {
      const newDate = new Date(date)
      return newDate.toLocaleString("fr-FR", {
        timeZone: "UTC",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        // hour: "2-digit",
        // minute: "2-digit",
        // second: "2-digit",
      })
    }
  },
}
</script>

<template>
  <!-- <div class="truck">
    <p> driver : {{driver}}</p>
    <p>capacity : {{tmpcapacity}}</p>
    <button class="btn btn-success" @click="display_update=true" style="width: fit-content">update</button>
    <button class="btn btn-danger" @click="deletetruck" style="width: fit-content;margin-left: -20px">delete</button>
  </div> -->
  <th scope="row">{{ id }}</th>
  <td>{{ tmpcapacity }}</td>
  <td>{{ current_driver?.driver_name }}</td>
  <td>{{ formatDate(current_driver?.assignation_date) }}</td>
  <td class="d-flex gap-3">
    <button class="btn btn-success" @click="display_update=true" style="width: fit-content">Update</button>
    <button class="btn btn-danger" @click="deletetruck" style="width: fit-content">Delete</button>
  </td>

    <div class="bg" @click.self="display_update=false" v-if="display_update">
      <div class="logout box bg-white p-5">
        <h3 class="mb-3">Create truck</h3>
        <form class="">
          <div class="row mt-3">
            <div class="col-12 mb-3">
              <label for="capacity" class="form-label">Capacity</label>
              <input class="form-control" type="number" placeholder="capacity" v-model="newcapacity"/>
            </div>
            <div class="col-12 mb-3">
              <label for="capacity" class="form-label">Driver</label>
              <select class="form-select" v-model="driver">
                <option class="bg-primary-subtle border-b-2" v-for="d in drivers" :value="d.pk">{{ d.first_name }} {{ d.last_name }}</option>
              </select>
            </div>
            <div class="col-12 d-flex justify-content-between">
              <button class="btn btn-secondary px-3 py-2 fw-medium" @click="display_update=false">Discard</button>
              <button class="btn btn-primary px-3 fw-medium" @click="updatetruck">Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
</template>

<style scoped>

.box{
  background: #eaeaea;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  /* width: 30%; */
  /* height: 20%; */


  flex-direction: column;
}

.truck{
  display: grid;
  grid-template-columns: repeat(4,.5fr);
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