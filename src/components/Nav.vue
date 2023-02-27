<template>
  <nav class="navbar navbar-light navbar-inverse fixed-top">
    <div class="container">
    <a class="navbar-brand" href="#"><b>TimeWatch</b>, Hallo {{vorname}}!</a>
      <ul class="navbar-nav ml-auto" >
        <div class="dropdown show">
          <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Menü
          </a>

          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a class="dropdown-item" @click="Homepage">Zeitmanagment</a>
            <a v-show="verwaltung === 1" class="dropdown-item">Verwaltung</a>
            <a v-show="admin === 1" @click="Adminpage"  class="dropdown-item">Adminbereich</a>
            <a @click="Logout" class="dropdown-item">Ausloggen</a>
          </div>
        </div>
      </ul>
    </div>
  </nav>
</template>

<script>

import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: `Nav`,
  data() {
    return {
      admin: 0,
      verwaltung: 0,
      vorname: "",
    }
  },
  mounted() {

    // Admin Page Aktivieren
    axios.post("/api/admincheck", {
        mail: sessionStorage.getItem("Mail"),
    }).then((res)=> {
      if (res.data.msg === "TMS:1014") {
        this.admin = 1
      }

    });

    // User name Anzeigen
    axios.post("/api/username", {
      mail: sessionStorage.getItem("Mail"),
    }).then((res)=> {
      if (res.data.msg === "TMS:1016") {
        this.vorname = res.data.data.name;
      }

    });

    // Verwaltung Page Aktivieren
    axios.post("/api/verwaltungcheck", {
      mail: sessionStorage.getItem("Mail"),
    }).then((res)=> {
      if (res.data.msg === "TMS:1015") {
        this.verwaltung = 1
      }

    });
  },
  methods: {
    Logout() {

      localStorage.clear();
      sessionStorage.clear();

      this.$router.push({ name: 'login' })
    },
    Adminpage() {
      this.$router.push({ name: 'adminpage' })
    },
    Homepage() {
      this.$router.push({ name: 'home' })
    },
  }
}
</script>
<style scoped>


.dropdown-item {
  cursor: pointer;
}

.btn-secondary {
  border-color: #3274d6;
  background-color: #3274d6;
}
.btn.show {
  border-color: #3274d6;
  background-color: #3274d6;
}

.btn:hover {
  border-color: #284e82;
  background-color: #284e82;
}

.dropdown-menu {
  position: absolute !important;
  right: 0px !important;
  left: unset !important
}

</style>
