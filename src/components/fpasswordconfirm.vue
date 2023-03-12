<template>
  <div class="login">
    <h1>Passwort vergessen? </h1>
    <p class="ftext" >Bitte gebe nun dein Neues Password und den Bestätigungscode ein.</p>
    <form @submit.prevent="passwordreset">

      <label for="username">
        <!-- font awesome icon -->
        <i class="fa fa-lock"></i>
      </label>
      <input type="text"  v-model="password" placeholder="Neues Password" id="email" required>

      <label for="username">
        <!-- font awesome icon -->
        <i class="fa fa-lock"></i>
      </label>
      <input type="text"  v-model="passwordconfirm" placeholder="Password Bestätigen" id="email" required>

      <div class="form-group">
        <button class="btn btn-primary btn-block btn-lg">Absenden</button>
      </div>
    </form>
    <div class="modal-footer">
      <a href="/login">Zurück zum Login</a>
    </div>
  </div>
  <div>
    <b-alert class="info-alert" variant="success" v-model="showAlert2" dismissible fade>
      <p>Password Reset Erfolgreich.</p>
    </b-alert>
    <b-alert class="info-alert" variant="danger" v-model="showAlert" dismissible fade>
      <p>
        Bitte, beachte unsere Password Richtlinen.
      </p>
      <hr>
      <ul>
        <li>Groß- und Kleinbuchstaben</li>
        <li>1 Sonderzeichen</li>
        <li>Mindestsen 8 Zeichen</li>
      </ul>
    </b-alert>
  </div>
</template>

<script>

import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "fpassword",
  created () {
    document.title = "TimeWatch | Password Reset";
  },
  data() {
    return {
      showAlert2: false,
      showAlert: false,
      password: '',
      passwordconfirm: '',
      code: ''
    }
  },
  methods: {
    passwordreset() {

      axios.post("/api/reset/code/password", {
        password: this.password,
        passwordconfirm: this.passwordconfirm,
        code: this.$route.params.code
      }).then((res)=> {

        if (res.data.msg === "TMS:1008"){
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 16000);
        }

        if (res.data.msg === "TMS:1009"){
          let codeback = res.data.code;

          localStorage.setItem("Scode", codeback.sessioncode);
          sessionStorage.setItem("Mail", codeback.semail)

          this.showAlert2 = true;
          setTimeout(() => {
            this.showAlert2 = false;
          }, 6000);
          this.$router.push({name: "login"})
        }

      });
    }
  }
}
</script>

<style scoped>

.info-alert {
  margin-right: auto;
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
