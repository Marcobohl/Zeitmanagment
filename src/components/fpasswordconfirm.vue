<template>
  <div class="login">
    <h1>Passwort vergessen? </h1>
    <p class="ftext" >Bitte gebe nun dein Neues Password und den Bestätigungscode ein.</p>
    <form @submit.prevent="handelsubmit">
      <label for="username">
        <!-- font awesome icon -->
        <i class="fa fa-check-circle"></i>
      </label>
      <input type="text"  v-model="email" placeholder="Bestätigungscode" id="email" required>

      <label for="username">
        <!-- font awesome icon -->
        <i class="fa fa-lock"></i>
      </label>
      <input type="text"  v-model="email" placeholder="Neues Password" id="email" required>

      <label for="username">
        <!-- font awesome icon -->
        <i class="fa fa-lock"></i>
      </label>
      <input type="text"  v-model="email" placeholder="Password Bestätigen" id="email" required>

      <div class="form-group">
        <button class="btn btn-primary btn-block btn-lg">Absenden</button>
      </div>
    </form>
    <div class="modal-footer">
      <a href="/login">Zurück zum Login</a>
    </div>
  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "fpassword",
  data() {
    return {
      email: ''
    }
  },
  methods: {
    handelsubmit() {
      const data = {
        email: this.email
      }
      console.log(data)
    }
  }
}
</script>

<style scoped>

.modal-footer {
  background: #ecf0f1;
  border-color: #dee4e7;
  text-align: center;

  font-size: 13px;
  justify-content: center;
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
