<script>
export default {
  name: "Truck",

  data(){
    return {
      display_update:false,
      newcapacity:0,
      tmpcapacity:this.capacity,
    }
  },

  props: {
    id:Number,
    capacity:Number,
    driver:[]
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
    }
  },
}
</script>

<template>
  <div class="truck">
    <p> driver : {{driver}}</p>
    <p>capacity : {{tmpcapacity}}</p>
    <button class="btn btn-success" @click="display_update=true" style="width: fit-content">update</button>
    <button class="btn btn-danger" @click="deletetruck" style="width: fit-content;margin-left: -20px">delete</button>
  </div>

    <div class="bg" @click.self="display_update=false" v-if="display_update">
      <div class="logout box">
        <p> enter the new capacity</p>
        <input type="number" placeholder="capacity" v-model="newcapacity"/>
        <div>
          <button class="btn btn-success" @click="updatetruck">validate</button>
          <button class="btn btn-white" @click="display_update=false">abandon</button>
        </div>
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

  width: 30%;
  height: 20%;


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