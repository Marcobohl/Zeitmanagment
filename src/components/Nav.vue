<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top">
    <div class="container">
    <a class="navbar-brand" href="#">TimeWatch</a>
      <ul class="navbar-nav ml-auto" >
        <div class="dropdown show">
          <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Menü
          </a>

          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a  class="dropdown-item" href="#">Zeitmanagment</a>
            <a class="dropdown-item" href="#">Verwaltung</a>
            <a class="dropdown-item" href="#">Adminbereich</a>
            <a @click="Logout" class="dropdown-item">Logout</a>
          </div>
        </div>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: `Nav`,
  methods: {
    Logout() {
    }
  }
}
</script>
<style scoped>

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
