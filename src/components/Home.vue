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
               <a v-if="this.running === true" id="stop" @click="stop">Stop</a>
              <a v-else id="start" @click="start">Start</a>
            </b-col>

            <b-col v-if="this.running === true">
               <a id="reset" @click="rests">Pause</a>
            </b-col>


          </b-row>
          </center>


      </div>
  </div>
    <fooder />
</template>

<script>
import Nav from "./Nav"
import Fooder from "./fooder"
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
      }
  },
  components: {
    Nav,
    Fooder
  },
  created () {
    document.title = "TimeWatch | Home";
  },
  methods: {
    start: function () {
      if(this.running) return;

      if (this.timeBegan === null) {
        this.rests();
          this.timeBegan = new Date();
      }

      if (this.timeStopped !== null) {
        this.stoppedDuration += (new Date() - this.timeStopped);
      }

      this.started = setInterval(this.clockRunning, 10);
      this.running = true;
      this.resum = true;
    },
    stop: function () {
      this.running = false;
      this.timeStopped = new Date();
      clearInterval(this.started);
    },
    rests: function () {
      this.running = false;
      clearInterval(this.started);
      this.stoppedDuration = 0;
      this.timeBegan = null;
      this.timeStopped = null;
      this.time = "00:00:00";
      this.resum = false;
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
