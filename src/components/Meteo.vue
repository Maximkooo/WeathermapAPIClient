<template>
  <div class="container">
    <h1 class="my-4 text-center ">Weathermap API Client</h1>
    <div class="form-groupe mb-5">
      <label for="position">Enter a city</label>
      <input
        type="text"
        name="position"
        id="position"
        class="form-control"
        v-model="requete"
        v-on:keypress="goMeteo"
      />
      <label for="position" class="label2">Or push button</label>
      <button v-on:click="goMeteoRandom" @click="increment">Random</button>
      <p>Clicked "Random" <strong>{{ $store.state.count }}</strong> times!</p>
      <div class="area" v-if="error">⚠ wrong input ⚠</div>
      

    </div>
    <div class="w-75 m-auto" v-if="temps">
      <h3 class="text-center mb-3" v-if="temps.name !== ''">Location : <b>{{ temps.name }}</b>,<b>{{ temps.sys.country }}</b></h3>
      <h3 class="text-center mb-3">Lat. : <b>{{ temps.coord.lat }}</b> Lon. : <b>{{ temps.coord.lon }}</b></h3>  
      <div class="card text-center p-5" style="border-radius:100px">
        <p class="texte-affichage ">
          Temperature : <b>{{ Math.round(temps.main.temp) }}°</b>
        </p>
        <p class="texte-affichage">
          Description : <b>{{ temps.weather[0].description }}</b>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      requete: "",
      apiKey: "8f59285bfd7d9c55b4ed9b2240772491",
      temps: undefined,
      urlApi: "https://api.openweathermap.org/data/2.5/weather?",
      lat: 0,
      lon: 0,
      error: false,
      cache: {},
    };
  },
  
  
  methods: {
    ...mapActions([
    'increment'
  ]),

    catchMeteo(){
      this.temps.name = this.cache[this.requete][0];
      this.temps.sys.country = this.cache[this.requete][1];
      this.temps.weather[0].description = this.cache[this.requete][2];
      this.temps.main.temp = this.cache[this.requete][3];
      this.temps.coord.lat = this.cache[this.requete][4];
      this.temps.coord.lon = this.cache[this.requete][5];

      this.requete = "";
      this.error = false;
    },

    goMeteo(e) {
      
      if (e.key === "Enter" && typeof this.cache[this.requete] === "undefined") {

        Axios.get(   
          `${this.urlApi}q=${this.requete}&appid=${this.apiKey}&lang=en&units=metric`
        ).then((response) => {
          this.temps = response.data;
          this.cache[this.requete.toLowerCase()] = [this.temps.name, this.temps.sys.country, 
          this.temps.weather[0].description, this.temps.main.temp.toFixed(), this.temps.coord.lat, this.temps.coord.lon]; 

          this.requete = "";
        }).catch(
            error => {
              console.log(error);
              this.error = !this.error      
              this.requete = "";   
        });
        this.error = false;
        }

      if (e.key === "Enter" && typeof this.cache[this.requete] !== "undefined"){
        this.catchMeteo();
      }   
    },

    goMeteoRandom() {
      this.lat = Math.floor(Math.random() * 90);
      this.lon = Math.floor(Math.random() * 180);
      Axios.get(
        `${this.urlApi}lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&lang=en&units=metric`
      ).then((response) => {
        this.temps = response.data;
        this.cache[this.requete.toLowerCase()] = [this.temps.name, this.temps.sys.country, 
        this.temps.weather[0].description, this.temps.main.temp.toFixed(), this.temps.coord.lat, this.temps.coord.lon]; 
        this.requete = "";
      });
      this.error = false;
    },
  },
  
};
</script>

<style scoped>
.texte-affichage {
  font-size: 30px;
  font-weight: 300;
  line-height: 1.2;
}
button{
  background-color: white;
  border: black;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
.label2{
  margin-top: 20px;
}
.area {
  text-align: center;
  font-size: 6.5em;
  color: #fff;
  letter-spacing: -7px;
  font-weight: 700;
  text-transform: uppercase;
  animation: blur .75s ease-out infinite;
  text-shadow: 0px 0px 5px #fff, 0px 0px 7px #fff;
}

@keyframes blur {
  from {
    text-shadow:0px 0px 10px #fff,
      0px 0px 10px #fff, 
      0px 0px 25px #fff,
      0px 0px 25px #fff,
      0px 0px 25px #fff,
      0px 0px 25px #fff,
      0px 0px 25px #fff,
      0px 0px 25px #fff,
      0px 0px 50px #fff,
      0px 0px 50px #fff,
      0px 0px 50px #7B96B8,
      0px 0px 150px #7B96B8,
      0px 10px 100px #7B96B8,
      0px 10px 100px #7B96B8,
      0px 10px 100px #7B96B8,
      0px 10px 100px #7B96B8,
      0px -10px 100px #7B96B8,
      0px -10px 100px #7B96B8;
  }
}


</style>
