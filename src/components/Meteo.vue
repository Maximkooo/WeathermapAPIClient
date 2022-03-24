<template>
  <div class="container">
    <h1 class="my-4 text-center ">Weathermap API Client</h1>
    <div class="form-groupe mb-5">
      <label for="position">Enter a city</label>
     
        <form @submit.prevent="addItemToCart">
            <input 
              type="text"
              v-model="requete" 
              name="position"
              id="position"
              class="form-control" 
              required>
            <button type="submit">Add to cart</button>
        </form>

      <div class="w-75 m-auto" v-bind="allCity">
      <h3 class="text-center mb-3" >Location : <b>{{ allCity.name }}</b>, <b>{{ allCity.sys.country }}</b></h3>
      <h3 class="text-center mb-3">Lat. : <b>{{ allCity.coord.lat }}</b> Lon. : <b>{{ allCity.coord.lon }}</b></h3>  
      <div class="card text-center p-5" style="border-radius:100px">
        <p class="texte-affichage ">
          Temperature : <b>{{ Math.round(allCity.main.temp) }}°</b>
        </p>
        <p class="texte-affichage">
          Description : <b>{{ allCity.weather[0].description }}</b>
        </p>
      </div>
    </div>
    </div>
  </div>
</template>
<script>

import {mapGetters, mapActions} from 'vuex'
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
      cache: {}
    };
  },
  
  computed: mapGetters(['allCity']),

  
  methods: {
    ...mapActions(['getPosts']),
    

    addItemToCart() {
          if(this.requete !== '') {
              this.$store.dispatch('getPosts', this.requete )
              this.requete = ''
          }
      },
  },
  mounted(){
    this.getPosts();
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
.buttonSearch{
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #7B96B8;
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
