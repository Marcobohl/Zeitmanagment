<template>

  <div>
    <b-table ref="table" :items="items" :fields="fields" striped responsive="sm">
      <template #cell(Infos)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Schließen' : 'Anzeigen'}}
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>E-Mail:</b></b-col>
            <b-col v-if="row.item._showDetailss === true || row.item._showDetailss === undefined">{{ row.item.email }}</b-col>
            <b-col v-else><input v-model="email"></b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Vorname:</b></b-col>
            <b-col v-if="row.item._showDetailss === true || row.item._showDetailss === undefined">{{ row.item.vorname }}</b-col>
            <b-col v-else><input v-model="vorname"></b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Nachname:</b></b-col>
            <b-col v-if="row.item._showDetailss === true || row.item._showDetailss === undefined">{{ row.item.nachname }}</b-col>
            <b-col v-else><input v-model="nachname"></b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Adminberechtigung:</b></b-col>

            <b-col v-if="row.item._showDetailss === true || row.item._showDetailss === undefined">
              <b-col id="erlaubt"  v-if="row.item.admin === 1">Berechtigt</b-col>
              <b-col id="verboten" v-else-if="row.item.admin === 0">Nichtberechtigt</b-col>
            </b-col>
            <b-col v-else><input type="checkbox" v-model="admin"></b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Verwaltungsberechtigung:</b></b-col>
            <b-col v-if="row.item._showDetailss === true || row.item._showDetailss === undefined">

              <b-col id="erlaubt" v-if="row.item.verwaltung === 1">Berechtigt</b-col>
              <b-col id="verboten" v-else>Nichtberechtigt</b-col>

            </b-col>
            <b-col v-else><input type="checkbox" v-model="verwaltung"></b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Wochen Arbeitzeit:</b></b-col>
            <b-col v-if="row.item._showDetailss === true || row.item._showDetailss === undefined">{{ row.item.arbeitzeit }} Stunden</b-col>
            <b-col v-else><input type="number" v-model="arbeitzeit"></b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Tägliche Pausenzeit:</b></b-col>
            <b-col v-if="row.item._showDetailss === true || row.item._showDetailss === undefined">{{ row.item.pause }} Minuten</b-col>
            <b-col v-else><input type="number" v-model="pause"></b-col>
          </b-row>

            <button v-if="row.item._showDetailss === true || row.item._showDetailss === undefined" @click="edituser(row)" class="btn beabeiten">Benutzer Beabeiten</button>
            <button v-else class="btn save" @click="saveuser(row)">Speichern</button>
            <button v-if="row.item._showDetailss === false" class="btn remove" @click="canceledit(row)">Abrechen</button>

            <button  v-show="row.item._showDetailss === true || row.item._showDetailss === undefined" @click="removeuser(row.item.email, row.item.userid)" class="btn remove">Benutzer Löschen</button>

        </b-card>
      </template>
    </b-table>
  </div>

  <div>
    <b-alert class="info-alert" variant="success" v-model="showAlert" dismissible fade>
      {{alertMessage}}
    </b-alert>
    <b-alert class="info-alert" variant="danger" v-model="showAlert2" dismissible fade>
      {{alertMessage}}
    </b-alert>
  </div>
</template>

<script>
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "usertabel",
  data() {
    return {
      showAlert: false,
      showAlert2: false,
      alertMessage: 'askgdfasljkgsdgasdjkasjkl',
      fields: ['vorname', 'nachname', 'Infos'],
      items: [
        {},
      ]
    }
  },
  mounted(){
    this.loaduserTabel();
  },
  methods: {
    canceledit: function (row) {
      row.item._showDetailss = true;
    },
    saveuser: function (row) {


      if (this.email === "" || this.vorname === "" || this.nachname === "" || this.arbeitzeit === "" || this.pause === "") {
        this.alertMessage = "Bitte fülle in jedes feld einen wert ein."
        this.showAlert2 = true;

        setTimeout(() => {
          this.showAlert2 = false;
        }, 6000);
      } else {

        axios.post("/api/edituser", {
          email: this.email,
          vorname: this.vorname,
          nachname: this.nachname,
          arbeitzeit: this.arbeitzeit,
          pause: this.pause,
          admin: this.admin,
          verwaltung: this.verwaltung,
          userid: row.item.userid,

        }).then((res)=> {

          if(res.data.msg === "TMS:1004") {
            this.alertMessage = "Bitte gebe eine Gültige Mail an."
            this.showAlert2 = true;

            setTimeout(() => {
              this.showAlert2 = false;
            }, 6000);
          }


          if (res.data.msg === "TMS:1022") {
            this.$router.go(0);
          }

        });
      }
    },
    edituser: function (row) {
        row.item._showDetailss = false;

        this.email = row.item.email;
        this.vorname = row.item.vorname;
        this.nachname = row.item.nachname;

        if (row.item.admin === 1) {
          this.admin = true;
        } else {
          this.admin = false;
        }

        if (row.item.verwaltung === 1) {
          this.verwaltung = true;
        } else {
          this.verwaltung = false;
        }

        this.arbeitzeit = row.item.arbeitzeit;
        this.pause = row.item.pause;

      },
    loaduserTabel: function(){
      axios.get("/api/loadusertabel").then((res) => {
        this.items = res.data.data;
      });
    },
    removeuser : function (semail, id) {
      axios.post("/api/removeuser", {
        email: semail,
        id: id,
        user: sessionStorage.getItem("Mail"),

      }).then((res)=> {

        if(res.data.msg === "TMS:1021") {
          this.alertMessage = "Du kannst dein eigenes Benutzer Profile nicht löschen."
          this.showAlert2 = true;

          setTimeout(() => {
            this.showAlert2 = false;
          }, 6000);
        }

        if(res.data.msg === "TMS:1020") {
          this.alertMessage = "User wurde Erfolgreich im System Entfernt."
          this.showAlert = true;

          setTimeout(() => {
            this.showAlert = false;
          }, 6000);
          this.$router.go(0);
        }
      });
    }
  }
}
</script>

<style scoped>

.save {
  color: #000000;
}

.save:hover {
  color: #00d32b;
}

.info-alert {
  margin-right: auto;
  text-align: center;
  position: fixed;
  right: 10px;
  bottom: 55px;
  border-color: unset;
}

.beabeiten {
  color: #111111;
}
.beabeiten:hover {
  color: #111111;
}

.remove {
  color: #111111;
}

.remove:hover {
  color: #c00000;
}

#erlaubt {
  color: #00d32b;
}

#verboten {
  color: #c00000;
}

#filter {
  padding-bottom: 30px;
  padding-top: 30px;
}
</style>