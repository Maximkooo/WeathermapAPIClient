<template>
  <div id="app">
    <Meteo></Meteo>
  </div>
</template>

<script>
import Meteo from "./components/Meteo.vue";

export default {
  name: "App",
  components: { Meteo },
};
</script>

<style>
body {
  background: linear-gradient(
    to right,
    #d9cfff,
    #a3e3f7
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
