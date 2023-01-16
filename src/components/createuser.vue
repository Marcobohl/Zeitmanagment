<template>
  <b-button id="createuserbutton" v-b-toggle.collapse-1 variant="primary">Benutzer Erstellen</b-button>
  <b-collapse id="collapse-1" class="mt-2">
    <b-card class="card">

      <p class="textnewuser"  > Neuer Benutzer</p>

      <div class="card-text">
        <p class="infotext">Bitte füllen sie alle Felder aus und Klicken anschließend auf Hinzufügen. Der Benutzer wird dan automatisch in der Datenbank angelegt. Der Angelegete Benutzer bekommt anschließend eine Benachrichtugung per Mail dass er absofort auf das System zugreifen kann.</p>
      </div>

      <b-form inline @submit.prevent="createusere">
        <b-row class="mb-2 createusereinput">

          <!--- Links --->
          <b-col>

            <p class="ueberschrift" >Benutzer Infos:</p>

            <div>
              <!-- VorName -->
              <label for="vorname">
                <i id="pb" class="fas fa-user"></i>
              </label>
              <input  type="text" v-model="vorname" name="vorname" placeholder="Vorname" id="vorname" class="input" ref="vorname" required>
            </div>

            <div>
              <!-- NachName -->
              <label for="nachname">
                <i id="pb" class="fas fa-user"></i>
              </label>
              <input type="text" v-model="nachname" name="nachname" placeholder="Nachname" id="nachname" class="input" ref="nachname" required>
            </div>

            <div>
              <!-- Email -->
              <label for="email">

                <!-- font awesome icon -->
                <i id="pb" class="fas fa-envelope"></i>
              </label>
              <input type="text" v-model="email" name="uemail" placeholder="E-Mail" id="email" class="input" ref="email" required>
            </div>

          </b-col>

          <!--- mitte --->
          <b-col>

            <p class="ueberschrift">Zeiterfasung:</p>

            <div>
              <!-- Wochen Arbeitszeit -->
              <label for="stunden">
                <i id="pb" class="fas fa-clock"></i>
              </label>
              <input  type="number" v-model="arbeitszeit" name="stunden" placeholder="Wochen Arbeitszeit/Stunden" id="stunden" class="input" ref="azeit" required >
            </div>

            <div>
              <!-- Pause -->
              <label for="pause">
                <i id="pb" class="fas fa-pause"></i>
              </label>
              <input  type="number" v-model="pausenzeit" name="pause" placeholder="Pausenzeit/Min" id="pausen" class="input" ref="pzeit" required>
            </div>

          </b-col>

          <!--- rechts --->
          <b-col>

            <p class="ueberschrift">Berechtigungen:</p>

            <div>
              <input type="checkbox"  v-model="admin" class="chekbox" id="vehicle1" name="vehicle1" value="1">
              <label for="vehicle1"> Adminberechtigung</label><br>

              <input type="checkbox" v-model="verwaltung" class="chekbox" id="vehicle2" name="vehicle2" value="1">
              <label for="vehicle2"> Verwaltungsberechtigung</label><br>
            </div>

          </b-col>

          <div>
            <button class="btn btn-primary btn-block btn-lg">Hinzufügen</button>
          </div>

        </b-row>

      </b-form>


    </b-card>
  </b-collapse>

  <div>
    <b-alert class="info-alert" variant="danger" v-model="showAlert" dismissible fade>
      {{alertMessage}}
    </b-alert>

    <b-alert class="info-alert" variant="success" v-model="showAlert2" dismissible fade>
      {{alertMessage}}
    </b-alert>
  </div>

</template>

<script>
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "createuser",
  data() {
    return {
        showAlert2: false,
        showAlert: false,
        alertMessage: 'askgdfasljkgsdgasdjkasjkl',
        email: '',
        vorname: '',
        nachname: '',
        admin: '',
        verwaltung: '',
        arbeitszeit: '',
        pausenzeit: ''
    }
  },
  methods: {
    createusere: function () {

      axios.post("/api/createuser", {
       email: this.email,
       vorname: this.vorname,
       nachname: this.nachname,
       verwaltung: this.verwaltung,
       admin: this.admin,
       arbeitszeit: this.arbeitszeit,
       pausenzeit: this.pausenzeit,



      }).then((res)=> {
        if(res.data.msg === "TMS:1010") {
          this.alertMessage = "Bitte gebe eine Gültige Mail an."

          this.$refs["email"].value = "";

          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 6000);
        }

        if(res.data.msg === "TMS:1017") {
          this.alertMessage = "Diese E-Mail ist bereits im System Regstriert."

          this.$refs["email"].value = "";

          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 6000);
        }

        if(res.data.msg === "TMS:1019") {
          this.alertMessage = "User wurde Erfolgreich im System Regstriert."
          this.showAlert2 = true;

          this.admin = false;
          this.verwaltung = false;
          this.vorname = "";
          this.nachname = "";
          this.email = "";
          this.arbeitszeit = "";
          this.pausenzeit = "";

          setTimeout(() => {
            this.showAlert2 = false;
          }, 6000);
          this.$router.go(0);
        }
        });
    }
  }
}
</script>

<style scoped>

.info-alert {
  margin-right: auto;
  text-align: center;
  position: fixed;
  right: 10px;
  bottom: 55px;
  border-color: unset;
}

.gesamt-spalte {
  float: inline-end;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ueberschrift {
  color: #111111;
  text-align: left;
  font-size: 30px;
  font-weight: 400;
}

.mittel-spalte {
  float: left;
  width: 33%;
}

.linke-spalte {
  float: left;
  width: 33%;
}

.rechts-spalte {
  float: left;
  width: 33%;
}

.textnewuser {
  color: #111111;
  text-align: left;
  font-size: 40px;
  font-weight: 400;
}

.card {
  border-radius: unset !important;
  border: unset !important;
  border-bottom: 3px solid #ccc !important;
  border-top: 3px solid #ccc !important;
  background-color: #ffffff;
}

.createusereinput {

}

#vorname {
  margin-right: 20px;
}

.chekbox {
  margin-right: 10px;
}

.card-text {
  border-left: 6px solid #ccc !important;
  border-color: #2196F3 !important;
  padding-left: 16px;
  background-color: #ddffff !important;
}

.input {
  width: 70%;
  height: 50px;
  border: 1px solid #dee0e4;
  margin-bottom: 20px;
  padding: 0 15px;
}

#pb {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #3274d6;
  color: #ffffff;
}

.infotext {
  padding-bottom: 10px;
  padding-top: 10px;
  margin-bottom: 18px;
  margin-top: 18px;
  background-color: #ddffff !important;
}

#createuserbutton {

}
</style>