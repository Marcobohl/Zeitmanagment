<template>
  <Nav />
  <div class="container">
      <div class="Mainhome">

        <p id="timewatch">TimeWatch</p>

        <div id="clock">
          <span class="time">{{ time }}</span>
        </div>

            <b-row>

            <b-col v-if="this.pauserunning == false" >
               <a v-if="this.running" id="stop" @click="stop">Ausbuchen</a>
              <a v-else id="start" @click="start">Einbuchen</a>
            </b-col>
            <b-col v-if="this.running">
            <a v-if="this.pauserunning"  @click="pausestop" >Pause Beenden</a>
              <a v-else @click="pausestart"> Pause Starten</a>
            </b-col>

          </b-row>

        <timetabel />

      </div>
  </div>
    <fooder />
</template>

<script>
import Nav from "./Nav"
import Fooder from "./Fooder"
import axios from "axios";
import Timetabel from "@/components/timetabel";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data() {
    return {
      time: '00:00:00',
      timeBegan: null,
      timeStopped: null,
      stoppedDuration: 0,
      started: null,
      running: false,
      pauserunning: false,
      resum: false,
      pausenstart: "",
      pausenend: "",
      datum: "",
      gzeit: null,
      }
  },
  components: {
    Timetabel,
    Nav,
    Fooder
  },
  created () {
    document.title = "TimeWatch | Home";

    let heute = new Date();
    const monat = heute.getMonth() + 1;


    axios.post("/api/loadtimer", {
      email: sessionStorage.getItem("Mail"),
      datum: heute.getFullYear() + "-" + monat + "-" + heute.getDate(),


    }).then((res)=> {
      if (res.data.msg === "TMS:1023"){
        let timers = res.data.data.timer;
        this.time = timers;

        var newDateObj = new Date(res.data.data.heute);

       this.timeBegan = newDateObj;
        this.started = setInterval(this.clockRunning, 10);
        this.running = true;
        this.resum = true;
      }

      if (res.data.msg === "TMS:1024") {
        let timers = res.data.data.timer;
        let gzeit = new Date(timers - 3600000);


        this.time = gzeit.getHours().toString().padStart(2, '0') + ":" + gzeit.getMinutes().toString().padStart(2, '0') + ":" + gzeit.getSeconds().toString().padStart(2, '0');
        this.gzeit = timers
      }

          if (res.data.msg === "TMS:1025") {
            let timers = res.data.data.timer;

            let gzeit = new Date(res.data.data.gzeit);

            this.time = gzeit.getHours().toString().padStart(2, '0') + ":" + gzeit.getMinutes().toString().padStart(2, '0') + ":" + gzeit.getSeconds().toString().padStart(2, '0');

            let newDateObj = new Date(timers);
            this.timeBegan = newDateObj;
            this.started = setInterval(this.clockRunning, 10);
            this.running = true;
            this.resum = true;
          }
    });
  },
  methods: {
    pausestop: function () {
      this.pauserunning = false;

      let pausestop = new Date();

      axios.post("/api/pausestoptimer", {
        email: sessionStorage.getItem("Mail"),
        stoptimer: pausestop.getTime(),
      });

    },
    pausestart: function () {
      this.pauserunning = true;

      let pausetimestart = new Date();

      const monat = pausetimestart.getMonth() + 1;
      const datum = pausetimestart.getFullYear() + "-" + monat + "-" + pausetimestart.getDate();

      axios.post("/api/pausestarttimer", {
        email: sessionStorage.getItem("Mail"),
        datum: datum,
        starttime: pausetimestart.getTime(),
      });

    },
    start: function () {

      if (this.gzeit === null) {
        if (this.timeBegan === null) {

          this.timeBegan = new Date();

          const monat = this.timeBegan.getMonth() + 1
          this.datum = this.timeBegan.getFullYear() + "-" + monat + "-" + this.timeBegan.getDate() ;

          axios.post("/api/starttimer", {
            email: sessionStorage.getItem("Mail"),
            datum: this.datum,
            starttime: this.timeBegan.getTime(),


          });
        }

        if (this.timeStopped !== null) {
          this.stoppedDuration += (new Date() - this.timeStopped);
        }

        this.started = setInterval(this.clockRunning, 10);
        this.running = true;
        this.resum = true;

      } else {

        let heute = new Date();

        const monat = heute.getMonth() + 1
        this.datum = heute.getFullYear() + "-" + monat + "-" + heute.getDate() ;

        axios.post("/api/resumtworktimer", {
          email: sessionStorage.getItem("Mail"),
          datum: this.datum,
          starttime: heute.getTime(),


        });


        this.stoppedDuration += (new Date() - this.gzeit);

        this.started = setInterval(this.clockRunning, 10);
        this.running = true;
        this.resum = true;
      }
    },
    stop: function () {
      this.running = false;
      this.timeStopped = new Date();
      clearInterval(this.started);

      axios.post("/api/stoptimer", {
        email: sessionStorage.getItem("Mail"),
        timer: this.timeStopped.getTime(),
      });

    },
    pause: function () {

      if (this.pausenstart === "") {
        const heute = new Date();
        const monat = heute.getMonth() + 1
        this.datum = heute.getDate() + "." + monat + "." + heute.getFullYear();

      }
    },
    clockRunning: function () {
      var currentTime = new Date()
          , timeElapsed = new Date(currentTime - this.timeBegan - this.stoppedDuration)
          , hour = timeElapsed.getUTCHours()
          , min = timeElapsed.getUTCMinutes()
          , sec = timeElapsed.getUTCSeconds();

      this.time =
          hour.toString().padStart(2, '0') + ":" +
          min.toString().padStart(2, '0') + ":" +
          sec.toString().padStart(2, '0')
    },

  }

};
</script>

<style scoped>
.btn-primary {
  background-color: #3274d6;
  border-radius: 0px;
}

.btn-primary:hover {
  background-color: #003fb9;
}

.col {
  text-align: center;
}

.Mainhome {
  padding-top: 40px;
  padding-bottom: 40px;
}

#timewatch {
  color: #111111;
  text-align: center;
  font-size: 40px;
  font-weight: 400;
}

#clock {
  order: 0;
  flex: 0 1 auto;
  align-self: center;
  color: #000000;
  text-shadow: 0px 0px 1px;
  text-align: center;
}

.time {
  font-size: 400%;
  align-items: center;
}

.text {
  margin-top: 30px;
  font-size: 1em;
  color: #ffffff;
  text-align: center;
}

a {
  text-align: center;
  text-decoration: none;
  color: inherit;

  transition: color .1s ease-out;
}

a:hover {
   color: #ffffff;
 }

.btn-container {
  display: flex;
  margin-top: 15px;
}

a {
  text-align: center;
  font-family: 'Share Tech Mono', sans-serif;
  background: transparent;
  border: 3px;
  border: none;
  color: #ffffff;
  text-transform: uppercase;
  font-size: 2em;
  cursor: pointer;

  flex-grow: 1;

  transition: color .1s ease-out;

}

</style>
