<template>
  <Nav />
  <div class="container">
      <div class="Mainhome">
        <p id="benutzerverwalung">Benutzerverwaltung</p>
          <createuser />

        <usertabel />
      </div>
    </div>
  <fooder />
</template>

<script>
import Nav from "@/components/Nav";
import Fooder from "@/components/Fooder";
import createuser from "@/components/createuser";
import usertabel from "@/components/usertabel";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "admin",
  created () {
    document.title = "TimeWatch | Adminpannel";
  },
  components: {
    Nav,
    Fooder,
    createuser,
    usertabel,
  }
}
</script>

<style scoped>

.Mainhome {
  padding-top: 40px;
  padding-bottom: 40px;
}

#benutzerverwalung {
  color: #111111;
  text-align: center;
  font-size: 40px;
  font-weight: 400;
}
</style>