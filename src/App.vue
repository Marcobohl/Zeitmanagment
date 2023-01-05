<template>
  <router-view />
</template>

<script>

 // import Nav from "@/components/Nav";
export default {
  name: 'App',
  components: {
   // Nav,
  }
}

</script>

<style>

* {
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "segoe ui", roboto, oxygen, ubuntu, cantarell, "fira sans", "droid sans", "helvetica neue", Arial, sans-serif;
  font-size: 16px;
}

  body {
    background-color: #435165 !important;
    min-height:  100vh;
    display: flex;
    font-weight: 400;
    font-family: -apple-system, BlinkMacSystemFont, "segoe ui", roboto, oxygen, ubuntu, cantarell, "fira sans", "droid sans", "helvetica neue", Arial, sans-serif;
  }

  h1, h2, h3, h4, h5, h6, label, span {
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, "segoe ui", roboto, oxygen, ubuntu, cantarell, "fira sans", "droid sans", "helvetica neue", Arial, sans-serif;
  }


  body, html, #app, #root, .auth-wrapper {
    width: 100%;
    height: 100%;
  }

  #app {
    text-align: center;
  }

  .navbar-light {
    background-color: #ffffff;
    box-shadow: 0px 14px 80px rgba(24, 35, 58, 0.2);
  }

  .auth-wrapper{
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: left;
  }


  .auth-wrapper .form-cpmtrol:focus {
    border-color: #167bff;
    box-shadow: none;
  }

  .auth-wrapper h3 {
    text-align: center;
    margin: 0;
    line-height: 1;
    padding-bottom: 20px;
  }

  .custom-control-label {
    font-weight: 400;
  }

  .forgot-password,
  .forgot-password a {
  text-align: right;
    font-size: 13px;
    padding-top: 10px;
    color: #7f7d7d;
    margin: 0;
  }

  .forgot-password a {
    color: #167bff;
  }

  .Mainhome {
    margin-top: 95px;
    margin-bottom: 95px;
    background-color: #ffffff;
    border-radius: 10px;
  }

</style>
