<template>
  <div class="login">
    <h1>Login</h1>
    <div>
      <b-alert class="info-alert" variant="danger" v-model="showAlert" dismissible fade>
        {{alertMessage}}
      </b-alert>
    </div>
    <form @submit.prevent="login">
      <label for="username">

        <!-- font awesome icon -->
        <i class="fas fa-user"></i>
      </label>
      <input type="text" v-model="email" name="username" placeholder="E-Mail" id="username" required>
      <label for="password">
        <i class="fas fa-lock"></i>
      </label>
      <input type="password" v-model="password"  name="password" placeholder="Password" id="password" required>
      <div class="form-group">
      <button class="btn btn-primary btn-block btn-lg">Anmelden</button>
      </div>
    </form>
    <div class="modal-footer">
    <a href="/login/reset">Passwort vergessen? </a>
    </div>
  </div>

</template>

<script>

import axios from 'axios';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      showAlert: false,
      alertMessage: 'Die E-Mail Adresse oder das Passwort sind nicht korrekt. Bitte versuchen Sie es erneut. ',
      email: '',
      password: '',
    }
  },
  methods: {
    login: function () {

      axios.post("/api/login", {
        email: this.email,
        password: this.password
      }).then((res)=> {
        console.log(res.data.msg)
        if (res.data.msg === "TMS:1002" || res.data.msg === "TMS:1003"){
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 500000);
        }
        if(res.data.msg === "TMS:1001") {
          this.$router.push("home")
        }
      });

    //  let id = null;

     /* if (code hinterlegt, frage ab ob code in der Datenbanbk existiert.) {
          code Exist Loge usere autmoatich ein.
      }
       else {
       if (loge usere mit logindaten ein.) {
       logindaten stimen loge usere eien uns erstelle radmon id.
       } else {
       logindaten stimmen nicht error message.
       }
      } */
/*

      if (localStorage.getItem("logtin") === null) {
        // eslint-disable-next-line no-unused-vars
        id = Math.random().toString(36).substr(2, 9);

        localStorage.logtin = id
      }*/



     // this.$router.push("home")
    }
  }
}

/*connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results) {
    // If there is an issue with the query, output the error
    if (error) throw error;
    // If the account exists
    if (results.length > 0) {
        // Authenticate the user
        request.session.loggedin = true;
        request.session.username = username;
        // Redirect to home page
        response.redirect('/home');
    } else {
        response.send('Incorrect Username and/or Password!');
    }
    response.end();
}); */
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

.btn-primary {
  background-color: #3274d6;
  padding: 10px 135px;
  border-radius: 0px;
}

.form-group {
  margin-bottom: 20px;
}

.modal-footer {
  background: #ecf0f1;
  border-color: #dee4e7;
  text-align: center;

  font-size: 13px;
  justify-content: center;
  height: 50px;
}

.login {
  width: 400px;
  background-color: #ffffff;
  box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.3);
  margin: 100px auto;
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
