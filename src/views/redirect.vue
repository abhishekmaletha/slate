<template>
  <p>Please wait while we authenticate ur creds!</p>
</template>

<script>
// const axios = require("axios");
import { ZohoOAuthValidator } from "../driftFunctions/driftFunctions";
export default {
  name: "Redirect",
  nethods: {},
  methods: {
    codeAuth() {
      var urlParams = new URLSearchParams(window.location.search);
      var params = Object.fromEntries(urlParams.entries());
      var code = params.code;
      if (code) {
        const clientID = "1000.PSBDCW7BHSWY9O2XAV0HLCP6EAL4OQ";
        const clientSECRET = "62f54cd1600c79e9f8789246ed2fd0f7ab01a992a1";
        const redirect_url = "https://elegant-cray-8f54df.netlify.app/";
        // console.log("client ID ", clientID);
        // console.log("client Secret ", clientSECRET);
        // const token = driftOAuthValidator(code, clientID, clientSECRET);
        // intercomOAuthValidator(code, clientID, clientSECRET);
        // const token = intercomOAuthValidator(code, clientID, clientSECRET);
        // console.log("intercom token ", token);
        // localStorage.setItem("accessTokenIntercom", token);
        // this.$router.replace("landing");
        const access_token = ZohoOAuthValidator(
          code,
          clientID,
          clientSECRET,
          redirect_url
        );
        console.log("token is ", access_token);
      }
    },
  },
  mounted() {
    this.codeAuth();
  },
  created() {
    // console.log("inside auth");
  },
};
</script>

<style>
</style>