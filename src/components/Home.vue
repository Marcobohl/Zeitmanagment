<template>
  <Nav />
  <div class="container">
      <div class="Mainhome">

        <p id="timewatch">TimeWatch</p>

        <div id="clock">
          <center> <span class="time">{{ time }}</span> </center>
        </div>

          <center>
            <b-row>

            <b-col >
               <a v-if="this.running === true" id="stop" @click="stop">Ausbuchen</a>
              <a v-else id="start" @click="start">Einbuchen</a>
            </b-col>

          </b-row>
          </center>

        <timetabel />

      </div>
  </div>
    <fooder />
</template>

<script>
import Nav from "./Nav"
import Fooder from "./fooder"
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
    const monat = heute.getMonth() + 1


    axios.post("/api/loadtimer", {
      email: sessionStorage.getItem("Mail"),
      datum: heute.getFullYear() + "-" + monat + "-" + heute.getDate(),


    }).then((res)=> {
      if (res.data.msg === "TMS:1023"){
        console.log(res)
        let timers = res.data.data.timer;
        this.time = timers;

        var newDateObj = new Date(res.data.data.heute);
        console.log(newDateObj.getTime());
        console.log(newDateObj)
       this.timeBegan = newDateObj;
        this.started = setInterval(this.clockRunning, 10);
        this.running = true;
        this.resum = true;
      }

      if (res.data.msg === "TMS:1024") {
        console.log(res);
        let timers = res.data.data.timer;
        let azeit = new Date();
        let gzeit = new Date(timers - 3600000);
        console.log(timers);
        console.log(azeit.getTime())
        console.log(gzeit)

        let newDateObj = new Date(azeit.getTime() - timers);
        console.log(newDateObj);

        let st
        if (gzeit.getHours() === 1 || gzeit.getHours() === 2 || gzeit.getHours() === 3 || gzeit.getHours() === 4 || gzeit.getHours() === 5 || gzeit.getHours() === 6 || gzeit.getHours() === 7 || gzeit.getHours() === 8 || gzeit.getHours() === 9) {
          st = "0" + gzeit.getHours()
        } else if (gzeit.getHours() === 0 ) {
          st = "00"
        } else {
          st = gzeit.getHours();
        }

        let min
        if (gzeit.getMinutes() === 1 || gzeit.getMinutes() === 2 || gzeit.getMinutes() === 3 || gzeit.getMinutes() === 4 || gzeit.getMinutes() === 5 || gzeit.getMinutes() === 6 || gzeit.getMinutes() === 7 || gzeit.getMinutes() === 8 || gzeit.getMinutes() === 9) {
          min = "0" + gzeit.getMinutes()
        } else if (gzeit.getMinutes() === 0 ) {
          min = "00"
        } else {
          min = gzeit.getMinutes();
        }

        let sec
        if (gzeit.getSeconds() === 1 || gzeit.getSeconds() === 2 || gzeit.getSeconds() === 3 || gzeit.getSeconds() === 4 || gzeit.getSeconds() === 5 || gzeit.getSeconds() === 6 || gzeit.getSeconds() === 7 || gzeit.getSeconds() === 8 || gzeit.getSeconds() === 9) {
          sec = "0" + gzeit.getSeconds()
        } else if (gzeit.getSeconds() === 0 ) {
          sec = "00"
        } else {
          sec = gzeit.getSeconds();
        }

        this.time = st + ":" + min + ":" + sec
        this.gzeit = timers
      }

          if (res.data.msg === "TMS:1025") {
            console.log(res)
            let timers = res.data.data.timer;

            let gzeit = new Date(res.data.data.gzeit);

            let st
            if (gzeit.getHours() === 1 || gzeit.getHours() === 2 || gzeit.getHours() === 3 || gzeit.getHours() === 4 || gzeit.getHours() === 5 || gzeit.getHours() === 6 || gzeit.getHours() === 7 || gzeit.getHours() === 8 || gzeit.getHours() === 9) {
              st = "0" + gzeit.getHours()
            } else if (gzeit.getHours() === 0 ) {
              st = "00"
            } else {
              st = gzeit.getHours();
            }

            let min
            if (gzeit.getMinutes() === 1 || gzeit.getMinutes() === 2 || gzeit.getMinutes() === 3 || gzeit.getMinutes() === 4 || gzeit.getMinutes() === 5 || gzeit.getMinutes() === 6 || gzeit.getMinutes() === 7 || gzeit.getMinutes() === 8 || gzeit.getMinutes() === 9) {
              min = "0" + gzeit.getMinutes()
            } else if (gzeit.getMinutes() === 0 ) {
              min = "00"
            } else {
              min = gzeit.getMinutes();
            }

            let sec
            if (gzeit.getSeconds() === 1 || gzeit.getSeconds() === 2 || gzeit.getSeconds() === 3 || gzeit.getSeconds() === 4 || gzeit.getSeconds() === 5 || gzeit.getSeconds() === 6 || gzeit.getSeconds() === 7 || gzeit.getSeconds() === 8 || gzeit.getSeconds() === 9) {
              sec = "0" + gzeit.getSeconds()
            } else if (gzeit.getSeconds() === 0 ) {
              sec = "00"
            } else {
              sec = gzeit.getSeconds();
            }

            this.time = st + ":" + min + ":" + sec;

            let newDateObj = new Date(timers);
            console.log(newDateObj.getTime());
            console.log(newDateObj)
            this.timeBegan = newDateObj;
            this.started = setInterval(this.clockRunning, 10);
            this.running = true;
            this.resum = true;
          }
    });


    window.addEventListener('beforeunload', this.closeevent);
  },
  methods: {

    closeevent: function () {



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


          }).then((res)=> {
            console.log(res.data.msg)

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


        }).then((res)=> {
          console.log(res.data.msg)

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
      }).then((res)=> {
        console.log(res.data.msg)

      });

    },
    pause: function () {

      if (this.pausenstart === "") {
        const heute = new Date();
        const monat = heute.getMonth() + 1
        this.datum = heute.getDate() + "." + monat + "." + heute.getFullYear();

      } else {
      console.log("test")

      }
    },
    clockRunning: function () {
      var currentTime = new Date()
          , timeElapsed = new Date(currentTime - this.timeBegan - this.stoppedDuration)
          , hour = timeElapsed.getUTCHours()
          , min = timeElapsed.getUTCMinutes()
          , sec = timeElapsed.getUTCSeconds();

      this.time =
          this.zeroPrefix(hour, 2) + ":" +
          this.zeroPrefix(min, 2) + ":" +
          this.zeroPrefix(sec, 2)
    },
    zeroPrefix: function (num, digit) {
      var zero = '';
      for(var i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    }

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
