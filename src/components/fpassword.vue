<template>
  <div class="login">
    <h1>Passwort vergessen? </h1>
    <p class="ftext" >Bitte gib hir deine E-Mail-Adresse ein. Wir schicken dir sofort einen Code zu, mit dem du ein neues Passwort anlegen kannst. </p>
    <form @submit.prevent="passwordrest">
      <label for="username">
        <!-- font awesome icon -->
        <i class="fas fa-user"></i>
      </label>
      <input type="text"  v-model="email" placeholder="E-Mail" id="email" required>
      <div class="form-group">
      <button class="btn btn-primary btn-block btn-lg">Absenden</button>
      </div>
    </form>
    <div class="modal-footer">
      <a href="/login">Zurück zum Login</a>
    </div>
  </div>
  <div>
    <b-alert class="info-alert" variant="danger" v-model="showAlert" dismissible fade>
      {{alertMessage}}
    </b-alert>
    <b-alert class="info-alert" variant="success" v-model="showAlert2" dismissible fade>
      {{alertMessage2}}
    </b-alert>
  </div>
</template>

<script>


import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "fpassword",
  created () {
    document.title = "TimeWatch | Rest";
  },
  data() {
    return {
      showAlert: false,
      showAlert2: false,
      email: '',
      alertMessage: 'Bitte gebe eine Gültige Mail an, die im System Regstriert ist.',
      alertMessage2: 'Sofern für diese Mail ein Account Existiert haben wir Ihnen einen Code geschickt über den Sie Ihr Passwort zurücksetzen können.'
    }
  },
    methods: {
      passwordrest() {

        axios.post("/api/reset", {
          email: this.email,
        }).then((res)=> {


          if (res.data.msg === "TMS:1004"){
            this.showAlert = true;
            setTimeout(() => {
              this.showAlert = false;
            }, 3000);
          }

          if (res.data.msg === "TMS:1005"){
            this.showAlert2 = true;
            setTimeout(() => {
              this.showAlert2 = false;
            }, 9000);

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
  position: absolute;
  right: 10px;
  bottom: 10px;
  border-color: unset;
}

.modal-footer {
  background: #ecf0f1;
  border-color: #dee4e7;
  text-align: center;

  font-size: 13px;
  justify-content: center;
  height: 50px;
}

.form-group {
  margin-bottom: 20px;
}

.btn-primary {
  background-color: #3274d6;
  padding: 10px 135px;
  border-radius: 0px;
}

.btn-primary:hover {
  background-color: #003fb9;
}

p {
  font-size:16px;
  color: #5b6574;
  text-align: center;
}

.login {
  width: 400px;
  background-color: #ffffff;
  box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%)
}
.login h1 {
  text-align: center;
  color: #5b6574;
  font-size: 24px;
  padding: 20px 0 20px 0;
  border-bottom: 1px solid #dee0e4;
}
.login form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 20px;
}
.login form label {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #3274d6;
  color: #ffffff;
}
.login form input[type="password"], .login form input[type="text"] {
  width: 310px;
  height: 50px;
  border: 1px solid #dee0e4;
  margin-bottom: 20px;
  padding: 0 15px;
}
.login form input[type="submit"] {
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  background-color: #3274d6;
  border: 0;
  cursor: pointer;
  font-weight: bold;
  color: #ffffff;
  transition: background-color 0.2s;
}
.login form input[type="submit"]:hover {
  background-color: #2868c7;
  transition: background-color 0.2s;
}
</style>
