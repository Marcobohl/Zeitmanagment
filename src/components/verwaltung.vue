<template>
  <Nav />
  <div class="container">
    <div class="Mainhome">
      <p id="benutzerverwalung">Verwaltung</p>
      <div class="card-text">
        <p class="infotext">Bitte wähle den Gewünschten Mitarbeiter aus, damit die Daten Geladen werden Können.</p>
      </div>
      <Verwaltunglist />
    </div>
  </div>
  <fooder />
</template>

<script>
import Nav from "@/components/Nav";
import Fooder from "@/components/Fooder";
import Verwaltunglist from "@/components/verwaltunglist";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "verwaltung",
  created () {
    document.title = "TimeWatch | Verwaltung";
  },
  components: {
    Nav,
    Fooder,
    Verwaltunglist,
  }
}
</script>

<style scoped>

.card-text {
  border-left: 6px solid #ccc !important;
  border-color: #2196F3 !important;
  padding-left: 16px;
  background-color: #ddffff !important;
}

.infotext {
  padding-bottom: 10px;
  padding-top: 10px;
  margin-bottom: 18px;
  margin-top: 18px;
  background-color: #ddffff !important;
}

#benutzerverwalung {
  color: #111111;
  text-align: center;
  font-size: 40px;
  font-weight: 400;
}
</style>