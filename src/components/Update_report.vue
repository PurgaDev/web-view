<script>
export default {
  name: "update",
  data(){
    return {
      description:""
    }
  },

  props:{
    id:"",
  },

  methods:{
    update_report(){},

    close(){
      alert('sad')
      this.$emit('close')
    }
  },
}
</script>

<template>
  <div class="bg" @click.self="">
    <div class="logout box">
      <p> enter the new description</p>
      <input type="text" placeholder="Enter description" v-model="description"/>
      <div>
        <button class="btn btn-danger" @click="update_report">validate</button>
        <button class="btn btn-white" @click="close">abandon</button>
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

.bg{
  backdrop-filter: blur(0px);
  background: rgba(0, 0, 0, 0.33);
  position: absolute;
  top: -100px;
  left: -130px;
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