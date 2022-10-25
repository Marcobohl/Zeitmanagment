<template>
  <div class="container">
    <Nav />
    <h2>test</h2>
  </div>
  <footer>  <fooder />
  </footer>
</template>

<script>

import Nav from "./Nav"
import Fooder from "./fooder"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
    components: {
    Nav,
    Fooder
    }
}
</script>

<style scoped>
</style>