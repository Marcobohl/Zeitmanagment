<template>
  <Nav />
  <div class="container">
      <div class="Mainhome">
        <p>asddsa</p>
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
  created () {
    document.title = "TimeWatch | Home";
  },
  data() {
  },
  methods: {
  },
  components: {
    Nav,
    Fooder
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
  background-color: #ffffff;
  box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.3);
  margin: 100px auto;
}
</style>
