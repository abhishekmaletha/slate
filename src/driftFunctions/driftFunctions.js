'use strict'
require('dotenv').config()
const axios = require('axios');

async function driftOAuthValidator(code, clientID, clientSECRET) {
    return await axios
        .post(
            "https://driftapi.com/oauth2/token",
            new URLSearchParams({
                code,
                client_id: clientID,
                client_secret: clientSECRET,
                grant_type: "authorization_code",
            }).toString(),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )
        .then((res) => {
            // console.log("token data ", res.data);
            return (res.data.access_token);

        })
        .catch((e) => {
            console.log(e);
        });
}

async function intercomOAuthValidator(code, clientID, clientSECRET) {
    console.log('cl id', clientID);
    console.log("cl secret", clientSECRET);
    console.log("code is ", code);
    return await axios
        .post(
            "https://api.intercom.io/auth/eagle/token",
            new URLSearchParams({
                code,
                client_id: clientID,
                client_secret: clientSECRET
            }).toString(),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )
        .then((res) => {
            console.log("token data ", res.data.access_token);
            return (res.data.access_token);
        })
        .catch((e) => {
            console.log(e);
        });
}

async function ZohoOAuthValidator(code, clientID, clientSECRET, redirect_url) {
    console.log('inside zoho')
    return await axios
        .post(
            "https://accounts.zoho.in/oauth/v2/token",
            new URLSearchParams({
                code: code,
                grant_type: "authorization_code",
                client_id: clientID,
                client_secret: clientSECRET,
                redirect_uri: redirect_url,
            }).toString(),
        )
        .then((res) => {
            // console.log(res.data.access_token)
            return (res.data.access_token);
        })
        .catch((e) => {
            console.log(e);
        });
}
module.exports = {
    ZohoOAuthValidator,
    driftOAuthValidator,
    intercomOAuthValidator
}