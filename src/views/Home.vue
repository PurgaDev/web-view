<script>
import GoogleMap from "../components/GoogleMap.vue";
import axios from 'axios'

export default {
  name: "Home",
  components: {GoogleMap},

  data(){
    return {
      nb_deposits: 0,
      nb_reports:0,
      nb_cleaned_deposits: 0,
    }
  },

  methods:{
    async update_nb(){
        const user = JSON.parse(localStorage.getItem("user"));
        const access_token = user.access_token

        const response = await axios.get(
            "http://127.0.0.1:8000/api/deposit/read/",
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }

        )
        if (response.status === 200) {
          let tmp = response.data;
          for (let i = 0; i < tmp.length; i++) {
            if (tmp[i].cleaned===true){
              this.nb_cleaned_deposits++;
            }
          }
          this.nb_deposits =tmp.length;
        }

      const response2 = await axios.get(
          "http://127.0.0.1:8000/api/reporting/list/",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }

      )

      if (response2.status === 200) {
        this.nb_reports=response2.data.length;
      }
    }

  },

  mounted() {
    this.update_nb()
  }

}
</script>

<template>

  <div class="tmp">
    <div class="container2">
      <div class="column1">
        <div class="stat">
          <div class="stat1">
            <div class="elt"> Deposit : {{ nb_deposits }}</div>
            <div class="elt"> Reporting : {{nb_reports}}</div>
            <div class="elt"> Cleaned deposit : {{nb_cleaned_deposits}}</div>
          </div>

          <div class="stat2">
            <div class="elt"> Trucks number</div>
            <div class="elt"> Driver number</div>
          </div>
        </div>

        <div class="map">
          <GoogleMap/>
        </div>

      </div>

      <div class="column2">
        <div class="trucks">
          <div class="box">Staff</div>
        </div>
        <div class="staff">
          <div class="box">Trucks</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .stat1{
    background: white;
    padding: 40px;
    border-radius: 30px;
    display: flex;

    min-width: fit-content;
    width: 50%;

    align-items: center;
    justify-content: space-around;
  }

  .elt{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stat1 .elt{
    background: #003C37;
    padding: 20px;
    border-radius: 50px;
    width: fit-content;
    height: fit-content;
    color: white;
  }

  .stat1 .elt:nth-child(1){
    background: #52CA8E;
  }
  .stat1 .elt:nth-child(2){
    background: #FFA600;
  }
  .stat1 .elt:nth-child(3){
    background: #D7E415;
  }

  .stat2{
    background: #003C37;
    border-radius: 30px;
    padding: 10px;
    color: white;
    width: fit-content;

    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
  }

  .stat{
    display: flex;
    justify-content: space-between;
    gap: 50px;
  }

  .stat .stat1{
    width: 70%;
  }
  .stat .stat2{
    width: 30%;
  }

  .container2{


    height: 90vh;
    width: 80%;

    display: flex;

    gap: 50px;
    padding: 20px;
  }

  .tmp{

    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    position: relative;

  }
  .column2{


    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
    gap: 50px;
    width: 20%;

    filter: saturate(2) contrast(-1);
  }

  .column2 .staff,.column2 .trucks{

    width: 100%;
    height:  100%;
    border-radius: 30px;

    overflow: hidden;
  }

  .column2 .trucks{
    background-image: url("/src/assets/truck.jpg");
    background-size: cover;
  }

  .column2 .trucks, .column2 .staff{
    display: flex;
    flex-direction: column;
    justify-content: end;
    transition-property: transform;

    transition: 0.3s ease-in-out;
  }

  .column2 *:hover {
    transform: scale(1.02);
  }
  .column2 .staff{
    background-image: url("/src/assets/staff.jpeg");
    background-size: cover;
  }
  .column1{
    display: flex;
    flex-direction: column;
    width: 80%;

    gap: 50px;
  }

  .map{
    background: white;

    width: 100%;
    flex-grow: 1;

    border-radius: 30px;
    overflow: hidden;
  }

  .box{
    background: rgba(9, 37, 30, 0.68);
    width: 100%;
    height: 20%;
    color: white;
  }

</style>