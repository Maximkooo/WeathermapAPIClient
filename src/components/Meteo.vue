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
      <button v-on:click="goMeteoRandom">Random</button>
    </div>
    <div class="w-75 m-auto" v-if="temps">
      <h3 class="text-center mb-3" v-if="temps.name !== ''">Location : <b>{{ temps.name }}</b></h3>
      <div class="card text-center p-5" style="border-radius:100px">
        <p class="texte-affichage">
          Temperature : <b>{{ temps.main.temp.toFixed() }}°</b>
        </p>
        <p class="texte-affichage">
          Temps : <b>{{ temps.weather[0].description }}</b>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      requete: "",
      apiKey: "8f59285bfd7d9c55b4ed9b2240772491",
      temps: undefined,
      urlApi: "https://api.openweathermap.org/data/2.5/weather?",
      lat: 90,
      lon: 180,
    };
  },
  
  methods: {
    goMeteo(e) {
      if (e.key === "Enter") {
      Axios.get(
        `${this.urlApi}q=${this.requete}&appid=${this.apiKey}&lang=en&units=metric`
      ).then((response) => {
        this.temps = response.data;

      });
      this.requete = "";
      }
    },
    goMeteoRandom() {

        
      this.lat = Math.floor(Math.random() * 90);
      this.lon = Math.floor(Math.random() * 180);
      console.log(this.lat)
      console.log(this.lon)
      Axios.get(
        `${this.urlApi}lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&lang=en&units=metric`
      ).then((response) => {
        this.temps = response.data;
         
           
      });
      this.requete = "";
      
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
}
.label2{
  margin-top: 20px;
}

</style>
