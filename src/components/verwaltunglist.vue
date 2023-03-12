<template>
    <b-col v-if="value == 'E-Mail auswählen'">

      <div class="dropdown">
        <button
            class="btn btn-primary dropdown-toggle"
            type="button" id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            {{value}}
        </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" role="menu">
            <li v-for="itemss in itemss" :key="itemss">
              <a class="dropdown-item" @click="loadusers(itemss)" href="javascript:void(0)">{{itemss}}</a>
            </li>
          </ul>
      </div>
    </b-col>

    <b-col v-else>

        <div class="dropdown">
          <button
              class="btn btn-primary dropdown-toggle"
              type="button" id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false">
            {{value}}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" role="menu">
            <li v-for="itemss in itemss" :key="itemss">
              <a class="dropdown-item" @click="loadusers(itemss)"  href="javascript:void(0)">{{itemss}}</a>
            </li>
          </ul>
        </div>

      <div class="test">
        <b-card class="card">
          <div>
            <b-table striped :fields="fields" :items="items"></b-table>
          </div>
        </b-card>
      </div>


    </b-col>
</template>

<script>
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "verwaltunglist",
  data() {
    return {
      fields: ['Datum', 'Arbeitszeit', 'Pausenzeit', 'Überstunden'],
      itemss: [
      ],
      items: [
      ],
      value: 'E-Mail auswählen'
    }
  },
  mounted(){
    this.loaduserTabel();

  },
  methods: {
    loadusers: function(p1){
      this.value = p1;
      axios.post("/api/loadtimerlist", {
        email: this.value,
      }).then((res)=> {

        if(res.data.msg === "TMS:1026") {

          this.items.length = 0

          let dpause = res.data.pause.pause;
          let tagarbeziet = res.data.abzeit.abzeit;

          dpause = dpause * 60 * 1000;
          tagarbeziet = tagarbeziet * 60 * 60 * 1000;
          tagarbeziet = tagarbeziet / 5;

          let arraystap = 0;
          //aktuelles datum
          const adateString = new Date();
          const adateOnly = adateString.getUTCFullYear().toString().padStart(2, '0') + "-" + adateString.getUTCMonth().toString().padStart(2, '0') + "-" + adateString.getDate().toString().padStart(2, '0')

          for (let i = 1; i <= res.data.data.data.length; i++) {

            // Datum
            const dateString = new Date("" + res.data.data.data[arraystap].datum + "");
            const dateOnly = dateString.getUTCFullYear().toString().padStart(2, '0') + "-" + dateString.getUTCMonth().toString().padStart(2, '0') + "-" + dateString.getDate().toString().padStart(2, '0');
            let pause = 0;
            let milpause = 0;

            if (dateOnly === adateOnly) {

              arraystap ++;

            } else {

              // Arbeitszeit
              const gteim = new Date(  + res.data.data.data[arraystap].gzeit );
              const stunde = gteim.getUTCHours().toString().padStart(2, '0');
              const minuten = gteim.getUTCMinutes().toString().padStart(2, '0');
              const sekunden = gteim.getUTCSeconds().toString().padStart(2, '0');

              let time = stunde + ":" + minuten + ":" + sekunden;

              // pause
              if ( res.data.data.data[arraystap].gpause === null) {
                // pausencheck ist zeit über 6 Stunden
                if (res.data.data.data[arraystap].gzeit >= 32400000) {

                  if (dpause >= 2700000) {
                    pause = new Date(  dpause );
                    milpause = dpause;
                  } else {
                    pause = new Date(  2700000 );
                    milpause = 2700000;
                  }


                  // ist zeit über 4 Stunden
                } else if ( res.data.data.data[arraystap].gzeit >= 21600000 ) {

                  if (dpause >= 1800000) {
                    pause = new Date(  dpause );
                    milpause = dpause;
                  } else {
                    pause = new Date(  + 1800000  );
                    milpause = 1800000;
                  }

                } else {
                  pause = new Date(  0 );
                }

              } else {
                pause = new Date(  + res.data.data.data[arraystap].gpause );
              }


              const pstunde = pause.getUTCHours().toString().padStart(2, '0');
              const pminuten = pause.getUTCMinutes().toString().padStart(2, '0');
              const psekunden = pause.getUTCSeconds().toString().padStart(2, '0');

              let ptime = pstunde + ":" + pminuten + ":" + psekunden;

              let uezeit = res.data.data.data[arraystap].gzeit - milpause;
              uezeit = uezeit - tagarbeziet;

              let uptime = 0;
              let vorzeichen = 1;


              if (uezeit < 0) {
                vorzeichen = 0;
              }

              uezeit = Math.abs(uezeit)

              let uzeits = new Date (uezeit);

              const ustunde = uzeits.getUTCHours().toString().padStart(2, '0');
              const uminuten = uzeits.getUTCMinutes().toString().padStart(2, '0');
              const usekunden = uzeits.getUTCSeconds().toString().padStart(2, '0');

              uptime =  ustunde + ":" + uminuten + ":" + usekunden;

              if (vorzeichen == 0) {
                uptime =  "- " + uptime;
              }

              this.items.push({
                Datum: dateOnly,
                Arbeitszeit: time ,
                Pausenzeit: ptime,
                Überstunden:  uptime,
              })

              arraystap ++;

            }
          }
        }
      });
    },
    loaduserTabel: function(){

      axios.get("/api/emialsload").then((res) => {

        let arraystap = 0;

        for (let i = 1; i <= res.data.data.length; i++) {

          this.itemss.push(res.data.data[arraystap].email)

          arraystap++;
        }
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

.test {
  margin-top: 11px;
}
</style>