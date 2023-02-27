<template>
  <b-button id="showtime" v-b-toggle.collapse-1 variant="primary">Zeiten einblenden</b-button>
  <b-collapse id="collapse-1" class="mt-2">
    <b-card class="card">
    <div>
      <b-table striped hover :fields="fields" :items="items"></b-table>
    </div>
    </b-card>
  </b-collapse>
</template>

<script>
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "timetabel",
  data() {
    return {
      fields: ['Datum', 'Arbeitszeit', 'Pausenzeit', 'Überstunden'],
      items: [
        { Datum: "03.02.2022", Geabeitete: '07:01:20', Pausenzeit: '00:01:20', Überstund: "00:01:00" },
      ]
    }
  },
  mounted(){
    this.loaduserTabel();
  },
  methods: {
    loaduserTabel: function(){
      axios.post("/api/loadtimerlist", {
        email: sessionStorage.getItem("Mail"),

      }).then((res)=> {
        console.log(res);
      });
    },
  }
}
</script>

<style scoped>

.card {
  border-radius: unset !important;
  border: unset !important;
  border-bottom: 3px solid #ccc !important;
  border-top: 3px solid #ccc !important;
  background-color: #ffffff;
}

#showtime {

}

</style>
